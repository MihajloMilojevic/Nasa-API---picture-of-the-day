
const API_KEY = "A4UdlhlqMgspVyJRdjPjirtXGJl3XTv1PzOayBZ0";

const dan = document.getElementById("dan");
const mesec = document.getElementById("mesec");
const godina = document.getElementById("godina");

const meseci = [
    "januar", "februar", "mart", "april",
    "maj", "jun", "jul", "avgust",
    "septembar", "oktobar", "novembar", "decembar"
];
const dani = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; 

document.addEventListener("DOMContentLoaded", () => {
    PromenaSlika(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
        
    const danas = new Date();
    if (PrestupnaGodina(danas.getFullYear()))
        dani[1] = 29;
    else
        dani[1] = 28;
    for (let i = 0; i < 12; i++) {
        const option = document.createElement("option");
        option.value = i + 1;
        option.innerText = meseci[i];
        mesec.appendChild(option);
    }
    for (let i = 1995; i <= danas.getFullYear(); i++) {
        const option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        godina.appendChild(option);
    }
    for (let i = 1; i <= dani[danas.getMonth()]; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        dan.appendChild(option);
    }
    mesec.value = danas.getMonth() + 1;
    godina.value = danas.getFullYear();
    dan.value = danas.getDate();
})

function GodinaPromena() {
    if (PrestupnaGodina(godina.value))
        dani[1] = 29;
    else
        dani[1] = 28;
    MesecPromena();
}

function MesecPromena() {
    dan.innerHTML = "";
    for (let i = 1; i <= dani[mesec.value - 1]; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        dan.appendChild(option);
    }
    dan.value = 1;
}

function Danas()
{
    
    const danas = new Date();
    dan.innerHTML = "";
    mesec.innerHTML = "";
    godina.innerHTML = "";
    if (PrestupnaGodina(danas.getFullYear()))
        dani[1] = 29;
    else
        dani[1] = 28;
    for (let i = 0; i < 12; i++) {
        const option = document.createElement("option");
        option.value = i + 1;
        option.innerText = meseci[i];
        mesec.appendChild(option);
    }
    for (let i = 1995; i <= danas.getFullYear(); i++) {
        const option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        godina.appendChild(option);
    }
    for (let i = 1; i <= dani[danas.getMonth()]; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        dan.appendChild(option);
    }
    mesec.value = danas.getMonth() + 1;
    godina.value = danas.getFullYear();
    dan.value = danas.getDate();
}

function SlikaPromena() {
    var q = `${godina.value}-${mesec.value}-${dan.value}`;
    const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${q}`;
    PromenaSlika(URL);
}

function PrestupnaGodina(god) {
    return ((0 == god % 4) && (0 != god % 100) || (0 == god % 400))
}

function setDimensions()
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

async function PromenaSlika(URL) {
    try
    {
        const res = await fetch(URL);
        if(res.ok)
        {
            const data = await res.json();
            const slika = document.getElementById("slika")
            console.log(data);
            slika.src = (data.hdurl != undefined) ? data.hdurl : data.url;
            const img = new Image();
            img.src = (data.hdurl != undefined) ? data.hdurl : data.url;
        }
        else
            throw new Error("Greska pri uzimanju podataka");
    
    }
    catch(error)
    {
        document.getElementById("slika").src = "./nasa.png";
        console.error(error);
    }
}

document.getElementById("slika").onresize = setDimensions;