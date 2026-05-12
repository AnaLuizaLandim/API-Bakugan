import { HabilidadeGet, HabilidadePost } from "../types/habilidadeResponse";
import { Request, Response } from "express";

import {
  getHabilidadesUseCase,
  addHabilidadeUseCase,
  updateHabilidadeUseCase,
  deleteHabilidadeUseCase,
  getHabilidadePorIdUseCase,
} from "../usecases/habilidadesUseCase";

const getHabilidade = async (request: Request, response: Response) => {
  try {
    const data: HabilidadeGet[] = await getHabilidadesUseCase();

    return response.status(200).json(data);
  } catch (err: unknown) {
    return response.status(400).json({
      status: "error",
      message: err,
    });
  }
};

const addHabilidade = async (request: Request, response: Response) => {
  console.log(request.body);
  await addHabilidadeUseCase(request.body)
    .then((data: HabilidadeGet) =>
      response.status(201).json({
        status: "success",
        message: "Habilidade criado",
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

const updateHabilidade = async (request: Request, response: Response) => {
  await updateHabilidadeUseCase(request.body)
    .then((data: HabilidadePost) =>
      response.status(200).json({
        status: "success",
        message: "Habilidade atualizado",
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

const deleteHabilidade = async (request: Request, response: Response) => {
  const id = Number(request.params.id);
  await deleteHabilidadeUseCase(id)
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

const getHabilidadePorId = async (request: Request, response: Response) => {
  const id = Number(request.params.id);
  await getHabilidadePorIdUseCase(id)
    .then((data: HabilidadeGet) => response.status(200).json(data))
    .catch((err: unknown) =>
      response.status(400).json({
        status: "error",
        message: err,
      }),
    );
};

export {
  getHabilidade,
  addHabilidade,
  updateHabilidade,
  deleteHabilidade,
  getHabilidadePorId,
};
