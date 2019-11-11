const users = [{name : "rouqaya", email : "rouqaya@gmail.com", password : "red", contacts : [
    {
        firstName : "rahaf",
        lastName : "abdulhaq",
        email : "rahaf@gmail.com",
        phoneNumber : "765373768"
        },
        {
            firstName : "ghada",
            lastName : "abdulhaq",
            email : "ghada@gmail.com",
            phoneNumber : "765373768"
        }   
]}];

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
const port = 5000;
const cors = require('cors');


app.use(body_parser.urlencoded({ extended: true }))

app.use(body_parser.json());
app.use(cors());


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/signUp', (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    const newUser = {
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    }
    users.push(newUser);
    console.log(users);
    res.send(users);
})

app.post('/signIn', (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    for (user of users){
        if(user.name === req.body.name && user.email === req.body.email && user.password === req.body.password){
            console.log(user);
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
    res.setHeader('Content-Type', 'application/json');
    const editedContact = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        phoneNumber : req.body.phoneNumber
    }
    users[0].contacts[req.body.index] = editedContact;
    res.send(users[0]);
});

app.put('/contactDelete', (req,res) =>{
    res.setHeader('Content-Type', 'application/json');
    users[0].contacts.splice(req.body.index, 1);
    res.send(users[0]);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))