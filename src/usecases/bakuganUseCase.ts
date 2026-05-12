import { BakuganGet, BakuganPost } from "../types/bakuganReponse";
import { Bakugan } from "../entities/bakugan";

import pool from "../../config";

const getBakuganDB = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM bakugan ORDER BY nome");
    return rows.map(
      (bakugan: BakuganGet) =>
        new Bakugan(bakugan.id, bakugan.nome, bakugan.atributo, bakugan.poder),
    );
  } catch (error: unknown) {
    throw "[ERRO!]: " + error;
  }
};

const addBakuganDB = async (body: BakuganPost) => {
  try {
    const { nome, atributo, poder } = body;
    const results = await pool.query(
      `INSERT INTO bakugan (nome, atributo, poder) VALUES ($1, $2, $3) RETURNING id, nome, atributo, poder`,
      [nome, atributo, poder],
    );
    const bakugan = results.rows[0];
    return new Bakugan(
      bakugan.id,
      bakugan.nome,
      bakugan.atributo,
      bakugan.poder,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw "[ERRO!] Inserir bakugan: " + error;
    }
    throw "[ERRO!] Inserir bakugan: " + error;
  }
};

const updateBakuganDB = async (body: BakuganGet) => {
  try {
    const { id, nome, atributo, poder } = body;

    const results = await pool.query(
      `UPDATE bakugan
       SET nome = $1,
           atributo = $2,
           poder = $3
       WHERE id = $4
       RETURNING *`,
      [nome, atributo, poder, id],
    );

    if (results.rowCount == 0) {
      throw new Error(`Nenhum registro encontrado com o ID ${id}!`);
    }

    const bakugan = results.rows[0];

    return new Bakugan(
      bakugan.id,
      bakugan.nome,
      bakugan.atributo,
      bakugan.poder,
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("[ERRO!] Atualizar bakugan: " + error.message);
    }

    throw new Error("[ERRO!] Atualizar bakugan");
  }
};

const deleteBakuganDB = async (id: number) => {
  try {
    const results = await pool.query(`DELETE FROM bakugan WHERE id = $1`, [id]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o ID ${id}!`;
    } else {
      return "bakugan removido com sucesso!";
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw "[ERRO!] Inserir bakugan: " + error;
    }
    throw new Error("[ERRO!] Remover bakugan");
  }
};

const getBakuganPorIdDB = async (id: number) => {
  try {
    const results = await pool.query(`SELECT * FROM bakugan WHERE id = $1`, [
      id,
    ]);
    if (results.rowCount == 0) {
      throw `Nenhum registro encontrado com o ID ${id}!`;
    } else {
      const bakugan = results.rows[0];
      return new Bakugan(
        bakugan.id,
        bakugan.nome,
        bakugan.atributo,
        bakugan.poder,
      );
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw "[ERRO!] Inserir bakugan: " + error;
    }
    throw new Error("[ERRO!] Remover bakugan");
  }
};

export {
  getBakuganDB,
  addBakuganDB,
  updateBakuganDB,
  deleteBakuganDB,
  getBakuganPorIdDB,
};
