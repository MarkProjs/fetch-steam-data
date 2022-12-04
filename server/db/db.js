require("dotenv").config()
const dbUrl = process.env.ATLAS_URI
const { MongoClient } = require("mongodb")

let dbInstance

class DB {
  //Singleton
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
    console.log(`Collection: ${dbInstance.collection}`)
  }

  async close(){
    await dbInstance.client.close()
    dbInstance = null
  }

  async readAll(){
    return await dbInstance.collection.find().toArray()
  }
}

let instance = new DB()

module.exports = instance