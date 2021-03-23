import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import usersRouter from "./users/routes/users.route";
import logger from './utils/logger';

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


