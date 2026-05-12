import { Router } from "express";
import bakuganRoutes from "./routeBakugan";

const routes = Router();

routes.use(bakuganRoutes);

export default routes;
