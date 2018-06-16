const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    main: './public/javascripts/components/main/main.js',
    home: './public/javascripts/components/home/home.js',
    register: './public/javascripts/components/register/register.js',
    checkout: './public/javascripts/components/checkout/checkout.js',
    products: './public/javascripts/components/products/products.js',
    product: './public/javascripts/components/product/product.js',
    cart: './public/javascripts/components/cart/cart.js',
    user: './public/javascripts/components/user/user.js',
    adminOrders: './public/javascripts/components/admin/orders.js',
    adminProducts: './public/javascripts/components/admin/products.js',
    adminUsers: './public/javascripts/components/admin/users.js',
    adminNews: './public/javascripts/components/admin/news.js',
    adminUploadNews: './public/javascripts/components/admin/uploadnews.js',
    adminUploadProducts: './public/javascripts/components/admin/uploadproducts.js'
  },
  output: {
      path: path.resolve(__dirname, 'public/javascripts'),
      filename: '[name].bundle.js'
  }
};
