module.exports = function(input, target) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function(e) {
      target.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
};
