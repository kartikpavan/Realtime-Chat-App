const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, (req, res) => {
  console.log(`Serving on ${PORT}`);
});

//SOCKET
const io = require('socket.io')(http)

io.on('connection', (socket) => {
  console.log('connected.....')
  socket.on('message', (msg) => {
    console.log(msg)
    socket.broadcast.emit('message', msg)
  })
})
