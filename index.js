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
const app = express();
const pg = require('pg');

const DATABASE_URL = 'postgres://postgres:patapon2012@127.0.0.1:5432/contact_book';

const database = new pg.Client({
    connectionString : DATABASE_URL
});

database.connect();
const port = 5000;
const cors = require('cors');
const registrationController = require('./controllers/registrationController');
const contactController = require('./controllers/contactController');

app.use(body_parser.urlencoded({ extended: true }))

app.use(body_parser.json());
app.use(cors());


registrationController(app);

contactController(app);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))