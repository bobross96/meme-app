var displayedImage = document.querySelector(".current-meme");
var searchBar = document.querySelector("input");
var searchBtn = document.querySelector("#searchBtn");
var main = document.querySelector(".fetched-memes");
var draggable = document.querySelector(".container");
var addText = document.querySelector("#addText");
var boxNum = document.querySelector(".boxNum");
var rightCol = document.querySelector(".rightCol");

let topText = document.getElementById("topText");
let botText = document.getElementById("botText");

const MEME_API = "https://api.imgflip.com/get_memes";

getMeme();

//dragndrop

/* $( function() {
    $( ".meme-txt-area" ).draggable( );
  } );
 */

let memelist = [];

function makeList(memes) {
  memes.forEach((meme) => {
    memelist.push(meme.name);
  });
}

async function getMeme() {
  const response = await fetch("https://api.imgflip.com/get_memes");
  const data = await response.json();
  const allMemes = data.data.memes;
  const memes = allMemes.filter(meme => meme.box_count <= 2);
  setRandomMeme(memes)
  //set random meme as the main page
  searchBtn.onclick = (e) => {
    //make sure the memelist is not duplicated
    if (memelist.length == 0) {
      makeList(memes);
    }
    clearSection();
    //image.setAttribute('src', null);
    //memelist is array of meme names
    //let input = searchBar.value.toLowerCase();
    memes.forEach((meme) => {
        console.log('yo');
      
        var imageUrl = meme.url;
        var image = document.createElement("img");

        image.setAttribute("src", imageUrl);
        image.setAttribute("id", meme.id);
        image.setAttribute("class", "img-fluid");
        image.setAttribute("alt", meme.box_count);
        main.appendChild(image);

        //set up function for every meme when clicked
        document.getElementById(meme.id).onclick = (e) => {
          topText.value = "";
          botText.value = "";
          displayedImage.setAttribute("src", e.target.src);
          displayedImage.setAttribute("id", e.target.id);
          displayedImage.setAttribute("alt", e.target.alt);
          window.scrollTo(0, 0);
        };
      
    });
  };
}

async function captionMeme() {
  const formData = new FormData();
  let currentMeme = document.getElementsByClassName("current-meme");
  let memeID = currentMeme[0].id;
  //this should be done server side but fuck it
  formData.append("template_id", memeID);
  formData.append("username", "bobross96");
  formData.append("password", "Mememachine1996");
  //add space if empty to avoid error of no entry
  if (topText.value == "") {
    topText.value = " ";
  }

  if (botText.value == "") {
    botText.value = " ";
  }
  formData.append("text0", topText.value);
  formData.append("text1", botText.value);

  //formData.append("boxes",JSON.stringify([{"text":"test"}]));
  console.log(formData);
  fetch("https://api.imgflip.com/caption_image", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
      displayedImage.setAttribute("src", result.data.url);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const data = {
  template_id: "438680",
  username: "bobross96",
  password: "Mememachine1996",
  text0: "lala",
  text1: "poop",
};

function setRandomMeme(memeArray) {
  let randomMemeLocation = Math.floor(Math.random() * memeArray.length);
  let randomMeme = memeArray[randomMemeLocation];
  displayedImage.setAttribute("src", randomMeme.url);
  displayedImage.setAttribute("id", randomMeme.id);
  displayedImage.setAttribute("alt", randomMeme.box_count);
}

function clearSection() {
  document.querySelector(".fetched-memes").innerHTML = "";
}

function getRand() {
  return Math.floor(Math.random() * 100);
}
