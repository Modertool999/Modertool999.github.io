const collageImages = [
  { src: "assets/collage/image1.webp", left: "21.2vw", top: "8.5vh", width: "14.2vw", height: "63vh", z: 4 },
  { src: "assets/collage/image2.webp", left: "34.8vw", top: "0.5vh", width: "23.8vw", height: "36vh", z: 6 },
  { src: "assets/collage/image3.webp", left: "34.8vw", top: "15.4vh", width: "16.8vw", height: "28.5vh", z: 8 },
  { src: "assets/collage/image4.webp", left: "35.8vw", top: "43.2vh", width: "16.4vw", height: "24.4vh", z: 8 },
  { src: "assets/collage/image5.webp", left: "57.3vw", top: "4.7vh", width: "19vw", height: "33.5vh", z: 5 },
  { src: "assets/collage/image6.webp", left: "63.2vw", top: "35.7vh", width: "12.2vw", height: "31.5vh", z: 4 },
  { src: "assets/collage/image7.webp", left: "79.5vw", top: "53.2vh", width: "10.5vw", height: "28.5vh", z: 3 },
  { src: "assets/collage/image8.webp", left: "58vw", top: "60vh", width: "26.7vw", height: "32vh", z: 12 },
  { src: "assets/collage/image9.webp", left: "32.8vw", top: "68.5vh", width: "16.8vw", height: "22.5vh", z: 9 },
  { src: "assets/collage/image10.webp", left: "49.2vw", top: "67.3vh", width: "9.2vw", height: "23.5vh", z: 7 },
  { src: "assets/collage/image11.webp", left: "26.2vw", top: "50.3vh", width: "9vw", height: "16.8vh", z: 9 },
  { src: "assets/collage/image13.webp", left: "31vw", top: "61vh", width: "18vw", height: "15vh", z: 14 },
  { src: "assets/collage/image14.webp", left: "39vw", top: "35vh", width: "13vw", height: "18vh", z: 18 },
  { src: "assets/collage/image15.webp", left: "41vw", top: "49vh", width: "22vw", height: "15vh", z: 17 },
  { src: "assets/collage/image16.webp", left: "52vw", top: "32vh", width: "18vw", height: "21vh", z: 16 },
  { src: "assets/collage/image17.webp", left: "28vw", top: "54vh", width: "25vw", height: "14vh", z: 15 },
  { src: "assets/collage/image18.webp", left: "48vw", top: "-1vh", width: "24vw", height: "16vh", z: 13 },
  { src: "assets/collage/image19.webp", left: "28vw", top: "29vh", width: "19vw", height: "13vh", z: 12 },
  { src: "assets/collage/image20.webp", left: "68vw", top: "27vh", width: "13vw", height: "29vh", z: 19 },
  { src: "assets/collage/image21.webp", left: "34vw", top: "73vh", width: "18vw", height: "13vh", z: 20 },
  { src: "assets/collage/image22.webp", left: "56vw", top: "50vh", width: "22vw", height: "19vh", z: 21 },
  { src: "assets/collage/image23.webp", left: "34vw", top: "39vh", width: "10vw", height: "13vh", z: 19 },
  { src: "assets/collage/image25.webp", left: "50vw", top: "62vh", width: "10vw", height: "13vh", z: 19 },
];

const collageLayer = document.querySelector("[data-collage-layer]");

if (collageLayer) {
  collageImages.forEach((image) => {
    const element = document.createElement("img");
    element.src = image.src;
    element.className = "collage";
    element.alt = "";
    element.decoding = "async";
    element.fetchPriority = image.z >= 15 ? "high" : "auto";
    element.style.setProperty("--left", image.left);
    element.style.setProperty("--top", image.top);
    element.style.setProperty("--width", image.width);
    element.style.setProperty("--height", image.height);
    element.style.setProperty("--z", image.z);
    collageLayer.appendChild(element);
  });
}
