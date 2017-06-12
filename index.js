var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
var height = window.innerHeight;
var width = window.innerWidth;
canvas.height = height;
canvas.width = width;

var center = width / 2;

ctx.lineWidth = 30;
ctx.beginPath();

ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';

function clear() {
  ctx.clearRect(0, 0, width, height);
}

var outer = 150;

function animate() {
  var current = 0;
  while (current <= outer) {
    current += 50;
    ctx.arc(center, height, current, 0, 2 * Math.PI);
  }
  ctx.stroke();
  outer += 50;
  setTimeout(animate, 100);
}

animate();