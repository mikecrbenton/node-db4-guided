

// YOU NEED TO MANUALLY LABEL YOUR FILES IN ORDER TO RUN IN THE CORRECT ORDER

exports.seed = async function(knex) {
	await knex("zoos_animals").truncate()
	await knex("animals").truncate()
	await knex("species").truncate()
	await knex("zoos").truncate()
}