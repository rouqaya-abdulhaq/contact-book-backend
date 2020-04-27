const users = [{name : "rouqaya", email : "rouqaya@gmail.com", password : "red", contacts : [
    {
        firstName : "rahaf",
        lastName : "abdulhaq",
        email : "rahaf@gmail.com",
        phoneNumber : "765s"
        },
        {
            firstName : "ghada",
            lastName : "abdulhaq",
            email : "ghada@gmail.com",
            phoneNumber : "765373768"
        }   
]}];


module.exports = (app,client) =>{
    app.post('/signUp', (req, res) =>{
        res.setHeader('Content-Type', 'application/json');
        const newUser = req.body.firstName && req.body.lastName && req.body.email && req.body.password ? {
            fisrtName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            password : req.body.password
        } : null;
        if(newUser){
            client.query(`INSERT INTO users(user_first_name, user_last_name, email, password
                ) VALUES('${newUser.firstName}','${newUser.lastName}','${newUser.email}','${newUser.password}')`,(err,response)=>{
                    if(response){
                        console.log(response);
                        res.status(200).send(newUser);
                    }else{
                        console.log(err);
                        res.status(400).send(err.detail)
                    }
                });
            
        }else{
            res.status(400).send('unable to register');
        }
    });
    
    app.post('/signIn', (req, res) =>{
        const password = req.body.password;
        const email = req.body.email;
        client.query(`SELECT * FROM users WHERE email='${email}' AND password='${password}'`,(err,response)=>{
            if(response){
                res.status(200).send(response.rows[0]); 
            }else{
                res.status(401).send("no such user");
            }
            client.end();
        });
    });
}