import mongoose from 'mongoose';

export const connect = async () => {
    try{
        mongoose.connect('mongodb://mongo:27017/feed-database')
    }catch{
        console.log('connection error.....')
    }
}

