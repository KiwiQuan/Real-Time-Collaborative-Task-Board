const { boardSubscribers } = require("../models/boardSubscribers");

function broadcastToBoard(boardId, event, data) {
  if (boardSubscribers.has(boardId)) {
    boardSubscribers.get(boardId).forEach((subscriber) => {
      subscriber.write(`event: ${event}\n`);
      subscriber.write(`data: ${JSON.stringify(data)}\n\n`);
    });
    console.log(
      `Broadcasted to ${boardSubscribers.get(boardId).size} subscribers`
    );
  }
}

module.exports = { broadcastToBoard };
