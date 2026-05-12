import { Router } from "express";

const {
  getBakugan,
  addBakugan,
  updateBakugan,
  deleteBakugan,
  getBakuganPorId,
} = require("../controllers/bakuganController");

const bakuganRoutes = Router();

bakuganRoutes
  .route("/bakugan")
  .get(getBakugan)
  .post(addBakugan)
  .put(updateBakugan);

bakuganRoutes.route("/bakugan/:id").get(getBakuganPorId).delete(deleteBakugan);

export default bakuganRoutes;
