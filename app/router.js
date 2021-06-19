const express = require("express");
const searchController = require("./controllers/searchController");
const router = express.Router();

router.get("/api/", searchController.home);
router.post("/api/", searchController.getSearch);
// router.get ('/search/:france/:region/:department/:townType/:minPeopleUU/:maxPeopleUU/:minPeopleTown/:maxPeopleTown/:schoolNeeded/:schoolType', searchController.getSearch);

//middleware de fin de chaine pour indiquer à l'utilisateur qu'on n'a pas trouvé la ressource qu'il demandait
router.use((request, response) => {
  response.status(404).json({ error: "Ressource non trouvée" });
});

module.exports = router;
