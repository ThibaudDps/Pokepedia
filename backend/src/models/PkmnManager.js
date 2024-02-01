const AbstractManager = require("./AbstractManager");

class pokemonManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "pokemon" as configuration
    super({ table: "pokemon" });
  }

  // The C of CRUD - Create operation

  async create(pokemon) {
    // Execute the SQL INSERT query to add a new pokemon to the "pokemon" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, description, image, type_id, type_id_2) values (?,?,?,?,?)`,
      [
        pokemon.name,
        pokemon.description,
        pokemon.image,
        pokemon.type_id,
        pokemon.type_id_2,
      ]
    );

    // Return the ID of the newly inserted pokemon
    return result.insertId;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific Pokémon by its ID
    const [rows] = await this.database.query(
      `SELECT pokemon.*, pktype.type AS type, pktype.icon AS icon, pktype2.type AS type2, pktype2.icon AS icon2
       FROM pokemon
       INNER JOIN pktype ON pktype.id = pokemon.type_id
       LEFT JOIN pktype AS pktype2 ON pktype2.id = pokemon.type_id_2
       WHERE pokemon.id = ?`,
      [id]
    );
    return rows[0]; // Assuming only one Pokémon is fetched
  }

  async readAll(query) {
    const value = [];
    let url = `SELECT ${this.table}.id, ${this.table}.type_id, ${this.table}.type_id_2, ${this.table}.image, ${this.table}.name, ${this.table}.description, 
               pktype.id AS pktype_id, pktype.type AS type, pktype.icon AS icon,
               pktype2.id AS pktype_id_2, pktype2.type AS type2, pktype2.icon AS icon2
               FROM ${this.table}
               INNER JOIN pktype ON pktype.id = ${this.table}.type_id
               LEFT JOIN pktype AS pktype2 ON pktype2.id = ${this.table}.type_id_2`;

    if (query.type) {
      url += ` where ${this.table}.type_id = ?`;
      value.push(query.type);
    }
    url += ` ORDER BY pokemon.id ASC`;

    // Execute the SQL SELECT query to retrieve all pokemons from the "pokemon" table
    const [rows] = await this.database.query(url, value);

    // Return the array of pokemons
    return rows;
  }

  // The U of CRUD - Update operation
  async update(id, putPkmn) {
    // Execute the SQL SELECT query to retrieve a specific pkmns by its ID
    const [result] = await this.database.query(
      `UPDATE ${this.table} set name = ?, description = ?, image = ?, type_id = ?, type_id_2 = ? WHERE id = ?`,
      [
        putPkmn.name,
        putPkmn.description,
        putPkmn.image,
        putPkmn.type_id,
        putPkmn.type_id_2,
        id,
      ]
    );

    // Return the first row of the result, which represents the item
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    const result = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the pkmn
    return result;
  }
}

module.exports = pokemonManager;
