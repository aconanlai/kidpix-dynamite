chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.text && (msg.text == "blow_up")) {
    var canvas = document.createElement('canvas');
    var height = window.innerHeight;
    var width = window.innerWidth;
    canvas.height = height;
    canvas.width = width;

    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    var center = width / 2;
    ctx.lineWidth = 25;
    var outer = 150;
    var furthest = 0;

    var blink = true;

    var image = new Image();
    image.src = msg.img;

    function clear() {
      ctx.clearRect(0, 0, width, height);
    }

    function animate(x, y) {
      console.log('hua');
      ctx.globalCompositeOperation = 'source-over';
      clear();
      ctx.drawImage(image, 0, 0, width, height);

      var start = blink ? 50 : 75;
      var current = 0;
      ctx.strokeStyle = 'white';
      ctx.globalCompositeOperation = 'difference';

      while (current <= outer) {
        ctx.beginPath();
        ctx.arc(x, y, start + current, 0, 3 * Math.PI);
        ctx.stroke();
        current += 50;
      }

      outer += 50;
      blink = !blink;

      if (outer <= furthest) {
        setTimeout(function () {
          animate(x, y);
        }, 100);
      } else {
        setTimeout(function () {
          document.removeEventListener('click', handleClick);
          document.body.classList.remove('activeDynamite');
          document.body.innerHTML = '';
        }, 500);
      }
    }

    function distanceBetween(x1, y1, x2, y2) {
      return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
    }

    function handleClick(e) {
      var x = e.clientX;
      var y = e.clientY;
      var toTopLeft = distanceBetween(x, y, 0, 0);
      var toTopRight = distanceBetween(x, y, width, 0);
      var toBottomLeft = distanceBetween(x, y, 0, height);
      var toBottomRight = distanceBetween(x, y, width, height);
      furthest = Math.max(toTopLeft, toTopRight, toBottomLeft, toBottomRight);
      animate(x, y);
    }

    canvas.id = 'activeTabScreenshot';
    document.body.appendChild(canvas);
    image.onload = function () {
      document.body.className += ' activeDynamite';
      document.addEventListener('click', handleClick);
    }
  }
});