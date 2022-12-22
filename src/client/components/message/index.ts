export default function Message(text: string) {
  const message = document.createElement('div');
  message.innerHTML = text;
  message.classList.add('global-message');
  document.body.appendChild(message);
  setTimeout(() => {
    message.style.transition = 'all 1s linear';
    message.style.transform = 'translate(-50%, -300px)';
    setTimeout(() => {
      document.body.removeChild(message);
    }, 1000);
  }, 2000);
}
