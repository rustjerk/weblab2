function setupRadioContainer(element) {
    var buttons = element.querySelectorAll("[data-radio-button]");
    buttons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            var parent = button.parentElement;
            var isSelected = parent.classList.contains("selected");
            if (isSelected)
                event.preventDefault();
            buttons.forEach(function (button) {
                var parent = button.parentElement;
                parent.classList.remove("selected");
                button.checked = false;
            });
            parent.classList.add("selected");
            button.checked = true;
        });
    });
}
function setupRadioButtons() {
    document
        .querySelectorAll("[data-radio-container]")
        .forEach(setupRadioContainer);
}
function getRadioValue(element) {
    var button = Array.prototype.slice.call(element.querySelectorAll("[data-radio-button]")).find(function (button) {
        var parent = button.parentElement;
        return parent.classList.contains("selected");
    });
    if (!button)
        return null;
    return button.value;
}
function getCoordX() {
    var input = document.querySelector("#coord-x");
    return parseFloat(input.value);
}
function setCoordX(val) {
    var input = document.querySelector("#coord-x");
    input.value = String(Math.round(val));
}
function getCoordY() {
    var input = document.querySelector("#coord-y");
    return parseFloat(input.value);
}
function setCoordY(val) {
    var input = document.querySelector("#coord-y");
    input.value = val.toPrecision(4);
}
function validateCoordY() {
    var value = getCoordY();
    var isValid = !isNaN(value) && value > -3 && value < 3;
    var message = isValid ? "" : "огонь по своим!!!";
    document.querySelector("#coord-y-error").innerHTML = message;
    return isValid;
}
function getRadius() {
    return parseFloat(getRadioValue(document.querySelector("#radius")));
}
function updateRadius() {
    var radiusInput = document.querySelector("#radius-input");
    radiusInput.value = String(getRadius());
}
function setupForm() {
    var form = document.querySelector("form");
    if (!form)
        return;
    form.addEventListener("submit", function (event) {
        if (!validateCoordY())
            event.preventDefault();
        updateRadius();
    });
    var radio = form.querySelectorAll("[data-radio-button]");
    for (var i = 0; i < radio.length; i++)
        radio[i].addEventListener("click", updateCanvas);
    form.querySelector("#coord-x").addEventListener("input", updateCanvas);
    form.querySelector("#coord-y").addEventListener("input", updateCanvas);
}
var CANVAS_OFFSET = 145;
var CANVAS_SCALE = 113;
function drawPoint(context, x, y) {
    var radius = getRadius();
    x = x * CANVAS_SCALE / radius + CANVAS_OFFSET;
    y = -y * CANVAS_SCALE / radius + CANVAS_OFFSET;
    context.lineWidth = 2;
    context.strokeStyle = "#d32461";
    context.beginPath();
    context.arc(x, y, 8, 0, 2 * Math.PI);
    context.moveTo(x - 12, y);
    context.lineTo(x + 12, y);
    context.moveTo(x, y - 12);
    context.lineTo(x, y + 12);
    context.stroke();
}
function updateCanvas() {
    var canvas = document.querySelector("canvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPoint(context, getCoordX(), getCoordY());
}
function setupCanvas() {
    var canvas = document.querySelector("canvas");
    var context = canvas.getContext("2d");
    var lastX = 0;
    var lastY = 0;
    canvas.addEventListener("mousemove", function (event) {
        var rect = canvas.getBoundingClientRect();
        var sx = event.pageX - rect.left;
        var sy = event.pageY - rect.top;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.lineWidth = 1;
        context.strokeStyle = "black";
        context.beginPath();
        context.arc(sx, sy, 3, 0, 2 * Math.PI);
        context.stroke();
        var radius = getRadius();
        var x = sx - CANVAS_OFFSET;
        var y = sy - CANVAS_OFFSET;
        x = Math.round(x / CANVAS_SCALE * radius);
        y = -y / CANVAS_SCALE * radius;
        if (x < -3)
            x = -3;
        if (x > 5)
            x = 5;
        if (y <= -3)
            y = -2.999;
        if (y >= 3)
            y = 2.999;
        lastX = x;
        lastY = y;
        drawPoint(context, x, y);
    });
    canvas.addEventListener("click", function () {
        setCoordX(lastX);
        setCoordY(lastY);
        updateRadius();
        document.querySelector("form").submit();
    });
    canvas.addEventListener("mouseleave", updateCanvas);
}
window.addEventListener("DOMContentLoaded", function () {
    setupRadioButtons();
    setupForm();
    setupCanvas();
});
