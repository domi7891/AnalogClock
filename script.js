let hourHand;
let minuteHand;
let secondHand;
let milliHand;
let currentDate;

let year;
let month;
let day;

let sparkles;

let interval;

window.onload = () => {
    hourHand = document.querySelector("#hour");
    minuteHand = document.querySelector("#minute");
    secondHand = document.querySelector("#second");
    milliHand = document.querySelector("#millisec");
    currentDate = document.querySelector("#date");

    year = document.querySelector('#year').children;
    month = document.querySelector('#month').children;
    day = document.querySelector('#day').children;

    sparkles = document.querySelector("#sparkles");

    run_the_clock();
    loadSparkles();

    interval = setInterval(run_the_clock, 10);
};


function loadSparkles() {
    for (let i = 0; i < 1; i++) {
        let spark = document.createElement("span");
        sparkles.appendChild(spark);
    }
}

function run_the_clock() {
    var date = new Date();

    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let mil = date.getMilliseconds();
    let d = date.getDate();
    let m = date.getMonth();
    let y = date.getFullYear();

    let milliPosition = mil * 360 / 1000;
    let secPosition = sec * 360 / 60 + (milliPosition / 60);
    let minPosition = (min * 360 / 60) + (secPosition) / 60;
    let hrPosition = hr * 360 / 12 + ((minPosition) / 12);

    //Then we need to apply these numbers as degrees in the inline styles for transform on each of the objects.
    hourHand.style.transform = "rotate(" + hrPosition + "deg)";
    minuteHand.style.transform = "rotate(" + minPosition + "deg)";
    secondHand.style.transform = "rotate(" + secPosition + "deg)";
    milliHand.style.transform = "rotate(" + milliPosition + "deg)";

    year[0].textContent = y - 1;
    year[1].textContent = y;
    year[2].textContent = y + 1;

    month[0].textContent = getMonth(m - 1);
    month[1].textContent = getMonth(m);
    month[2].textContent = getMonth(m + 1);

    day[0].textContent = formatDay(d - 1);
    day[1].textContent = formatDay(d);
    day[2].textContent = formatDay(d + 1);

}

function formatDay(d) {
    if (d < 10)
        return "0" + d;
    return d;
}

function getMonth(m) {

    if (m < 0)
        m = 11;

    switch (m) {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sept";
        case 9:
            return "Okt";
        case 10:
            return "Nov";
        case 11:
            return "Dez";
    }
}

function runSpark() {
    let end = calculateEnd();
    let span = sparkles.children[0];
    span.style.transition = "all 0.5s";
    span.style.top = end[0] + "%";
    span.style.left = end[1] + "%";
    setTimeout(() => {
        let start = calculateStart();
        span.style.top = start[0] + "%";
        span.style.left = start[1] + "%";
        span.style.transition = "none";
    }, 500);
}

var sparkInt = setInterval(runSpark, 10000);

function calculateStart() {
    let top = Math.floor(Math.random() * 120) + 10;
    let left = Math.floor(Math.random() * 50) - 10;
    if (top >= 0 && left >= 0) {
        return calculateStart();
    }
    return [top, left];
}

function calculateEnd() {
    let top = Math.floor(Math.random() * 120) - 10;
    let left = Math.floor(Math.random() * 110) + 50;
    if (top <= 100 && left <= 100) {
        return calculateEnd();
    }
    return [top, left];
}