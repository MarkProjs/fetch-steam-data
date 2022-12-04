const DB = require("../db/db") 
const reviews = require("../data/reviews.json")
const positiveGames = require("../data/positiveGames.json")
const negativeGames = require("../data/negativeGames.json")

async function insertData(){
  try{
    const db = DB
    //Reviews
    await deleteAndPopulate(db, reviews, "totalReviews", "reviews")

    //Top positive games
    await deleteAndPopulate(db, positiveGames.topGames, "positiveGamesDetails",
      "positively top rated games")

    //Top negative games
    await deleteAndPopulate(db, negativeGames.lowGames, "negativeGamesDetails",
      "negatively top rated games")

    //Top Ratio positive games
    await deleteAndPopulate(db, positiveGames.ratios, "ratioPositiveGamesDetails",
      "positive high ratio games")

    //Top Ratio negative games
    await deleteAndPopulate(db, negativeGames.ratios, "ratioNegativeGamesDetails",
      "negative high ratio games")
  } catch(err) {
    console.error(err)
    process.exit()
  }
}

async function deleteAndPopulate(db, data, collectionName, message){
  let collection = db.db.collection(collectionName)
  await collection.deleteMany()
  console.log(`cleared collection ${collectionName}`)
  let insertedData = await collection.insertMany(data)
  console.log(`Inserted ${insertedData.insertedCount} ${message}`)
}

module.exports = insertData