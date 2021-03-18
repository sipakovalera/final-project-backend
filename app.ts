const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRouter = require("./users/routes/users.route");
const logger = require('./utils/logger');

const app = express();
const port = 3000;


app.use(cors());
app.use('/upload', express.static('users/upload'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/users', usersRouter);
app.listen(port, () => {
  console.log("Server started...");
    logger.info(`Example app listening at http://localhost:${port}`)
});


