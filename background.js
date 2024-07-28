const images = ["C:\Users\jiwon\Desktop\졸업과제\app1.jpeg", "C:\Users\jiwon\Desktop\졸업과제\app2.jpg", "C:\Users\jiwon\Desktop\졸업과제\app3.jpg"];

const chosenImage = images[Math.floor(Math.random() * images.length)];

const bgImage = document.createElement("img");

bgImage.src = `img/${chosenImage}`;

document.body.appendChild(bgImage);
