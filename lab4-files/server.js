// import dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const hbs = require("express-handlebars");
const path = require("path");
// Module calling
const MongoClient = require("mongodb");
var chat_room;

// Server path
const config = require("config");
const url = config.get("mongoURI");

MongoClient.connect(url, (err, client) => {
  const db = client.db("myFirstDatabase");

  if (!err) {
    console.log("successful connection with the server");
    chat_room = db.collection("chat_room");
  } else console.log("Error connecting to Database.");
});

// import handlers
const homeHandler = require("./controllers/home.js");
const roomHandler = require("./controllers/room.js");

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layouts/",
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// set up stylesheets route

// TODO: Add server side code
app.post("/create", (req, res) => {
  res.redirect(req.body.nickname);
});

app.get("/room", (req, res) => {
  //make a query that selects the name/id from the database
  //render it to room as object
  chat_room.find({ id: req.query.id }).toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
    res.render("room", { roomName: result[0].name, newRoomId: result[0].id });
  });
});

app.post("/insertText", (req, res) => {
  console.log(req.body);
  //find room id, then insert message from input into database
  chat_room.updateOne(
    { id: req.body.chatid },
    {
      $push: {
        messages: {
          name: req.body.name,
          id: req.body.chatid,
          text: req.body.text,
          time: req.body.time,
        },
      },
    }
  );
});

app.get("/getMsg", (req, res) => {
  chat_room.find({ id: req.query.id }).toArray(function (err, result) {
    if (err) throw err;
    res.json({ msg: "success", data: result });
  });
});

// Create controller handlers to handle requests at each endpoint
app.get("/", homeHandler.getHome);
app.get("/:roomName", roomHandler.getRoom);
app.get("/:roomName/messages", roomHandler.handleMessageRequest);

// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
