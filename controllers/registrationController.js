module.exports = (app,client) =>{
    app.post('/signUp', (req, res) =>{
        res.setHeader('Content-Type', 'application/json');
        const newUser = assignNewUser(req.body);
        if(newUser){
            addUserToDB(newUser,res,client)
        }else{
            res.status(400).send('unable to register');
        }
    });

    app.post('/signIn', (req, res) =>{
        const password = req.body.password;
        const email = req.body.email;
        getUserFromDB(email,password,res,client);
    });
}

const addUserToDB = (newUser,res,client) =>{
    client.query(`INSERT INTO users(user_first_name, user_last_name, email, password
        ) VALUES('${newUser.firstName}','${newUser.lastName}','${newUser.email}','${newUser.password}')`,(err,response)=>{
            if(response){
                getUserFromDB(newUser.email,newUser.password,res);
            }else{
                console.log(err);
                res.status(400).send(err.detail)
            }
        });
}
const getUserFromDB = (email,password ,res,client) =>{
    client.query(`SELECT * FROM users WHERE email='${email}' AND password='${password}'`,(err,response)=>{
        if(response){
            res.status(200).send(response.rows[0]); 
        }else{
            console.log(err);
            res.status(401).send("no such user");
        }
        client.end();
    });
}

const assignNewUser = (reqBody) =>{
    if(checkNewUser(reqBody)){
        return {
            firstName : reqBody.firstName,
            lastName : reqBody.lastName,
            email : reqBody.email,
            password : reqBody.password 
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
