## Installation
You need the docker and rest should be automatic.

1. Prepare docker containers
```
npm run docker:start
```
2. Install all dependencies and make necessary migrations to newly created docker with postgresql
```
npm i
```
3. Run the application
```
npm start
```
4. Generate some data by opening and refreshing page couple times.
Open browser at http://localhost:3000/generate
5. Now get some data from db opening browser at http://localhost:3000
6. Open zipkin using browser at http://localhost:9411/ and click on "Run Query"

You will see "KNEX-TEST http get" and "KNEX-TEST pg.query:select" this is wrong - it means that the traces are not connected

---
**You can click on column "START TIME" to sort traces via date and to see the latest as first**

---
 
## You have 2 options to fix it
### Option A
1. Edit file `tracing.js`
2. Uncomment the line 13 so that you can use `AsyncLocalStorageContextManager`, save 
3. Rerurn `npm start` 
4. Open browser at http://localhost:3000
5. Open zipkin using browser at http://localhost:9411/ and click on "Run Query"
6. You will see "KNEX-TEST http get" which has all traces tied together 

### Option B
1. Undo changes in `tracing.js`
2. Edit file `server.js` 
3. Comment lines 19-24
4. Uncomment lines 27-33
5. Rerurn `npm start`  
6. Open browser at http://localhost:3000
7. Open zipkin using browser at http://localhost:9411/ and click on "Run Query"
8. You will see "KNEX-TEST http get" which has all traces tied together even though the `AsyncLocalStorageContextManager` is not used 

## Expected solution and fix for knex
Fix the knex to correctly handle the context when using async / await, you should probably use
https://nodejs.org/docs/latest-v14.x/api/async_hooks.html#async_hooks_resource
