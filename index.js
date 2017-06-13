var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
var height = window.innerHeight;
var width = window.innerWidth;
canvas.height = height;
canvas.width = width;

var center = width / 2;

ctx.lineWidth = 25;
ctx.beginPath();

ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';

function clear() {
  ctx.clearRect(0, 0, width, height);
}

var outer = 150;
var blink = true;

function animate() {
  clear();
  var start = blink ? 50 : 75;
  var current = 0;
  ctx.beginPath();
  while (current <= outer) {
    ctx.arc(center, height, start + current, 0, 2 * Math.PI);
    current += 50;
  }
  ctx.stroke();
  ctx.closePath();
  outer += 50;
  blink = !blink;
  if (outer <= height) {
    setTimeout(animate, 100);
  }
}

animate();