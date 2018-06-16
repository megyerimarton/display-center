document.querySelectorAll('.clickEffect').forEach(item => {
  item.addEventListener('click', (e) => {

    let circle = item.querySelector('.circle');

    if (!circle) {
      circle = document.createElement('span');
      circle.classList.add('circle');
      item.appendChild(circle);
    }

    circle.classList.remove('animate');

    if (!circle.style.height && !circle.style.width) {
      let d = Math.max(item.offsetWidth, item.offsetHeight);
      circle.style.height = d + 'px';
      circle.style.width = d + 'px';
    }

    let x = e.pageX - item.getBoundingClientRect().left - parseInt(circle.style.width) / 2;
    let y = e.pageY - item.getBoundingClientRect().top - parseInt(circle.style.height) / 2;

    circle.style.top = y + 'px';
    circle.style.left = x + 'px';
    circle.classList.add('animate');
  });
});
