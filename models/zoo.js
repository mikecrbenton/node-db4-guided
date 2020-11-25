const db = require("../data/config")

function find() {
	return db("zoos")
}

function findById(id) {
	return db("zoos")
		.where("id", id)
		.first()
}

function findZooAnimals(zooID) {
   // SELECT animals.*
   // FROM zoos_animals 
   // JOIN zoos ON zoos_animals.zoo_id = zoos.id 
   // JOIN animals ON zoos_animals.animal_id = animals.id 
   // WHERE zoos.id = 1
   return db("zoos_animals as ZA")
      .innerJoin("zoos as Z", "Z.id", "ZA.zoo_id")
      .innerJoin("animals as A", "A.id", "ZA.animal_id")
      .innerJoin("species as S", "S.id", "A.species_id")
      .where("Z.id", zooID)
      //.select("A.*")
      .select( [ "A.id", "A.name", "S.name as species_name", "ZA.arrival", "ZA.departure"])
}

module.exports = {
	find,
   findById,
   findZooAnimals,
}