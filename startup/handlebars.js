const hbs = require('express-handlebars');


module.exports = function(app) {
  app.engine('hbs', hbs({
    extname: 'hbs',
    layoutsDir: __dirname + '/../views',
    partialsDir: __dirname + '/../views/partials',

    helpers: {
      copyrightYear: () => {
          return new Date().getFullYear();
      },

      savePercent: (ar, akciosAr) => {
        return Math.round(100 - (akciosAr / ar * 100));
      },

      dateFormat: (date) => {
        return date.toISOString().slice(0, 10);
      },

      stripTags: (text) => {
        return text.replace(/<[^>]*>/g, '');
      },

      numberFormat: (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      },

      is: (a, b, options) => {
        return (a === b) ? options.fn(this) : options.inverse(this);
      },
      isNot: (a, b, options) => {
        return (a !== b) ? options.fn(this) : options.inverse(this);
      },

      contains: (a, b, options) => {
        return (eval(b).includes(a)) ? options.fn(this) : options.inverse(this);
      },

      add: (a, b) => {
        return a + b;
      },

      queryTransform: (object, query) => {
        let string = '?';

        if (!query) {
          for (const key in object) {
            if (object.hasOwnProperty(key)) {
              string += `${key}=${object[key]}&`;
            }
          }
          return string;
        }
        const queryArray = (typeof query === 'string') ? query.split('=') : null;

        let isIncludes = false;

        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            if (queryArray && queryArray[0] === key) {
              string += `${queryArray[0]}=${queryArray[1]}&`;
              isIncludes = true;
            }
            else string += `${key}=${object[key]}&`;
          }
        }

        return (queryArray && !isIncludes) ? `${string}${queryArray[0]}=${queryArray[1]}` : string.slice(0, -1);
      },

      contentNoPadding: () => "['index', 'news', 'products', 'product', 'cart']"
    }
  }));

  app.set('view engine', 'hbs');
  app.set('views', './views');
};
