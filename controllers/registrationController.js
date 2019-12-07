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

module.exports = (app) =>{
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
        res.setHeader('Content-Type', 'application/json');
        for (user of users){
            if(user.email === req.body.email && user.password === req.body.password){
                console.log(user);
                res.send(user);
            }
        }
        res.send("user not found");
    });
}