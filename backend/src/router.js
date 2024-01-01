const express = require("express");

const router = express.Router();
const pkmnControllers = require("./controllers/pkmnControllers");
const typeControllers = require("./controllers/typeControllers");

/* Pokemon routes */
router.get("/pokemons", pkmnControllers.browse);
router.get("/pokemons/:id", pkmnControllers.read);
router.post("/pokemons", pkmnControllers.add);
router.put("/pokemons/:id", pkmnControllers.edit);
router.delete("/pokemons/:id", pkmnControllers.destroy);

/* Types routes */
router.get("/types", typeControllers.browse);
router.get("/types/:id", typeControllers.read);
router.post("/types", typeControllers.add);
router.put("/types/:id", typeControllers.edit);
router.delete("/types/:id", typeControllers.destroy);

/* Users routes */

router.post("/login", (req, res) => {
  const user = {
    mail: "admin@pkmn.com",
    hash: "pkmn",
  };

  if (user.mail === req.body.mail && user.hash === req.body.password) {
    res.status(200).json({ msg: "connected" });
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;