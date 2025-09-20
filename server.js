// server.js
import jsonServer from "json-server";
import auth from "json-server-auth";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// obligatoire pour json-server-auth
server.db = router.db;

// middlewares
server.use(middlewares);
server.use(auth);
server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`✅ JSON Server Auth running at http://localhost:${PORT}`);
});
