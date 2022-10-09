const router = require("express").Router();

const getData = () => {
  var productList = [];
  for (let i = 0; i < 10; i++) {
    productList.push({
      Id: i + 1,
      Title: `Product ${i + 1}`,
      Price: Math.floor(Math.random() * 100000) + 5000,
    });
  }
  return productList;
};

router.get("/", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",

    // enabling CORS
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  });

  let eventInterval = setInterval(() => {
    res.write(`event: message\n`);
    res.write(`data: ${JSON.stringify(getData())}\n\n`);
  }, 2000);

  req.on("close", (err) => {
    clearInterval(eventInterval);
    res.end();
  });
});

module.exports = router;
