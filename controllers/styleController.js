module.exports = (app , client) =>{
    app.post('/selectStyle',(req, res)=>{
        if(req.email){
            const style = req.body.data.style;
            const id = req.body.data.id;
            updateStyleInDB(res,client,style,id);
        }
    });
}

const updateStyleInDB = (res,client,style,id) =>{
    client.query(`UPDATE users SET style = '${style}' WHERE user_id = '${id}'`,(err,response)=>{
        if(err){
            res.status(403).send("could not choose style");
        }else{
            res.status(200).send('style chosen succefully');
        }
    })
}