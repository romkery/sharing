import { MouseEvent } from 'react';
export const createRipple = (
  event: MouseEvent & {
    currentTarget: HTMLButtonElement;
  },
) => {
  const button = event.currentTarget;

  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  const cssAnimation = document.createElement('style');
  const rules = document.createTextNode(
    '@keyframes ripple { to { transform: scale(4); opacity: 0;}}',
  );
  cssAnimation.appendChild(rules);
  const rect = button.getBoundingClientRect();

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.style.position = 'absolute';
  circle.style.borderRadius = '50%';
  circle.style.transform = 'scale(0)';
  circle.style.animation = 'ripple 800ms linear';
  circle.style.backgroundColor = 'rgba(255,255,255,0.5)';
  circle.classList.add('ripple');
  circle.appendChild(cssAnimation);

  setTimeout(() => {
    circle.remove();
  }, 800);

  button.appendChild(circle);
};
