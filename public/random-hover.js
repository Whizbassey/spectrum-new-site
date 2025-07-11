// List of badge colors
const badgeColors = [
  '#fb923c', // orange
  '#8b5cf6', // violet
  '#3b82f6', // blue
  '#10b981', // emerald
  '#ec4899', // pink
  '#facc15', // yellow
];

function setRandomHoverColor(e) {
  const color = badgeColors[Math.floor(Math.random() * badgeColors.length)];
  e.target.style.setProperty('--random-hover-color', color);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.random-hover-color').forEach(el => {
    el.addEventListener('mouseenter', setRandomHoverColor);
  });
}); 