require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.eoazvpp.mongodb.net/Test?retryWrites=true&w=majority`;
//const uri = "mongodb+srv://Hasindu:Hasindu123@cluster0.eoazvpp.mongodb.net/Test?retryWrites=true&w=majority&appName=Cluster0&tls=false";

const client = new MongoClient(uri, { useNewUrlParser: true });

let projectCollection;

client.connect((err, db) => {
    if (!err) {
        projectCollection = client.db().collection("Cat");
        console.log('Database Connected');
    } else {
        console.log('[error]', err);
    }
});

const getCollection = () => {
    return projectCollection;
};

module.exports = {
    getCollection
};
