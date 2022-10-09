const next = require("next");
require("dotenv").config({ path: ".env" });
const express = require("express");

const streamRoute = require("./router/streamRouter.js");
const logRoute = require("./router/logRouter.js");

//next.js configuration
const dev = process.env.NODE_DEV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

(async () => {
  await nextApp.prepare();
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //routes
  app.use("/stream", streamRoute);
  app.use("/api/v1/print", logRoute);

  //catch-all for nextJS /pages
  app.get("*", (req, res) => {
    return handle(req, res);
  });
  //listening server
  app.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log("listening on port " + process.env.PORT);
  });
})();
