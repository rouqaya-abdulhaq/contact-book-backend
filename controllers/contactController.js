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
    app.put('/contactAdd', (req, res) =>{
        res.setHeader('Content-Type', 'application/json');
        const body = req.body;
        const newContact = {
            firstName : body.firstName,
            lastName : body.lastName,
            email : body.email,
            phoneNumber : body.phoneNumber
        }
        users[0].contacts.push(newContact);
        res.send(newContact);
    });
    
    app.put('/contactEdit', (req, res) =>{
        res.setHeader('Content-Type', 'application/json');
        const editedContact = {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            phoneNumber : req.body.phoneNumber
        }
        users[0].contacts[req.body.index] = editedContact;
        res.send(editedContact);
    });
    
    app.delete('/contactDelete', (req,res) =>{
        res.setHeader('Content-Type', 'application/json');
        users[0].contacts.splice(req.body.index, 1);
        res.send(req.body.index.toString());
    });
}