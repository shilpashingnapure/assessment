import express from 'express';
import {connect} from './config/db.js';
import { findById, login, register } from './controller/auth_controller.js';
import cors from 'cors';
import { createFeed, feeds, searchRes } from './controller/post_controller.js';
import { comments, createComment } from './controller/comment_controller.js';
import { User } from './model/user_model.js';


const app = express();
app.use(express.json())
app.use(cors())

app.post('/register' , register);
app.post('/login' , login)

app.get('/user' , findById)

// feed
app.post('/post' , createFeed)
app.get('/feed' , feeds)

// comment to post
app.post('/comment' , createComment)
app.get('/comments' , comments)


// search for post 
app.get('/search' , searchRes)



app.listen(4000 , () => {
    connect()
    console.log('server is running on port 4000 ....')
})