import { Router } from "express";
import {
  getHabilidade,
  addHabilidade,
  updateHabilidade,
  deleteHabilidade,
  getHabilidadePorId,
} from "../controllers/habilidadesController";

const habilidadesRoutes = Router();

habilidadesRoutes
  .route("/habilidades")
  .get(getHabilidade)
  .post(addHabilidade)
  .put(updateHabilidade);

habilidadesRoutes
  .route("/habilidades/:id")
  .delete(deleteHabilidade)
  .get(getHabilidadePorId);

export default habilidadesRoutes;
