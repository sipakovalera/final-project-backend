const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
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

//morgan
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' })
app.use(morgan("combined", { stream: accessLogStream }));

//router
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log("Server started...");
    logger.info(`Example app listening at http://localhost:${port}`)
});


