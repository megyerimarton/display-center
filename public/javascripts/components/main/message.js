if (!sessionStorage.message) {
  sessionStorage.message = 0;
}

showMessage('.message.event');

if (sessionStorage.message == 0) {
  showMessage('.message.justOnce');
  sessionStorage.message = 1;
}

function showMessage(message) {
  const msg = document.querySelector(message);
  if (msg) {
    setTimeout(() => {
      msg.classList.add('active');
    }, 500);

    msg.querySelector('.msg-close').addEventListener('click', () => {
      msg.classList.remove('active');
      msg.classList.remove('msgMobile');
    });
  }
}
