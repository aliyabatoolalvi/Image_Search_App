const accessKey = "k84-A3E7xT9bHZE4W-CFbqd4t0b1ucFWNlLwv4hyGig";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchRes= document.querySelector(".results");
const showMore= document.getElementById("button-more");

let inputData="";
let page = 1;
async function searchImages(){
    //dynamic url creation based on search
    inputData=inputEl.value;
    const url= `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response= await fetch(url);
    const data=await response.json();

    const results = data.results;

    if(page === 1){
        searchRes.innerHTML="";
    }

    results.map((result) =>{
        const imgWrapper=document.createElement("div");
        imgWrapper.classList.add("result");
        const image=document.createElement("img");
        image.src=result.urls.small;
        image.alt=result.alt_description;
        const imageLink=document.createElement("a");
        imageLink.href=result.links.html;
        imageLink.target="_blank";
        imageLink.textContent=result.alt_description;

        imgWrapper.appendChild(image);
        imgWrapper.appendChild(imageLink);
        searchRes.appendChild(imgWrapper);
        });

    page++;
    if(page>1){
        showMore.style.display="block";
    }
}

formEl.addEventListener("submit", (event) =>{
    event.preventDefault();
    page=1;
    //calling above function  named as search image
    searchImages();
})
showMore.addEventListener("click", () =>{
    
    //calling above function  named as search image
    searchImages();
})