package ru.sigsegv.weblab.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Log {
    private List<Report> reports = new ArrayList<>();

    public List<Report> getReports() {
        return reports;
    }

    public void addReport(Report report) {
        reports.add(report);
    }

    public void setReports(List<Report> reports) {
        this.reports = reports;
    }

    @Override
    public String toString() {
        return "Log{...}";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Log log = (Log) o;
        return Objects.equals(reports, log.reports);
    }

    @Override
    public int hashCode() {
        return Objects.hash(reports);
    }
}
