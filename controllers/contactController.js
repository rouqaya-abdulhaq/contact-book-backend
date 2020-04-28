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

module.exports = (app ,client) =>{
    app.put('/contactAdd', (req, res) =>{
        res.setHeader('Content-Type', 'application/json');
        const body = req.body;
        const newContact = {
            userId : body.userId,
            firstName : body.firstName,
            lastName : body.lastName,
            email : body.email,
            phoneNumber : body.phoneNumber
        }
        addContactToDB(newContact,client,res);
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
        const id = req.body.id;
        deleteContactFromDB(id,client,res);
    });
}

const addContactToDB = (contact, client ,res) =>{
    client.query(`INSERT INTO contacts(user_id,contact_first_name,contact_last_name,contact_email,contact_phone_number)
    VALUES('${contact.userId}','${contact.firstName}','${contact.lastName}','${contact.email}','${contact.phoneNumber}') RETURNING contact_id`,(err ,response)=>{
        if(response){
            const id = response.rows[0].contact_id;
            getContactFromDB(id,client,res);
        }else{
            res.status(403).send("something went wrong");
        }
    });
}

const getContactFromDB = (id, client, res) =>{
    client.query(`SELECT * FROM contacts WHERE contact_id = '${id}'`,(err,response)=>{
        if(response){
            res.status(200).send(response.rows[0]);
        }else{
            res.status(403).send("something went wrong");
        }
        client.end();
    })
}

const deleteContactFromDB = (id, client ,res) =>{
    client.query(`DELETE FROM contacts WHERE contact_id = '${id}'`,(err,response)=>{
        if(response){
            res.status(200).send(response);
        }else{
            res.status(403).send("could not delete");
        }
        client.end();
    })
}