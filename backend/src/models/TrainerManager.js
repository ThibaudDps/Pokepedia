const AbstractManager = require("./AbstractManager");
const client = require("../../database/client");

class TrainerManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "trainer" as configuration
    super({ table: "trainer" });
  }

  // The C of CRUD - Create operation

  async create(trainer) {
    // Execute the SQL INSERT query to add a new trainer to the "trainer" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, picture, auth_id) values (?, ?, ?)`,
      [trainer.name, trainer.picture, trainer.auth_id]
    );
    // Return the ID of the newly inserted trainer
    return result.insertId;
  }

  async readByAuthId(id) {
    // Execute the SQL SELECT query to retrieve a specific trainer by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where auth_id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the trainer
    return rows[0];
  }

  // The Rs of CRUD - Read operations

  /*
  async readById(id) {
    // Execute the SQL SELECT query to retrieve a specific trainer by its ID
    const [rows] = await this.database.query(
      `select ${this.table}.id, ${this.table}.trainername, ${this.table}.DATE_FORMAT(birthday, "%Y-%m-%d")birthday, ${this.table}.picture, ${this.table}.regime_id, ${this.table}.auth_id, regime.name from ${this.table} INNER JOIN regime ON regime.id = ${this.table}.regime_id WHERE ${this.table}.id = ?`[
        id
      ]
    );

    // Return the first row of the result, which represents the trainer
    return rows[0];
  }
*/
  async readAll() {
    // Execute the SQL SELECT query to retrieve all trainers from the "trainer" table
    const [rows] = await client.query(
      `select id, trainername, DATE_FORMAT(birthday, "%Y-%m-%d")birthday, picture, regime_id, auth_id from ${this.table}`
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
}

module.exports = TrainerManager;
