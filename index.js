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


const checkForToken = function(req,res,next){
    const token = req.headers["x-access-token"];
    if(!token){
        return next();
    }
    jwt.verify(token,accessTokenSecret,(err,decoded)=>{
        if (err) {
            return res.status(401).json({
              success: false,
              message: 'Please register/Log in using a valid email to use our services'
            });
        }else{
            req.email = decoded.email;
            req.accessToken = token;
            next();
        } 
    })
}


app.use(body_parser.urlencoded({ extended: true }))

app.use(body_parser.json());
app.use(cors());
app.use(checkForToken);

registrationController(app,client);

contactController(app,client);

loadingController(app,client);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))