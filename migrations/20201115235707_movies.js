exports.up = (knex, Promise) =>
  knex.schema.createTable('movies', table => {
    table.increments()
    table
      .string('name')
      .notNullable()
      .unique()
    table.integer('rating').notNullable()
  })

exports.down = (knex, Promise) => knex.schema.dropTable('movies')
