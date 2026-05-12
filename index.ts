import express from "express";
import cors from "cors";
import routes from "./src/routes/route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(routes);

app.listen(process.env.PORT || 3002, () => {
  console.log("Servidor da API rodando....");
});
