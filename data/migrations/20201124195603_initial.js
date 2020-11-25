
exports.up = async function(knex) {
  await knex.schema.createTable("zoos", (table) => {
     table.increments("id")
     table.text("name").notNull()
     table.text("address").notNull().unique()
  })
  await knex.schema.createTable("species", (table) => {
     table.increments("id")
     table.text("name").notNull().unique()
  })
  await knex.schema.createTable("animals", (table) => {
     table.increments("id")
     table.text("name").notNull()
     table
         .integer("species_id") // NEEDS TO MATCH THE DATA TYPE OF THE COLUMN ITS REFERENCING
         .references("id")      // CREATES THE FOREIGN KEY
         .inTable("species")    // TABLE REFERENCED
         .onDelete("SET NULL") // ***KEY CONCEPT**  SET THE VALUE OF ATTACHED FOREIGN KEYS TO NULL 
         .onUpdate("CASCADE")
         // sqlite.org/foreignkeys.html for all options ( CASCADE, RESTRICT, ETC...)
  })
  await knex.schema.createTable("zoos_animals", (table) => {
     table
      .integer("zoo_id")
      .references("id")
      .inTable("zoos")
      .onDelete("CASCADE") // DELETES 
      .onUpdate("CASCADE") // UPDATES REFERENCES
      .notNull()
     table
      .integer("animal_id")
      .references("id")
      .inTable("animals")
      .onDelete("CASCADE") // DELETES 
      .onUpdate("CASCADE") // UPDATES REFERENCES
      .notNull()
     table
      .date("arrival")
      .notNull()
      .defaultTo(knex.raw("current_timestamp")) //default current date
     table.date("departure")
     // YOU CAN MAKE THE PRIMARY KEY A COMBINATION OF TWO COLUMNS
     // RATHER THAN A SPECIFIC COLUMNS - ( IS A POSSIBILITY )
     table.primary(["zoo_id", "animal_id"])
  })

};

exports.down = async function(knex) {
 // **NEED TO DROP TABLES IN REVERSE ORDER OF CREATING THEM**
 // BECAUSE OF REFERENCES/POINTERS
 // -- YOU WILL LOSE DATA IF YOU ROLLBACK
  await knex.schema.dropTableIfExists("zoos_animals")
  await knex.schema.dropTableIfExists("animals")
  await knex.schema.dropTableIfExists("species")
  await knex.schema.dropTableIfExists("zoos")
};
