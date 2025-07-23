const boardSubscribers = new Map();

function addSubscriber(boardId, res) {
  if (!boardSubscribers.has(boardId)) {
    boardSubscribers.set(boardId, new Set());
  }
  boardSubscribers.get(boardId).add(res);
  console.log(`Subscriber added for board ${boardId}`);
}

function removeSubscriber(boardId, res) {
  if (boardSubscribers.has(boardId)) {
    boardSubscribers.get(boardId).delete(res);
    console.log(`Subscriber removed for board ${boardId}`);
  }
}

module.exports = { addSubscriber, removeSubscriber, boardSubscribers };
