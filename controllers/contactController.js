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
            phoneNumber : req.body.phoneNumber,
            id : req.body.contactId
        }
        editContactInDB(editedContact,client,res);
    });
    
    app.delete('/contactDelete', (req,res) =>{
        res.setHeader('Content-Type', 'application/json');
        const id = req.body.id;
        deleteContactFromDB(id,client,res);
    });
}

const addingContactQuery = (contact) =>  {
    return `INSERT INTO contacts(user_id,contact_first_name,contact_last_name,contact_email,contact_phone_number)
    VALUES('${contact.userId}','${contact.firstName}','${contact.lastName}','${contact.email}','${contact.phoneNumber}') 
    RETURNING contact_id`; 
}

const editingContactQuery = (editedContact) =>{
    return `UPDATE contacts SET contact_first_name = '${editedContact.firstName}',contact_last_name = '${editedContact.lastName}',
    contact_email = '${editedContact.email}', contact_phone_number = '${editedContact.phoneNumber}'
    WHERE contact_id = '${editedContact.id}' RETURNING contact_id`;
}

const addContactToDB = (contact, client ,res) =>{
    const query = addingContactQuery(contact);
    client.query(query,(err ,response)=>{
        if(response){
            const id = response.rows[0].contact_id;
            getContactFromDB(id,client,res);
        }else{
            res.status(403).send("something went wrong");
        }
    });
}

const editContactInDB = (editedContact , client ,res) =>{   
    const query = editingContactQuery(editedContact);
    client.query(query,(err,response)=>{
        if(response){
            const id = response.rows[0].contact_id;
            getContactFromDB(id,client,res); 
        }else{
            console.log(err);
            res.status(403).send("could not edit contact");
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
    })
}

const deleteContactFromDB = (id, client ,res) =>{
    client.query(`DELETE FROM contacts WHERE contact_id = '${id}'`,(err,response)=>{
        if(response){
            res.status(200).send(response);
        }else{
            res.status(403).send("could not delete");
        }
    })
}