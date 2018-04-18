const { remote, screen } = require('electron');
const mouse = require('osx-mouse')();

const mainWindow = remote.getCurrentWindow();
const { width, height } = screen.getPrimaryDisplay().workAreaSize;
const menuBarHeight = screen.getMenuBarHeight();

let activeHighlight = true;

const canvas = document.querySelector('canvas');
canvas.setAttribute('height', height);
canvas.setAttribute('width', width);
const context = canvas.getContext('2d');

function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function setMouseLocation() {
  const { x, y } = screen.getCursorScreenPoint();

  clear();
  context.fillStyle = 'rgba(0,0,0,0.9)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.save();
  context.globalCompositeOperation = 'destination-out';
  context.translate(x-x*20, 0);
  context.scale(20, 1);
  context.beginPath();
  context.arc(x, y - menuBarHeight, 30, 0, 2 * Math.PI, false);
  context.fill();
  context.restore();
}

function init() {
  setMouseLocation();

  mouse.on('move', () => {
    if (activeHighlight) {
      setMouseLocation();
    }
  });

  mouse.on('left-down', () => {
    clear();
  });

  mouse.on('left-up', (x, y) => {
    if (activeHighlight) {
      setMouseLocation();
    }
  });
}

function toggleMouseHighlight() {
  if(activeHighlight) {
    activeHighlight = false;
    clear();
  } else {
    activeHighlight = true;
    setMouseLocation();
  }
}

window.toggleMouseHighlight = toggleMouseHighlight;

module.exports = {
  init,
  toggleMouseHighlight
};
