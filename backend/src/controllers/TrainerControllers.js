// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all trainers from the database
    const trainers = await tables.trainer.readAll(req.query);

    // Respond with the trainers in JSON format
    res.json(trainers);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific trainer from the database based on the provided ID
    const trainer = await tables.trainer.read(req.params.id);

    // If the trainer is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the trainer in JSON format
    if (trainer == null) {
      res.sendStatus(404);
    } else {
      res.json(trainer);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  const putTrainer = req.body;

  try {
    // Fetch a specific Type from the database based on the provided ID
    const result = await tables.trainer.update(req.params.id, putTrainer);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the Type in JSON format
    if (result.affectedRows === 1) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the trainer data from the request body
  const trainer = req.body;

  try {
    // Insert the trainer into the database
    const insertId = await tables.trainer.create(trainer);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted trainer
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    await tables.trainer.delete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
