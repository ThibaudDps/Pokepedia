const AbstractManager = require("./AbstractManager");
const client = require("../../database/client");

class AuthManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "trainer" as configuration
    super({ table: "auth" });
  }

  // The C of CRUD - Create operation

  async create(auth) {
    // Execute the SQL INSERT query to add a new auth to the "auth" table
    const [result] = await client.query(
      `insert into ${this.table} (mail, password) values (?, ?)`,
      [auth.mail, auth.password]
    );
    // Return the ID of the newly inserted trainer
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read() {
    // Execute the SQL SELECT query to retrieve a specific trainer by its ID
    const [rows] = await this.database.query(
      `SELECT  id FROM ${this.table} WHERE id = (
        SELECT MAX( id )  AS idMax FROM ${this.table} )`
    );

    // Return the first row of the result, which represents the trainer
    return rows[0];
  }

  async readByEmail(mail) {
    // Execute the SQL SELECT query to retrieve a specific trainer by its ID
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE mail = ?`,
      [mail]
    );

    // Return the first row of the result, which represents the trainer
    return rows[0];
  }

  async readtrainer(authId) {
    // Execute the SQL SELECT query to retrieve a specific trainer by its authentication ID
    const [rows] = await this.database.query(
      `SELECT * FROM trainer WHERE auth_id = ?`,
      [authId]
    );

    // Return the first row of the result, which represents the trainer
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all trainers from the "trainer" table
    const [rows] = await client.query(
      `select id, name, picture, auth_id from ${this.table}`
    );

    // Return the array of trainers
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async update(id, trainer) {
    // Execute the SQL SELECT query to retrieve a specific trainer by its ID
    const [result] = await client.query(
      `UPDATE ${this.table} set ? WHERE id = ?`,
      [trainer, id]
    );

    // Return the first row of the result, which represents the item
    return result;
  }

  /*
  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove a trainer by its ID

  async delete(id) {
    const result = await client.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the trainer
    return result;
  }
  */
}

module.exports = AuthManager;
