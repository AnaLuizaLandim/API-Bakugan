const { Router } = require('express');

const { getBakugan, addBakugan, updateBakugan, deleteBakugan, getBakuganPorId } = require('../controllers/Bakuganontroller');

const bakuganRoutes = new Router();

bakuganRoutes.route('/bakugan')
    .get(getBakugan)
    .post(addBakugan)
    .put(updateBakugan)

bakuganRoutes.route('/bakugan/:id')
    .get(getBakuganPorId)
    .delete(deleteBakugan)

module.exports = { bakuganRoutes };