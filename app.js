const cartSize = require('./middleware/cartsize');
const query = require('./middleware/query');
const user = require('./middleware/user');
const error = require('./middleware/error');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('express-async-errors');
const express = require('express');
const app = express();


require('./startup/handlebars')(app);


app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cartSize);
app.use(query);
app.use(user);
app.use(error);


require('./startup/routes')(app);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
