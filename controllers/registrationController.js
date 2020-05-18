const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = (app,client) =>{
    app.post('/signUp', (req, res) =>{
        res.setHeader('Content-Type', 'application/json');
        bcrypt.hash(req.body.password,saltRounds,(err,hash)=>{
            if(err){
                console.log(err);
            }else{
                const newUser = assignNewUser(req.body,hash);
                if(newUser){
                    addUserToDB(newUser,res,client)
                }else{
                    res.status(400).send('unable to register');
                }
            }
        })
    });

    app.post('/signIn', (req, res) =>{
        const password = req.body.password;
        const email = req.body.email;
        authUser(email,password,res,client);
    });
}

const addingUserQuery = (newUser) =>{
    return `INSERT INTO users(user_first_name, user_last_name, email, password
        ) VALUES('${newUser.firstName}','${newUser.lastName}','${newUser.email}','${newUser.password}')
        RETURNING email`;
}

const addUserToDB = (newUser,res,client) =>{
    const query = addingUserQuery(newUser)
    client.query(query,(err,response)=>{
            if(response){
                const returnedValue = response.rows[0];
                getUserFromDB(returnedValue.email,res,client);
            }else{
                res.status(400).send(err.detail)
            }
        });
}

const getUserFromDB = (email,res,client) =>{
    client.query(`SELECT user_first_name, user_id FROM users WHERE email='${email}'`,(err,response)=>{
        if(response){
            res.status(200).send(response.rows[0]); 
        }else{
            res.status(401).send("no such user");
        }
    });
}

const authUser = (email,password,res,client) =>{
    client.query(`SELECT password FROM users WHERE email='${email}'`,(err,response)=>{
        if(err){
            res.status(401).send("email not valid");
        }else{
            bcrypt.compare(password,response.rows[0].password,(err,isMatch)=>{
                if(err) {
                    console.log(err);
                }else if (isMatch){
                    getUserFromDB(email,res,client);
                }
            });
        }
    });
}

const assignNewUser = (reqBody,passwordHash) =>{
    if(checkNewUser(reqBody)){
        return {
            firstName : reqBody.firstName,
            lastName : reqBody.lastName,
            email : reqBody.email,
            password : passwordHash 
        }
    }
    return null;
}

const checkNewUser = (reqBody) =>{
    if(reqBody.firstName && reqBody.lastName && reqBody.email && reqBody.password){
        return true;
    }else{
        return false;
    }
}
