const DB = require("../db/db") 
const reviews = require("../data/reviews.json")

async function insertData(){
  try{
    const db = DB
    await db.connect("reviews", "totalReviews")
    let insertedReviews = await db.insertMany(reviews)
    console.log(`Inserted ${insertedReviews} reviews`)
  } catch(err) {
    console.error(err)
    process.exit()
  }
}

module.exports = insertData