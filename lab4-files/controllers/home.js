// Controller handler to handle functionality in home page

const config = require("config");
const url = config.get("mongoURI");

// Example for handle a get request at '/' endpoint.
const MongoClient = require("mongodb");
var chat_room;

// Server path
function getHome(request, response) {
  MongoClient.connect(url, (err, client) => {
    const db = client.db("myFirstDatabase");

    if (!err) {
      chat_room = db.collection("chat_room");
      chat_room.find({}).toArray(function (err, result) {
        if (err) throw err;
        response.render("home", { title: "home", chatlist: result });
      });
    } else console.log("Error connecting to Database.");
  });
}

module.exports = {
  getHome,
};
