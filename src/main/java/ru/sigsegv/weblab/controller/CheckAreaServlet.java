package ru.sigsegv.weblab.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ru.sigsegv.weblab.exception.BadRequest;
import ru.sigsegv.weblab.model.Log;
import ru.sigsegv.weblab.model.Report;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAmount;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/check")
public class CheckAreaServlet extends HttpServlet  {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        var startTime = System.nanoTime();

        float coordX, coordY, radius;

        try {
            coordX = getNumberInWhitelist(req, "coordX", new float[]{-3, -2, -1, 0, 1, 2, 3, 4, 5});
            coordY = getNumberInRange(req, "coordY", -3, 3);
            radius = getNumberInWhitelist(req, "radius", new float[]{1, 1.5f, 2, 2.5f, 3});
        } catch (BadRequest e) {
            resp.sendError(400, e.getMessage());
            return;
        }

        var time = LocalDateTime.now();
        var endTime = System.nanoTime();
        var duration = Duration.ofNanos(endTime - startTime);

        var report = new Report(coordX, coordY, radius, isInside(coordX, coordY, radius), time, duration);
        req.setAttribute("report", report);

        var context = getServletContext();
        var attr = context.getAttribute("log");
        if (attr instanceof Log log) {
            log.addReport(report);
        } else {
            var log = new Log();
            log.addReport(report);
            context.setAttribute("log", log);
        }

        var reqDispatcher = req.getRequestDispatcher("/WEB-INF/views/check.jsp");
        reqDispatcher.forward(req, resp);
    }

    private boolean isInside(float x, float y, float r) {
        x /= r;
        y /= r;

        if (x <= 0 && y >= 0)
            return -x <= 1 && y <= 1;
        if (x >= 0 && y >= 0)
            return x <= 1 - 2 * y;
        if (x >= 0 && y <= 0)
            return x * x + y * y <= 0.25f;
        return false;
    }

    private float getNumberInRange(HttpServletRequest req, String field, float min, float max) throws BadRequest {
        var num = getNumber(req, field);
        if (num <= min || num >= max) throw new BadRequest("field " + field + " is out of range");
        return num;
    }

    private float getNumberInWhitelist(HttpServletRequest req, String field, float[] whitelist) throws BadRequest {
        var num = getNumber(req, field);
        for (var allowed : whitelist)
            if (num == allowed) return num;
        throw new BadRequest("field " + field + " is not in whitelist");
    }

    private float getNumber(HttpServletRequest req, String field) throws BadRequest {
        var str = req.getParameter(field);
        if (str == null) throw new BadRequest("no " + field);

        try {
            return Float.parseFloat(str);
        } catch (NumberFormatException e) {
            throw new BadRequest("invalid float in " + field);
        }
    }
}
