const { MongoClient, ObjectId } = require("mongodb");

//to add or register students
module.exports.addUpdatedTasks = async(url,dbName, userData)=>  {   //exporting the module that has arguments that are shared via calling.
    const client = await MongoClient.connect(url)  //creating a promise and waiting for the client to respond
    console.log(typeof(userData));
    const addUser = client  //variable to perform the function
        .db(dbName)   // name of the db [shared via arguments]
        .collection("TASKS2")  //name of the collection in the db
        .insertOne(userData)    //inserOne: used to insert a data in the db

    console.log("at mongodb")
    console.log("type of userdata at mongo....")
    console.log(typeof(userData))
    return addUser;  //returning the above variable
 
}
