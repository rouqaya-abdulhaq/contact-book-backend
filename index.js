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

const client = new pg.Client({
    connectionString : DATABASE_URL
});

client.connect();
const port = 5000;
const cors = require('cors');
const registrationController = require('./controllers/registrationController');
const contactController = require('./controllers/contactController');
const loadingController = require('./controllers/loadingControllers');
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'uidufhiuerpoiwwhsih434y4egbfhybg872g3yv87249i839hngiurhui870';

app.use(body_parser.urlencoded({ extended: true }))

app.use(body_parser.json());
app.use(cors());

registrationController(app,client);

contactController(app,client);

loadingController(app,client);


const checkForToken = (req,res,next) =>{
    const token = req.headers["x-access-token"];
    if(!token){
        return next();
    }
    jwt.verify(token,accessTokenSecret,(err,decoded)=>{
        if (err) {
            return res.status(401).json({
              success: false,
              message: 'Please register Log in using a valid email to submit posts'
            });
        }else{
            req.user = decoded
            next();
        } 
    })
}

const getUserById = (id,res) =>{
    client.query(`SELECT user_first_name, user_id FROM users WHERE user_id='${id}'`,(err,response)=>{
        if(response){
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const info = {
                ...response.rows[0],
                data : {
                    accessToken : accessToken,
                    expiresAt : tomorrow,
                },
            }
            res.status(200).send(info); 
        }else{
            res.status(401).send("no such user");
        }
    });
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))