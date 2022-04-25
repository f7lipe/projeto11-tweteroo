import chalk from "chalk";
import cors from 'cors'
import express, {json} from "express";

const app = express()
app.use(express.json())


let user = {
    username: null,
    avatar: null
}
let users = []
let tweets = []

app.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body

    if (username === '' || avatar === '') {
        res.status(400).send('Todos os campos são obrigatórios!')
    } else {
        const newUser = {
            username: username,
            avatar: avatar
        }
        
        user = newUser;
    
        users = [...users, newUser];
    
        res.status(201).send('OK');
    }

});

app.post('/tweets', (req, res) => {

    const {body} = req;

    if (body.tweet === '') {
        res.status(400).send('Todos os campos são obrigatórios!');
    } else {
        const tweet = {
            username: req.header('user'),
            avatar: user.avatar,
            tweet: body.tweet
        };
    
        tweets.push(tweet);
    
        res.status(201).send('OK');
    }
    
});


app.listen(5000)