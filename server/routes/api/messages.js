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
    const { recipientId, text, conversationId, sender, receiverHasRead } =
      req.body;

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
      if (onlineUsers.some((user) => user.id === sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.post("/update", async (req, res) => {
  await Message.update(
    { receiverHasRead: true },
    {
      where: {
        id: req.body.messages,
      },
    }
  );

  return res.json("okay");
});

module.exports = router;
