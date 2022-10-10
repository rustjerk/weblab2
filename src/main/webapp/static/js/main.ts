function setupRadioContainer(element: HTMLElement) {
    let buttons = element.querySelectorAll("[data-radio-button]");
    buttons.forEach((button: HTMLInputElement) => {
        button.addEventListener("click", event => {
            let parent = button.parentElement;

            let isSelected = parent.classList.contains("selected");
            if (isSelected) event.preventDefault();

            buttons.forEach((button: HTMLInputElement) => {
                let parent = button.parentElement;
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

function getRadioValue(element: HTMLElement): string | null {
    let button = Array.prototype.slice.call(element.querySelectorAll("[data-radio-button]")).find(button => {
        let parent = button.parentElement;
        return parent.classList.contains("selected");
    });

    if (!button) return null;
    return (button as HTMLInputElement).value;
}

function getCoordX(): number {
    let input = document.querySelector("#coord-x") as HTMLSelectElement;
    return parseFloat(input.value);
}

function setCoordX(val: number) {
    let input = document.querySelector("#coord-x") as HTMLSelectElement;
    input.value = String(Math.round(val));
}

function getCoordY(): number {
    let input = document.querySelector("#coord-y") as HTMLSelectElement;
    return parseFloat(input.value);
}

function setCoordY(val: number) {
    let input = document.querySelector("#coord-y") as HTMLSelectElement;
    input.value = val.toPrecision(4);
}

function validateCoordY() {
    let value = getCoordY();
    let isValid = !isNaN(value) && value > -3 && value < 3;

    let message = isValid ? "" : "огонь по своим!!!";
    document.querySelector("#coord-y-error").innerHTML = message;

    return isValid;
}

function getRadius(): number {
    return parseFloat(getRadioValue(document.querySelector("#radius")));
}

function updateRadius() {
    let radiusInput = document.querySelector("#radius-input") as HTMLInputElement;
    radiusInput.value = String(getRadius());
}

function setupForm() {
    let form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", event => {
        if (!validateCoordY()) event.preventDefault();
        updateRadius();
    });

    let radio = form.querySelectorAll("[data-radio-button]")
    for (let i = 0; i < radio.length; i++)
        radio[i].addEventListener("click", updateCanvas);
    form.querySelector("#coord-x").addEventListener("input", updateCanvas);
    form.querySelector("#coord-y").addEventListener("input", updateCanvas);
}

const CANVAS_OFFSET = 145;
const CANVAS_SCALE = 113;

function drawPoint(context: CanvasRenderingContext2D, x, y: number) {
    let radius = getRadius();

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
    let canvas = document.querySelector("canvas");
    let context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawPoint(context, getCoordX(), getCoordY());
}

function setupCanvas() {
    let canvas = document.querySelector("canvas");
    let context = canvas.getContext("2d");

    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener("mousemove", event => {
        let rect = canvas.getBoundingClientRect();
        let sx = event.pageX - rect.left;
        let sy = event.pageY - rect.top;

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.lineWidth = 1;
        context.strokeStyle = "black";

        context.beginPath();
        context.arc(sx, sy, 3, 0, 2 * Math.PI);
        context.stroke();

        const radius = getRadius();
        let x = sx - CANVAS_OFFSET;
        let y = sy - CANVAS_OFFSET;

        x = Math.round(x / CANVAS_SCALE * radius);
        y = -y / CANVAS_SCALE * radius;

        if (x < -3)  x = -3;
        if (x >  5)  x = 5;
        if (y <= -3) y = -2.999;
        if (y >= 3)  y = 2.999;

        lastX = x;
        lastY = y;

        drawPoint(context, x, y);
    });

    canvas.addEventListener("click", () => {
        setCoordX(lastX);
        setCoordY(lastY);
        updateRadius();
        document.querySelector("form").submit();
    });

    canvas.addEventListener("mouseleave", updateCanvas);
}

window.addEventListener("DOMContentLoaded", () => {
    setupRadioButtons();
    setupForm();
    setupCanvas();
});
