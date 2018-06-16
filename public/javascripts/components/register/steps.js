let btnNext = document.querySelectorAll('.btnStep');
let btnPrev = document.querySelectorAll('.steps_back');
let steps = document.querySelectorAll('.step');
let circles = document.querySelectorAll('.circleP');


btnNext.forEach(item => {
  item.addEventListener('click', () => {
    let id = +item.dataset.id;

    steps.forEach(item => {
      if (+item.dataset.id === id + 1) item.classList.add('visible');
      else item.classList.remove('visible');
    });

    circles.forEach(item => {
      if (+item.dataset.id === id + 1) item.classList.add('active');
      else item.classList.remove('active');
    });
  });
});


btnPrev.forEach(item => {
  item.addEventListener('click', () => {
    let id = +item.dataset.id;

    steps.forEach(item => {
      if (+item.dataset.id === id - 1) item.classList.add('visible');
      else item.classList.remove('visible');
    });

    circles.forEach(item => {
      if (+item.dataset.id === id - 1) item.classList.add('active');
      else item.classList.remove('active');
    });
  });
});
