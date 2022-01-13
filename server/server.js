const express     = require("express"),
      bodyParser  = require("body-parser"),
      path        = require("path"),
      Board       = require("./board.js");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../build")));


let ca = new Board(25, 500);

app.put("/api/board/status", (req, res) => {
  if (req.body.isRunning) {
    ca.run();
    res.sendStatus(200);
  } else if (!req.body.isRunning) {
    ca.stop();
    res.sendStatus(200);
  }
});

app.put("/api/board/speed", (req, res) => {
  if(ca.isRunning){
    ca.changeSpeed(req.body.speed);
  } else {
    ca.speed = req.body.speed;
  }
  res.sendStatus(200);
});

app.post("/api/board", (req, res) => {
  ca = new Board(Number(req.body.size), Number(req.body.speed));
  res.sendStatus(200);
});

app.get("/api/board", (req, res) => {
  res.send({
    board: ca.board,
    generations: ca.generations,
    isRunning: ca.isRunning,
    speed: ca.speed,
  });
});

app.get("/api/board/generations", (req, res) => {
  res.send(ca.generations);
});

app.get("/api", (req, res) => {
  res.send({ message: "please use /api/board" });
});

app.get("/", (req, res) => {
  res.send({ message: "please use /api/board" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
