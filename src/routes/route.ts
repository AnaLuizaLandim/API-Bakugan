import { Router } from "express";
import bakuganRoutes from "./routeBakugan";
import habilidadesRoutes from "./routeHabilidades";

const routes = Router();

routes.use(bakuganRoutes);
routes.use(habilidadesRoutes);

export default routes;
