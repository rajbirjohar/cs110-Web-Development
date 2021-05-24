// Controller handler to handle functionality in room page

const config = require("config");
const url = config.get("mongoURI");

const roomGenerator = require("../util/roomIdGenerator.js");

var roomInfo;

// Example for handle a get request at '/:roomName' endpoint.
function getRoom(request, response) {
  roomInfo = {
    title: "Chatroom",
    roomName: request.params.roomName,
    newRoomId: roomGenerator.roomIdGenerator(),
  };
  response.render("room", roomInfo);
  postRoom();
}

function postRoom() {
  console.log(roomInfo);
  if (roomInfo.roomName != "") {
    const MongoClient = require("mongodb");
    var chat_room;

    // Server path
    MongoClient.connect(url, (err, client) => {
      const db = client.db("myFirstDatabase");

      if (!err) {
        chat_room = db.collection("chat_room");
        var messageArray = [];

        chat_room.insertMany(
          [
            {
              name: roomInfo.roomName,
              id: roomInfo.newRoomId,
              messages: messageArray,
            },
          ],
          (err, results) => {}
        );
      } else console.log("Error connecting to Database.");
    });
  }
}

function handleMessageRequest(req, res) {
  console.log("Handle message request");
}

module.exports = {
  getRoom,
  postRoom,
  handleMessageRequest,
};
