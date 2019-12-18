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

const messages = {notFound : "user not found"}

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
        for (user of users){
            if(user.email === req.body.email && user.password === req.body.password){
                res.setHeader('Content-Type', 'application/json');
                console.log(user);
                res.send(user);
            }
        }
        res.setHeader('Content-Type', 'plain/text');
        res.send("user not found");
    });
}