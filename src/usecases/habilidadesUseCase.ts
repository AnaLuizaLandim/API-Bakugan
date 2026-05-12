import { BakuganGet, BakuganPost } from "../types/bakuganReponse";
import { Habilidades } from "../entities/habilidades";

import pool from "../../config";
import { HabilidadeGet, HabilidadePost } from "../types/habilidadeResponse";

const getHabilidadesUseCase = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM habilidade ORDER BY nome");
    return rows.map(
      (habilidade: HabilidadeGet) =>
        new Habilidades(
          habilidade.id,
          habilidade.nome,
          habilidade.descricao,
          habilidade.bakugan_id,
        ),
    );
  } catch (error: unknown) {
    throw "[ERRO!]: " + error;
  }
};

const addHabilidadeUseCase = async (body: HabilidadePost) => {
  try {
    const { nome, descricao, bakugan_id } = body;
    const results = await pool.query(
      `INSERT INTO habilidade (nome, descricao, bakugan_id) VALUES ($1, $2, $3) RETURNING id, nome, descricao, bakugan_id`,
      [nome, descricao, bakugan_id],
    );
    const habilidade = results.rows[0];
    return new Habilidades(
      habilidade.id,
      habilidade.nome,
      habilidade.descricao,
      habilidade.bakugan_id,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw "[ERRO!] Inserir habilidade: " + error;
    }
    throw "[ERRO!] Inserir habilidade: " + error;
  }
};

const updateHabilidadeUseCase = async (body: HabilidadeGet) => {
  try {
    const { id, nome, descricao, bakugan_id } = body;

    const results = await pool.query(
      `UPDATE habilidade
       SET nome = $1,
           descricao = $2
           bakugan_id = $3
       WHERE id = $4
       RETURNING *`,
      [nome, descricao, bakugan_id, id],
    );

    if (results.rowCount == 0) {
      throw new Error(`Nenhum registro encontrado com o ID ${id}!`);
    }

    const habilidade = results.rows[0];

    return new habilidade(
      habilidade.id,
      habilidade.nome,
      habilidade.descricao,
      habilidade.bakugan_id,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("[ERRO!] Atualizar habilidade: " + error.message);
    }

    throw new Error("[ERRO!] Atualizar habilidade");
  }
};

const deleteHabilidadeUseCase = async (id: number) => {
  try {
    const results = await pool.query(`DELETE FROM habilidade WHERE id = $1`, [
      id,
    ]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o ID ${id}!`;
    } else {
      return "habilidade removido com sucesso!";
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw "[ERRO!] Inserir habilidade: " + error;
    }
    throw new Error("[ERRO!] Remover habilidade");
  }
};

const getHabilidadePorIdUseCase = async (id: number) => {
  try {
    const results = await pool.query(`SELECT * FROM habilidade WHERE id = $1`, [
      id,
    ]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o ID ${id}!`;
    } else {
      const habilidade = results.rows[0];
      return new habilidade(
        habilidade.id,
        habilidade.nome,
        habilidade.descricao,
        habilidade.bakugan_id,
      );
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw "[ERRO!] Inserir habilidade: " + error;
    }
    throw new Error("[ERRO!] Remover habilidade");
  }
};

export {
  getHabilidadePorIdUseCase,
  deleteHabilidadeUseCase,
  updateHabilidadeUseCase,
  addHabilidadeUseCase,
  getHabilidadesUseCase,
};
