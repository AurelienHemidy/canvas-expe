import "./style.css";

const canvas = document.querySelector(".canvas");

const ctx = canvas.getContext("2d");

const width = window.innerWidth;
const height = window.innerHeight;

const mouse = {
  x: 0,
  y: 0,
};

canvas.width = width;
canvas.height = height;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX - canvas.offsetLeft;
  mouse.y = event.clientY - canvas.offsetTop;
  // mouse.x = window.pageXOffset + event.clientX - canvas.offsetLeft;
  // mouse.y = window.pageYOffset + event.clientY - canvas.offsetTop;
});

ctx.fillStyle = "rgb(250, 0, 0)";
ctx.strokeStyle = "rgb(250, 102, 40)";

const tick = () => {
  // ctx.clearRect(0, 0, window.innerWidth, window.innnerHeight);
  ctx.fillRect(mouse.x - 25, mouse.y - 25, 50, 50);
  //Draw a line
  // ctx.moveTo(0, 0);
  // ctx.lineTo(mouse.x, mouse.y);
  // ctx.stroke();

  // ctx.beginPath();
  // ctx.arc(mouse.x, mouse.y, 40, 0, 2 * Math.PI);
  // ctx.stroke();

  requestAnimationFrame(tick);
};

tick();
