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
            <h1>ZдраVия желаю, тоVарищ майор!</h1>
            <h3>Работу Vыполнил рядоVой P32101 батальона Алексей Никашкин.</h3>
            <h3>Zа сегодня было денацифицироVано 10000 км².</h3>
        </td>
    </tr>

    <tr class="main">
        <td class="row">
            <div class="side mob-hide">
                <h3>СостаV оператиVной группироVки</h3>
                <ol class="heroes">
                    <li>БерестоVский СVятослаV СергееVич <img class="marshal" src="static/img/marshal.png" alt=""></li>
                    <li>БухароV Дмитрий ПаVлоVич</li>
                    <li>Гасюк Александр АндрееVич</li>
                    <li>Гребёнкин Vадим ДмитриеVич</li>
                    <li>ГрибоV Михаил ОлегоVич</li>
                    <li>ДорофееV Николай ПаVлоVич</li>
                    <li>Zенин Мирон АлександроVич</li>
                    <li>Калябина Александра НиколаеVна</li>
                    <li>Марченко Анна СергееVна</li>
                    <li>Никашкин Алексей VалентиноVич</li>
                    <li>НуцалханоV Нуцалхан ГасаноVич</li>
                    <li>Скворцова Дарья Алексеевна</li>
                    <li>Шульга Артём ИгореVич</li>
                    <li>Дональд Трамп</li>
                </ol>
            </div>

            <div id="map">
                <h3>Карта боеVых дейстVий</h3>
                <div class="george">
                    <canvas width="296" height="296"></canvas>
                </div>
                <img class="fly" src="static/img/fly.gif" alt="">
            </div>
        </td>
    </tr>

    <tr class="controls">
        <td>
            <form action="check" method="post">
                <div class="row mob-col">
                    <fieldset data-radio-container id="radius">
                        <legend>Радиус R</legend>
                        <div class="radio-button">
                            <input data-radio-button type="button" value="1">
                        </div>
                        <div class="radio-button">
                            <input data-radio-button type="button" value="1.5">
                        </div>
                        <div class="radio-button">
                            <input data-radio-button type="button" value="2">
                        </div>
                        <div class="radio-button">
                            <input data-radio-button type="button" value="2.5">
                        </div>
                        <div class="radio-button selected">
                            <input data-radio-button type="button" value="3">
                        </div>
                    </fieldset>

                    <input type="hidden" id="radius-input" name="radius" value="3">

                    <label class="select-input">
                        <span>Координата X</span>
                        <select id="coord-x" name="coordX">
                            <option value="-3">-3</option>
                            <option value="-2">-2</option>
                            <option value="-1">-1</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </label>

                    <label class="text-input">
                        <div class="row">
                            <span>Координата Y</span>
                            <span id="coord-y-error" class="error"></span>
                        </div>
                        <input autocomplete="off" required name="coordY" pattern="[-0-9.]*" id="coord-y" type="text"
                               placeholder="(-3...3)">
                    </label>
                </div>

                <input type="submit" value="ОтпраVить">
            </form>
        </td>
    </tr>

    <tr class="result-container">
        <td>
            <table class="result">
                <thead>
                <tr>
                    <td>Vремя</td>
                    <td>Zатр.</td>
                    <td>X</td>
                    <td>Y</td>
                    <td>R</td>
                    <td>РеZультат</td>
                </tr>
                </thead>
                <tbody>
                <jsp:useBean id="log" class="ru.sigsegv.weblab.model.Log" scope="application"/>
                <c:forEach items="${log.reports}" var="report">
                    <tr>
                        <td>${ DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss").format(report.time) }</td>
                        <td>${report.duration.toNanos()} нс</td>
                        <td>${report.coordX}</td>
                        <td>${report.coordY}</td>
                        <td>${report.radius}</td>
                        <c:choose>
                            <c:when test="${report.hit}">
                                <td><span class="hit"></span>Попал!</td>
                            </c:when>
                            <c:otherwise>
                                <td><span class="hit"></span>Промах(</td>
                            </c:otherwise>
                        </c:choose>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
        </td>
    </tr>
</table>

<script src="static/js/main.js"></script>
</body>
</html>

