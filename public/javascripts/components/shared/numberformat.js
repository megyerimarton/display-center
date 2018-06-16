module.exports = function(number, c, d, t) {
  c = isNaN(c = Math.abs(c)) ? 2 : c;
  d = d == undefined ? '.' : d;
  t = t == undefined ? ',' : t;
  const s = number < 0 ? '-' : '';
  const i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(c)));
  const j = i.length > 3 ? i.length % 3 : 0;
  return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(number - i).toFixed(c).slice(2) : '');
};
