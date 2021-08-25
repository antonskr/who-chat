const path = require('path');
const bodyParser = require("body-parser");
const fetch = require('node-fetch');
const PORT = process.env.PORT || 3001;

const express = require("express"),
    register = require('./routes/register'),
    login = require('./routes/login'),
    printWatch = require('./routes/print-watch')
/*    jwt = require('jsonwebtoken');*/

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

let all_messages;
let currentLength;

const messages = async () =>
    await (await fetch('http://localhost:8055/items/messages')).json()

const setCurrentLength = async () => {
    all_messages = await messages()
    currentLength = await all_messages.data.length
}
setCurrentLength()


app.use('/register', register);
app.use('/login', login);
app.use('/print', printWatch);

app.post('/message', async (req, res) => {

    fetch("http://localhost:8055/items/messages",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: req.body.text,
                user_id: req.body.userId,
                time: req.body.time
            }),
            method: "POST",
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            res.json({status: 'ok'})
            setCurrentLength()
        });
});


app.post("/send", async (req, res) => {
    let count = 0

    if (req.body.primary) {
        res.json(await messages())

    } else {
        const check = async function checker() {
            count++
            if (count <= 10) {
                if (req.body.length !== currentLength) {
                    res.json(await messages())
                    currentLength = req.body.length
                    return;
                }
            } else {
                res.json(await messages())
                return;
            }
            setTimeout(arguments.callee, 1000)
        }();

    }

});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});