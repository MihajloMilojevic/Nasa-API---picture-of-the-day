
const API_KEY = "A4UdlhlqMgspVyJRdjPjirtXGJl3XTv1PzOayBZ0";

document.getElementById("img").onresize = setImageDimensions;

const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const months =  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const daySelect = document.querySelector("#day");
const monthSelect = document.querySelector("#month");
const yearSelect = document.querySelector("#year");
const changeButton = document.querySelector("#change");
const todayButton = document.querySelector("#today");

const imgTitle = document.querySelector("#title");
const imgExplanation = document.querySelector("#explanation");

function setImageDimensions() // seting dimensions of an the image so that the ratio of width and height stay constant
{   
    const slika = document.getElementById("slika");
    const img = new Image();
    img.src = slika.src;
    const ratio = img.width / img.height;
    const imgLandscape = (img.width > img.height);
    if(imgLandscape)
    {
        slika.style.width = "100%";
        slika.style.height = `calc(${slika.style.width} / ${ratio})`;
    }
    else
    {
        slika.style.height = "100%";
        slika.style.width = `calc(${slika.style.height} / ${ratio})`;
    }
}

async function APICall(URL) { // makes an API request and changes the image
    try
    {
        const res = await fetch(URL);
        if(!res.ok) throw new Error("Error while gathering data");

        const data = await res.json();
        const image = document.getElementById("img")
        const src = data.media_type === "video" ? data.thumbnail_url : data.hdurl || data.url;
        console.log(data);
        image.src = src;
        imgTitle.innerText = data.title;
        imgExplanation.innerText = data.explanation;
    }
    catch(error)
    {
        document.getElementById("img").src = "./nasa.png";
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    APICall(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&&thumbs=true`);
    setToday();
})

yearSelect.addEventListener("change", () => {
    daysInMonths[1] = leapYear(yearSelect.value) ? 29: 28;
    setDays(daySelect.value, monthSelect.value);
})
monthSelect.addEventListener("change", () => {
    setDays(daySelect.value, monthSelect.value)
})
changeButton.addEventListener("click", change)
todayButton.addEventListener("click", () => {
    setToday();
    change();
})

function change()
{
    const day =daySelect.value;
    const month = monthSelect.value;
    const year = yearSelect.value;
    APICall(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&&thumbs=true&date=${year}-${month}-${day}`);
}

function setToday()
{
    const today = new Date()
    setYears(today.getFullYear());
    setMonths(today.getMonth() + 1);
    setDays(today.getDate(), today.getMonth() + 1);
}


function setDays(day, month)
{
    daySelect.innerHTML = "";
    for(let i = 1; i <= daysInMonths[month - 1]; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        daySelect.appendChild(option);
    }
    daySelect.value = day <= daysInMonths[month - 1] ? day : daysInMonths[month - 1];
}

function setMonths(month)
{
    monthSelect.innerHTML = "";
    for(let i = 1; i <= 12; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.innerText = months[i - 1];
        monthSelect.appendChild(option);
    }
    monthSelect.value = month;
}


function setYears(year)
{
    yearSelect.innerHTML = "";
    daysInMonths[1] = leapYear(year) ? 29: 28;
    for(let i = year; i >= 1995; i--)
    {
        const option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        yearSelect.appendChild(option);
    }
    yearSelect.value = year;
}

function leapYear(year)
{
    return ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0))
}