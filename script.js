import Modal from "./modal.js";

const API_KEY = "A4UdlhlqMgspVyJRdjPjirtXGJl3XTv1PzOayBZ0";

document.getElementById("img").onresize = setImageDimensions;

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
        if(res.ok)
        {
            const data = await res.json();
            const image = document.getElementById("img")
            const src = data.media_type === "video" ? data.thumbnail_url : data.hdurl || data.url;
            //console.log(data);
            image.src = src;
        }
        else
            throw new Error("Greska pri uzimanju podataka");
    
    }
    catch(error)
    {
        document.getElementById("img").src = "./nasa.png";
        console.error(error);
    }
}
const m = new Modal();

document.addEventListener("DOMContentLoaded", () => {
    APICall(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&&thumbs=true`);
    m.Add();
})

document.addEventListener("keydown", (e) => {
    m.Show();
})