var canvas = document.querySelector('#canvas');
var ctx = canvas.getContext('2d');
var height = window.innerHeight;
var width = window.innerWidth;
canvas.height = height;
canvas.width = width;

var center = width / 2;

ctx.lineWidth = 30;
ctx.beginPath();

var radius = 150;
while (radius < height) {
  radius += 50;
  ctx.arc(center, height, radius, 0, 2 * Math.PI);
}
ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
ctx.stroke();