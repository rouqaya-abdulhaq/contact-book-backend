const users = [];

/*
    PLAN :
    1- SIGN UP : POST (USER) => PROFILE
    2- LOG IN : POST (USER EMAIL , USER PASSWORD) => PROFILE
    3- LOAD CONTACTS : GET () => CONTACTS 
    4- ADD CONTACT : PUT (CONTACT) => 
    5- EDIT CONTACT : PUT (EIDTED CONTACT) => NEW CONTACT
    6- DELETE CONTACT : PUT
 */

const express = require('express')
const body_parser = require('body-parser');
const app = express()
// const body_parser = require('body-parser');
const port = 3000

// const urlc = app.use(body_parser.urlencoded({ extended: false }))

app.use(body_parser.urlencoded({ extended: true }))

app.use(body_parser.json());


// const urlEncodedParser = 

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/signUp', (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    const newUser = {
        name : req.body.name,
        email : req.body.email
    }
    users.push(newUser);
    res.send(users);
})

app.post('/signIn', (req, res) =>{


});

app.put('/contactAdd', (req, res) =>{

});

app.put('/contactEdit', (req, res) =>{

});

app.put('/contactDelete', (req,res) =>{

});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))