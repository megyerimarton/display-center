const numberFormat = require('../shared/numberformat');


function rangeSlider(name, order) {
  function setRangeBar() {
    let range1Value = parseFloat(document.querySelector('#' + name + '-range-1').value);
    let rangeMin = parseFloat(document.querySelector('#' + name + '-range-2').min);
    let rangeMax = parseFloat(document.querySelector('#' + name + '-range-2').max);
    let range2Value = parseFloat(document.querySelector('#' + name + '-range-2').value);

    let rangeLeft = (range1Value - rangeMin) / (rangeMax - rangeMin) * 100;
    let rangeWidth = ((range2Value - rangeMin) - (range1Value - rangeMin)) / (rangeMax - rangeMin) * 100;
    document.querySelector('#range-bar-' + order).style.left = rangeLeft + '%';
    document.querySelector('#range-bar-' + order).style.width = rangeWidth + '%';
  }
  setRangeBar();

  
  ['input', 'change'].forEach(event => {

    document.querySelector('#'+name+'-range-1').addEventListener(event, (e) => {
      let number = parseFloat(e.target.value);
      let number2 = parseFloat(document.querySelector('#'+name+'-range-2').value);
  
      if (number >= (number2 - 1)) {
        e.target.value = number2 - 1;
        document.querySelector('#'+name+'-range-from-1').innerHTML = numberFormat((number2 - 1), 0, '.', ' ');
      }
      else {
        document.querySelector('#'+name+'-range-from-1').innerHTML = numberFormat(number, 0, '.', ' ');
      }
  
      setRangeBar();
    });


    document.querySelector('#'+name+'-range-2').addEventListener(event, (e) => {
      let number = parseFloat(e.target.value);
      let number2 = parseFloat(document.querySelector('#'+name+'-range-1').value);
  
      if (number <= (number2 + 1)) {
        e.target.value = number2 + 1;
        document.querySelector('#'+name+'-range-to-1').innerHTML = numberFormat((number2 + 1), 0, '.', ' ');
      }
      else {
        document.querySelector('#'+name+'-range-to-1').innerHTML = numberFormat(number, 0, '.', ' ');
      }
  
      setRangeBar();
    });

  });
}


rangeSlider('price', 1);
rangeSlider('size', 2);
rangeSlider('warranty', 3);
