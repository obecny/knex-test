const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const knex = require('./connection');

const PORT = 3000;

const runServer = () => {
  const app = new Koa();
  app.use(logger());
  app.use(bodyParser());
  const router = new Router();
  router.get('/', async ctx => {
    try {
      // ASYNC
      const movies = await knex('movies').select('*');
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: movies,
      };

      // PROMISE
      // return knex('movies').select('*').then((movies) => {
      //   ctx.status = 201;
      //   ctx.body = {
      //     status: 'success',
      //     data: movies,
      //   };
      // });

    } catch (err) {
      console.log(err);
    }
  });

  router.get('/generate', async ctx => {
    try {
      const movie = await knex('movies')
        .insert({
          'name': Math.random().toString(36).substring(2),
          'rating': Math.floor(Math.random() * 10),
        })
        .returning('*');
      if (movie.length) {
        ctx.status = 201;
        ctx.body = {
          status: 'success',
          data: movie,
        };
      } else {
        ctx.status = 400;
        ctx.body = {
          status: 'error',
          message: 'Something went wrong.',
        };
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: err.message || 'Sorry, an error has occurred.',
      };
    }
  });

  app.use(router.routes());

  const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });

  return { server };
};

module.exports = { runServer };
