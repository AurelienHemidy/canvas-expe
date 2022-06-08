import "./style.css";
import gui from "lil-gui";
import gsap from "gsap";

const canvas = document.querySelector(".canvas");

const GUI = new gui();

const ctx = canvas.getContext("2d");

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const mouse = {
  x: 0,
  y: 0,
};

const parameters = {
  radius: 300,
  amplitude: 2,
  lerp: 0,
  centerCircle: false,
  rotate: 0,
  rotation: false,
};

let time = new Date();

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

ctx.fillStyle = "rgb(250, 250, 0)";
ctx.strokeStyle = "rgb(250, 102, 40)";

// Add points on circle
const pointsNumber = 20;
let radius = 300;
let rotate = 0;

GUI.add(parameters, "radius").min(0).max(600).step(1);
GUI.add(parameters, "amplitude").min(0).max(2).step(0.01);
GUI.add(parameters, "lerp").min(0).max(1).step(0.01);
GUI.add(parameters, "centerCircle").onChange((value) => {
  if (value) {
    gsap.to(parameters, { lerp: 1, duration: 1, ease: "pow2.out" });
  } else {
    gsap.to(parameters, { lerp: 0, duration: 1, ease: "pow2.out" });
  }
});
GUI.add(parameters, "rotation");
GUI.add(parameters, "rotate")
  .min(0)
  .max(Math.PI * 2)
  .step(0.01);
const center = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

const drawCircle = (radius, rotation) => {
  for (let i = 0; i < pointsNumber; i++) {
    const position = {
      x:
        radius * Math.cos(((Math.PI * 2) / pointsNumber) * i + rotation) +
        center.x,
      y:
        radius * Math.sin(((Math.PI * 2) / pointsNumber) * i + rotation) +
        center.y,
    };
    ctx.fillStyle = "rgb(250, 250, 0)";
    ctx.fillRect(position.x, position.y, 10, 10);
    // ctx.arc(position.x, position.y, 10, 0, Math.PI * 2, false);
  }
};

const lerp = (value1, value2, t) => {
  return (1 - t) * value1 + t * value2;
};

// Fonction qui lorsque je lui donne un objectif, va bouger jusqu'à celui-ci petit a petit

const linearMoveTo = (target, objective, lerp) => {
  if (target == objective) return target;

  if (target > objective) {
    return (target = Math.max(target - lerp, objective));
  } else {
    return (target = Math.min(target + lerp, objective));
  }
};

drawCircle(radius, rotate);

const amplitude = 2;
const frequency = 0.001;

const tick = () => {
  // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // ctx.globalAlpha = 0.5;
  ctx.fillStyle = "rgba(0, 0, 0, 0.9";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  // ctx.fillRect(mouse.x - 25, mouse.y - 25, 50, 50);

  let elapsedTime = new Date() - time;

  // console.log(elapsedTime);

  // radius += Math.cos(elapsedTime * frequency) * parameters.amplitude;

  // if (parameters.centerCircle) {
  //   radius = linearMoveTo(radius, 0, 10);
  // } else {
  //   radius = linearMoveTo(radius, 300, 10);
  // }

  // if (parameters.rotation) {
  //   rotate = linearMoveTo(rotate, Math.PI / 2, 0.1);
  // } else {
  //   rotate = linearMoveTo(rotate, 0, 0.1);
  // }

  // radius = lerp(0, 300, 0.3);
  radius = lerp(100, 300, parameters.lerp);
  rotate = lerp(0, Math.PI / 2, parameters.lerp);

  // console.log(radius);

  drawCircle(radius, rotate);

  // console.log(radius);

  // //Draw a line
  // ctx.moveTo(0, 0);
  // ctx.lineTo(mouse.x, mouse.y);
  // ctx.stroke();

  // ctx.beginPath();
  // ctx.arc(mouse.x, mouse.y, 40, 0, 2 * Math.PI);
  // ctx.stroke();

  requestAnimationFrame(tick);
};

tick();
