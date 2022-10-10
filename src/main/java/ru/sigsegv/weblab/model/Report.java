package ru.sigsegv.weblab.model;

import java.io.Serializable;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;

public class Report implements Serializable {
    private float coordX;
    private float coordY;
    private float radius;
    private boolean isHit;
    private LocalDateTime time;
    private Duration duration;

    public Report() {
    }

    public Report(float coordX, float coordY, float radius, boolean isHit, LocalDateTime time, Duration duration) {
        this.coordX = coordX;
        this.coordY = coordY;
        this.radius = radius;
        this.isHit = isHit;
        this.time = time;
        this.duration = duration;
    }


    public float getCoordX() {
        return coordX;
    }

    public void setCoordX(float coordX) {
        this.coordX = coordX;
    }

    public float getCoordY() {
        return coordY;
    }

    public void setCoordY(float coordY) {
        this.coordY = coordY;
    }

    public float getRadius() {
        return radius;
    }

    public void setRadius(float radius) {
        this.radius = radius;
    }

    public boolean isHit() {
        return isHit;
    }

    public void setHit(boolean hitResult) {
        this.isHit = hitResult;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Report report = (Report) o;
        return Float.compare(report.coordX, coordX) == 0 && Float.compare(report.coordY, coordY) == 0 && Float.compare(report.radius, radius) == 0 && isHit == report.isHit && Objects.equals(time, report.time) && Objects.equals(duration, report.duration);
    }

    @Override
    public int hashCode() {
        return Objects.hash(coordX, coordY, radius, isHit, time, duration);
    }

    @Override
    public String toString() {
        return "Report{" +
                "coordX=" + coordX +
                ", coordY=" + coordY +
                ", radius=" + radius +
                ", isHit=" + isHit +
                ", time=" + time +
                ", duration=" + duration +
                '}';
    }
}
