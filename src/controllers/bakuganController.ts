import { BakuganGet, BakuganPost } from "../types/bakuganReponse";
import { Request, Response } from "express";

import {
  getBakuganDB,
  addBakuganDB,
  updateBakuganDB,
  deleteBakuganDB,
  getBakuganPorIdDB,
} from "../usecases/bakuganUseCase";

const getBakugan = async (request: Request, response: Response) => {
  try {
    const data: BakuganGet[] = await getBakuganDB();

    return response.status(200).json(data);
  } catch (err: unknown) {
    return response.status(400).json({
      status: "error",
      message: err,
    });
  }
};

const addBakugan = async (request: Request, response: Response) => {
  console.log(request.body);
  await addBakuganDB(request.body)
    .then((data: BakuganGet) =>
      response.status(201).json({
        status: "success",
        message: "Bakugan criado",
        objeto: data,
      }),
    )
    .catch((err: unknown) =>
      response.status(400).json({
        status: "error",
        message: err,
      }),
    );
};

const updateBakugan = async (request: Request, response: Response) => {
  await updateBakuganDB(request.body)
    .then((data: BakuganPost) =>
      response.status(200).json({
        status: "success",
        message: "Bakugan atualizado",
        objeto: data,
      }),
    )
    .catch((err: unknown) =>
      response.status(400).json({
        status: "error",
        message: err,
      }),
    );
};

const deleteBakugan = async (request: Request, response: Response) => {
  const id = Number(request.params.id);
  await deleteBakuganDB(id)
    .then((data: string) =>
      response.status(200).json({
        status: "success",
        message: data,
      }),
    )
    .catch((err: unknown) =>
      response.status(400).json({
        status: "error",
        message: err,
      }),
    );
};

const getBakuganPorId = async (request: Request, response: Response) => {
  const id = Number(request.params.id);
  await getBakuganPorIdDB(id)
    .then((data: BakuganGet) => response.status(200).json(data))
    .catch((err: unknown) =>
      response.status(400).json({
        status: "error",
        message: err,
      }),
    );
};

module.exports = {
  getBakugan,
  addBakugan,
  updateBakugan,
  deleteBakugan,
  getBakuganPorId,
};
