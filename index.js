import chalk from "chalk";
import cors from 'cors'
import express, {json} from "express";

const app = express()
app.use(express.json())
app.use(cors())


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
    
        users = [...users, newUser]
    
        res.status(201).send('OK')
    }

});

app.post('/tweets', (req, res) => {

    const {body} = req

    if (body.tweet === '') {
        res.status(400).send('Todos os campos são obrigatórios!')
    } else {
        const tweet = {
            username: req.header('user'),
            avatar: user.avatar,
            tweet: body.tweet
        };
    
        tweets.push(tweet)
    
        res.status(201).send('OK')
    }
    
});

app.get('/tweets', (req, res) => {

    const lastTweets = [] //para armazenar os ultimos 10 tweets

    for (let index = tweets.length - 1; index >= 0; index--) {
        if (lastTweets.length === 10) break
        else lastTweets.push(tweets[index])
    }

    res.send(lastTweets);
})

app.get('/tweets/:USERNAME', (req, res) => {
    const user = req.params.USERNAME;

    const userTweets = tweets.filter(userTweet => user === userTweet.username);

    res.send(userTweets);
})
app.listen(5000)