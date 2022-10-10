<%@ page import="java.time.LocalDateTime" %>
<%@ page import="java.time.format.DateTimeFormatter" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html>
<head>
    <title>АРМИЯ РОССИИ</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=0.9, user-scalable=0">
    <link rel="icon" type="image/png" href="static/img/favicon.png">
    <link rel="stylesheet" href="static/styles/main.css">
    <link rel="stylesheet" href="static/styles/check.css">
</head>

<body>
<div class="bg"></div>

<img class="mob-hide anime right" src="static/img/anime1.png" alt="">
<img class="mob-hide anime left" src="static/img/anime2.png" alt="">
<img class="mob-hide anime center-left" src="static/img/anime3.gif" alt="">
<img class="mob-hide anime center-right" src="static/img/anime4.gif" alt="">
<img class="mob-hide anime top-right" src="static/img/anime5.gif" alt="">
<img class="fly" src="static/img/fly.gif" alt="">

<table class="container">
    <tr class="header">
        <td>
            <h1>Результаты операции</h1>
            <h3>Работу Vыполнил рядоVой P32101 батальона Алексей Никашкин.</h3>
            <h3>Zа сегодня было денацифицироVано 10000 км².</h3>
        </td>
    </tr>

    <tr class="main">
        <td>
            <div class="img-container">
                <jsp:useBean id="report" class="ru.sigsegv.weblab.model.Report" scope="request"/>
                <c:choose>
                    <c:when test="${report.hit}">
                        <img src="static/img/dagestan.jpg" alt="">
                        <h1 style="color: #24d810">ПОПАДАНИЕ</h1>
                    </c:when>
                    <c:otherwise>
                        <img src="static/img/povestka.png" alt="">
                        <h1 style="color: #D85810">ПРОМАХ</h1>
                    </c:otherwise>
                </c:choose>
            </div>

            <div class="row">
                <table class="params">
                    <tr>
                        <td><b>Координата X</b></td>
                        <td>${report.coordX}</td>
                    </tr>
                    <tr>
                        <td><b>Координата Y</b></td>
                        <td>${report.coordY}</td>
                    </tr>
                    <tr>
                        <td><b>Радиус</b></td>
                        <td>${report.radius}</td>
                    </tr>
                </table>
                <a class="back" href=".">Начать следующую операцию!</a>
            </div>
            <div class="time">Текущее время: <%= DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss").format(LocalDateTime.now()) %></div>
        </td>
    </tr>
</table>

</body>
</html>

