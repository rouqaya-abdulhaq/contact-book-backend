// const qs = require('querystring');

module.exports = (app, client) =>{
    app.get('/loadContacts' , (req,res) => {
        res.setHeader('Content-Type', 'application/json');
        const id = req.query.id;
        const query = getUserContactsQuery(id);
        client.query(query ,(err ,response) =>{
            if(response){
                res.status(200).send(response.rows);
            }else{
                console.log(err);
                return null;
            }
        })
    });
}

const getUserContactsQuery = (userId) =>{
    return `SELECT contact_id, contact_first_name, contact_last_name, contact_email, contact_phone_number
    FROM contacts WHERE user_id='${userId}'`;
}