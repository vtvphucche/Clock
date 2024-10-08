const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const toolbar = document.getElementById('toolbar');
const drawBtn = document.getElementById('draw-btn');
const eraseBtn = document.getElementById('erase-btn');
const clearBtn = document.getElementById('clear-btn');
const colorPicker = document.getElementById('color-picker');

let drawing = false;
let lastX, lastY;

// Set up the canvas
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.lineWidth = 5;

// Create a dotted background
function createDottedBackground() {
  ctx.fillStyle = '#ccc';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#fff';
  for (let x = 0; x < canvas.width; x += 10) {
    for (let y = 0; y < canvas.height; y += 10) {
      ctx.fillRect(x, y, 2, 2);
    }
  }
}

createDottedBackground();

// Add event listeners
drawBtn.addEventListener('click', () => {
  drawing = true;
});

eraseBtn.addEventListener('click', () => {
  ctx.globalCompositeOperation = 'destination-out';
});

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createDottedBackground();
});

colorPicker.addEventListener('input', () => {
  ctx.strokeStyle = colorPicker.value;
});

canvas.addEventListener('mousedown', (e) => {
  lastX = e.offsetX;
  lastY = e.offsetY;
  drawing = true;
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.globalCompositeOperation = 'source-over';
});

canvas.addEventListener('mouseout', () => {
  drawing = false;
});