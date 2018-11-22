var Pusher = require("pusher");

var pusher = new Pusher({
  appId: "649442",
  key: "ba07e9ae8cac25d7175b",
  secret: "d4a44b8d1be20bb1ce34",
  cluster: "eu",
  encrypted: true
});

module.exports = async function(context, req) {
  pusher.trigger("my-channel", "my-event", {
    message: req.body
  });
};
