

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/index';

const app = express();

app.use(cors({
    credentials: true
}));

app.use(compression());
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app);

server.listen(6655, () => {
    console.log('My name is penguin king')
});

const conn_str = 'mongodb+srv://ishyeen:oyPmJoeSKMpSqEZQ@firstcluster.id8ajii.mongodb.net/tsProject?retryWrites=true&w=majority&appName=firstcluster';

mongoose.Promise = Promise;
mongoose.connect(conn_str);
mongoose.connection.on('error', (error: Error) => {console.log(error)});

app.use('/', router())

//done
//blank