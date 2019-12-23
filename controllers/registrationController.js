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


module.exports = (app) =>{
    console.log("register");
    app.post('/signUp', (req, res) =>{
        res.setHeader('Content-Type', 'application/json');
        const newUser = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }
        users.push(newUser);
        console.log(users);
        res.send(users[1]);
    })
    
    app.post('/signIn', (req, res) =>{
        //untill connected to real dataBase check first user only
        if(users[0].email === req.body.email && users[0].password === req.body.password){
            console.log(users[0]);
            res.status(200).send(users[0]);
        }else{
            res.status(401).send('no such user');
        }
    });
}