const users = [{name : "rouqaya", email : "rouqaya@gmail.com", password : "red", contacts : []}];

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
const port = 3000


app.use(body_parser.urlencoded({ extended: true }))

app.use(body_parser.json());



app.get('/', (req, res) => res.send('Hello World!'))

app.post('/signUp', (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    const newUser = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }
    users.push(newUser);
    res.send(users);
})

app.post('/signIn', (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    for (user of users){
        if(user.name === req.body.name && user.email === req.body.email && user.password === req.body.password){
            res.send(user);
        }
    }
    res.send("user not found");

});

app.put('/contactAdd', (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    const newContact = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        phoneNumber : req.body.phoneNumber
    }
    users[0].contacts.push(newContact);
    res.send(users[0]);
});

app.put('/contactEdit', (req, res) =>{

});

app.put('/contactDelete', (req,res) =>{

});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))