require("dotenv").config()
const dbUrl = process.env.ATLAS_URI
const { MongoClient } = require("mongodb")

class DB {

  constructor(){
    if(!dbInstance){
      dbInstance = this
      this.client = new MongoClient(dbUrl)
      this.db = null
      this.collection = null
    }
    return dbInstance
  }
    
  async connect(){
    if(dbInstance.db){
      return
    }
    await dbInstance.client.connect()
    dbInstance.db = dbInstance.client.db("reviews")
    console.log("Successfully connected to MongoDB database: reviews")
    dbInstance.collection = await dbInstance.db.collection("totalReviews")
  }

  async close(){
    await dbInstance.client.close()
    dbInstance = null
  }

  async readAll(){
    return await dbInstance.collection.find().toArray()
  }
}

let dbInstance = new DB()
//Impedes the object's children from changing
Object.freeze(dbInstance)

module.exports = dbInstance