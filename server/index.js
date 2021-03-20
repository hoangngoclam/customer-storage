const {MongoClient} = require('mongodb');

const url = "mongodb+srv://hoangngoclam:L%40m123123@cluster0.wsww8.mongodb.net?retryWrites=true&w=majority";
    const dbName = "customer-storage";

    MongoClient.connect(url,(error, client)=>{
        if(error) throw error;
        const dbo = client.db(dbName);
        dbo.collection('customer',(error, collection)=>{
          collection.insertOne({name:"Ngoc Lam"},(error, result)=>{
            console.log(result.result);
          })
        })
    })