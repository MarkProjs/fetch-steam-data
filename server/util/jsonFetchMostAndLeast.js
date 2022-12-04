const fs = require("fs/promises")
const fetch = require("node-fetch-commonjs")
const reviews = require("../data/reviews/reviews.json")

//Build Genre Array from all Genres
function buildGenreArray() {
  let genreArray = []
  //For each item in reviews.json
  reviews.forEach(item => 
    //For each Genre in the Genre array each item
    item.Genre.forEach(genre => {
      //Create a boolean that determines if it gets added to the final array or not
      let newEntryCheck = true;
      //Check if that genre already exists by flipping the boolean
      genreArray.forEach(existingGenre => {
        if(existingGenre === genre){
          newEntryCheck = false
        }
      })
      //If it already exists, do nothing. If it doesn't, add it
      if(newEntryCheck){
        genreArray.push(genre)
      }
    })
  )
  return genreArray
}

//Find Highest rated games per genre
function findHighestRatedGames() {
  //Build genre array
  let genreArray = buildGenreArray()
  //Initialize the array to hold the game's data
  let topGamesArray = []
  //For each genre in the genreArray
  genreArray.forEach(genre => {
    //Initialize a topReview value
    let topValue = 0
    //Initialize a value to hold the game's appID
    let topAppId = ""
    reviews.forEach(item => {
      if(item.Genre.includes(genre)){
        //Update the topvalue if the positive reviews are higher
        if(topValue < item.positiveReviews){
          topValue = item.positiveReviews
          topAppId = item.id
        }
      }
    })
    topGamesArray.push({Genre: genre, id: topAppId, reviews: topValue})
  })
  return topGamesArray
}

//Find Lowest rated games per genre
function findLowestRatedGames() {
  //Build genre array
  let genreArray = buildGenreArray()
  //Initialize the array to hold the game's data
  let lowGamesArray = []
  //For each genre in the genreArray
  genreArray.forEach(genre => {
    //Initialize a lowReview value
    let lowValue = 0
    //Initialize a value to hold the game's appID
    let lowAppId = ""
    reviews.forEach(item => {
      if(item.Genre.includes(genre)){
        //Update the lowvalue if the negative reviews are higher
        if(lowValue < item.negativeReviews){
          lowValue = item.negativeReviews
          lowAppId = item.id
        }
      }
    })
    lowGamesArray.push({Genre: genre, id: lowAppId, reviews: lowValue})
  })
  return lowGamesArray
}

//Fetch game details and put them in JSON format


module.exports = {findHighestRatedGames, findLowestRatedGames}