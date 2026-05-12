const { pool } = require('../config');
const Bakugan = require('../entities/bakugan');

const getBakugansDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM bakugans ORDER BY nome');
        return rows.map((bakugan) => new Bakugan(bakugan.id, bakugan.nome));
    } catch (error) {
        throw '[ERRO!]: ' + error;
    }
}

const addBakuganDB = async (body) => {
    try {
        const { nome, email } = body;
        const results = await pool.query(`INSERT INTO bakugans (nome, email) VALUES ($1, $2) RETURNING id, nome`, [nome]);
        const bakugan = results.rows[0];
        return new bakugan(bakugan.id, bakugan.nome, bakugan.email);
    } catch (error) {
        throw '[ERRO!] Inserir bakugan: ' + error;
    }
}

const updateBakuganDB = async (body) => {
    try {
        const { id, nome, email } = body;
        const results = await pool.query(`UPDATE bakugans SET nome = $1 WHERE id = $3`, [nome]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id}!`;
        }
        const bakugan = results.rows[0];
        return new bakugan(bakugan.id, bakugan.nome, bakugan.email);
    } catch (error) {
        throw '[ERRO!] Atualizar bakugan: ' + error;
    }
}

const deleteBakuganDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM bakugans WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id}!`;
        } else {
            return 'bakugan removido com sucesso!'
        }
    } catch (error) {
        throw '[ERRO!] Remover bakugan: ' + error;
    }
}

const getbakuganPorIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM bakugans WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o ID ${id}!`;
        } else {
            const bakugan = results.rows[0];
            return new Bakugan(bakugan.id, bakugan.nome, bakugan.email);
        }
    } catch (error) {
        throw '[ERRO!]: ' + error;
    }
}

module.exports = { getBakugansDB, addBakuganDB, updateBakuganDB, deleteBakuganDB, getbakuganPorIdDB };