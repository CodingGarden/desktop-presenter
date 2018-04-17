const { remote, screen } = require('electron');
let mouseCircle;

function setMouseLocation(location) {
  mouseCircle.style.top = (location.y - 100) + 'px';
  mouseCircle.style.left = (location.x - 100) + 'px';
}

function init() {
  mouseCircle = document.createElement('div');
  mouseCircle.style.position = 'absolute';
  mouseCircle.style.background = 'yellow';
  mouseCircle.style.borderRadius = '50%';
  mouseCircle.style.opacity = '0.5';
  mouseCircle.style.width = '200px';
  mouseCircle.style.height = '200px';
  const location = screen.getCursorScreenPoint();
  setMouseLocation(location);

  document.body.appendChild(mouseCircle);

  document.body.addEventListener('mousemove', setCircle);

  function setCircle(event) {
    setMouseLocation({
      x: event.clientX,
      y: event.clientY
    });
  }
}

let isVisible = true;

function toggleMouseHighlight() {
  console.log(mouseCircle);
  const mainWindow = remote.getCurrentWindow();
  if(isVisible) {
    mainWindow.setIgnoreMouseEvents(true);
    isVisible = false;
    mouseCircle.style.display = 'none';
  } else {
    mainWindow.focus();
    mainWindow.setIgnoreMouseEvents(false);
    isVisible = true;
    mouseCircle.style.display = '';
  }
  const location = screen.getCursorScreenPoint();
  setMouseLocation(location);
}

window.toggleMouseHighlight = toggleMouseHighlight;

module.exports = {
  init,
  toggleMouseHighlight
};
