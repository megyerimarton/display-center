const products = require('../routes/products');
const cart = require('../routes/cart');
const contact = require('../routes/contact');
const about = require('../routes/about');
const cartApi = require('../routes/api/cart');
const cityApi = require('../routes/api/city');
const productsApi = require('../routes/api/products');
const wishApi = require('../routes/api/wish');
const login = require('../routes/login');
const logout = require('../routes/logout');
const register = require('../routes/register');
const news = require('../routes/news');
const info = require('../routes/info');
const index = require('../routes/index');
const checkout = require('../routes/checkout');
const user = require('../routes/user/user');
const admin = require('../routes/admin/admin');
const adminOrders = require('../routes/admin/orders');
const adminProducts = require('../routes/admin/products');
const adminUsers = require('../routes/admin/users');
const adminNews = require('../routes/admin/news');


module.exports = function(app) {

  app.use('/api/cart', cartApi);
  app.use('/api/city', cityApi);
  app.use('/api/products', productsApi);
  app.use('/api/wish', wishApi);
  app.use('/products', products);
  app.use('/cart', cart);
  app.use('/news', news);
  app.use('/contact', contact);
  app.use('/about', about);
  app.use('/info', info);
  app.use('/login', login);
  app.use('/logout', logout);
  app.use('/register', register);
  app.use('/checkout', checkout);
  app.use('/user', user);
  app.use('/admin', admin);
  app.use('/admin/orders', adminOrders);
  app.use('/admin/products', adminProducts);
  app.use('/admin/users', adminUsers);
  app.use('/admin/news', adminNews);
  app.use('/', index);
  app.use('*', index);

};
