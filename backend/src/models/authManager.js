const AbstractManager = require("./AbstractManager");
const client = require("../../database/client");

class AuthManager extends AbstractManager {
  constructor() {
    super({ table: "auth" });
  }

  async create(auth) {
    const [result] = await client.query(
      `INSERT INTO ${this.table} (mail, password) VALUES (?, ?)`,
      [auth.mail, auth.password]
    );
    return result.insertId;
  }

  async read() {
    const [rows] = await client.query(
      `SELECT id FROM ${this.table} WHERE id = (SELECT MAX(id) AS idMax FROM ${this.table})`
    );
    return rows[0];
  }

  async readByEmail(mail) {
    const [rows] = await client.query(
      `SELECT auth.id, auth.mail, auth.password, auth.is_admin, trainer.name, trainer.picture
       FROM ${this.table}
       INNER JOIN trainer ON ${this.table}.id = trainer.auth_id
       WHERE mail = ?`,
      [mail]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await client.query(
      `SELECT id, name, picture, auth_id FROM ${this.table}`
    );
    return rows;
  }

  async update(id, trainer) {
    const [result] = await client.query(
      `UPDATE ${this.table} SET ? WHERE id = ?`,
      [trainer, id]
    );
    return result;
  }
}

module.exports = AuthManager;
