const { Router } = require('express');
const { bakuganRoutes } = require('./routeBakugan');


const routes = new Router();

routes.use(bakuganRoutes);


module.exports = routes;