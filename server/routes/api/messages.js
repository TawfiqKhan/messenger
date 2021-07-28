const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // checck to see if the receiver is online and seeing the same conversation
    const recipient = onlineUsers[recipientId] || null;
    console.log("recipient----", recipient);
    const receiverHasRead =
      recipient && recipient.activeConv === conversationId ? true : false;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      // check if user have permission to send message to the conversation
      let getConversation = await Conversation.getConversation(conversationId);
      if (
        getConversation.user2Id === senderId ||
        getConversation.user1Id === senderId
      ) {
        const message = await Message.create({
          senderId,
          text,
          conversationId,
          receiverHasRead,
        });
        return res.json({ message, sender });
      } else {
        return res.sendStatus(403);
      }
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );
    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers[sender.id]) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      receiverHasRead,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.put("/update", async (req, res) => {
  const { messageIds, userId, convoId, otherUserId } = req.body;
  // first add users info to onlineUsers
  const currentUser = onlineUsers[userId] || null;
  if (currentUser) {
    currentUser.activeConv = convoId;
  }
  // check if the user is part of the conversation
  let conversation = await Conversation.getConversation(convoId);
  if (conversation.user2Id === userId || conversation.user1Id === userId) {
    // if yes then only update the received messages
    await Message.update(
      { receiverHasRead: true },
      {
        where: [
          {
            id: messageIds,
          },
          {
            senderId: otherUserId,
          },
        ],
      }
    );
    return res.sendStatus(204);
  } else {
    return res.sendStatus(403);
  }
});

module.exports = router;
