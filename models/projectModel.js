const dbConnection = require('../dbConnection');


const insertProject = (project, callback) => {
    const projectCollection = dbConnection.getCollection();
    projectCollection.insertOne(project, (err, result) => {
        if (err) {
            console.log("Error inserting project:", err);
            callback(err, null);
        } else {
            console.log("Project successfully inserted:", result);
            callback(null, result);
        }
    });
};

const getProjects = (callback) => {
    const projectCollection = dbConnection.getCollection();
    projectCollection.find({}).toArray(callback)
};

module.exports = {
    insertProject,
    getProjects
};
