const app = require("express")();
const webpush = require("web-push");
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT || 5000;

const vapidKeys = {
  publicKey:
    "BAuMi3kNJ8Z7jn2RGrVAXBiM0SgPQ4wn_uyOIJW4EKBYjv9Kjc-aQg9wGKrDAwercAtnBykVdxhy2uqBz3LndmY",
  privateKey: "2CH3hTkz3XaI562gGACLH7SyUZpQXDbKDseVX_6GSIE",
};

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("product_sale", (dt) => {
    webpush
      .sendNotification(dt.sub, dt.load)
      .catch((error) => console.error(error));
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
