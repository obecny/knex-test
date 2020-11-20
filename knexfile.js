const DB_URI = 'postgresql://localhost:5432/postgres?user=postgres&password=mysecretpassword.gitignore';
const { knexSnakeCaseMappers } = require('objection');

module.exports = {
  client: 'postgresql',
  connection: DB_URI,
  ...knexSnakeCaseMappers(),
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
