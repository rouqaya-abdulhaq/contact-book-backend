const express = require('express');
const body_parser = require('body-parser');
const app = express();
const {client} = require('./config'); 
client.connect();
const port = process.env.PORT || 5000;
const cors = require('cors');
const helmet = require('helmet');

const registrationController = require('./controllers/registrationController');
const contactController = require('./controllers/contactController');
const loadingController = require('./controllers/loadingControllers');
const styleController = require('./controllers/styleController');

const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;


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


app.use(body_parser.urlencoded({ extended: true }));
app.use(helmet());
app.use(body_parser.json());
app.use(cors());
app.use(checkForToken);

registrationController(app,client);

contactController(app,client);

loadingController(app,client);

styleController(app,client);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))