const reviews = require("../data/reviews.json")

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

//Find Highest rated games per genre and games with 
//the highest positive/negative reviews percentage ratio
//Note: some games have been removed from the reviews.json as /appdetails couldn't
//get additionnal data on them. Those games are (Positive): 279840, 242280, 229758,
//217430, 214850, 251040, 217370
//Negative: 271800, 251790, 297390, 217410, 253830
function findHighestRatedGames() {
  //Build genre array
  let genreArray = buildGenreArray()
  //Initialize the array to hold the game's data
  let topGamesJSON = {topGames: [], ratios: []}
  //For each genre in the genreArray
  genreArray.forEach(genre => {
    //Percentage ratio related values
    let ratioAppId = ""
    let ratioPositiveReviews = 0;
    let ratio = 0
    //Initialize a review value for the best value
    let topValue = 0
    //Initialize a value to hold the game's appID
    let topAppId = ""
    reviews.forEach(item => {
      if(item.Genre.includes(genre)){
        //Discard game if its already in the "top" viz 
        //(this gives erroneous data, but it won't be repetitive)
        if(!topGamesJSON.topGames.some(arrayItem => arrayItem.id === item.id)){
          //Update the topvalue and topAppId if the positive reviews are higher
          if(topValue < item.positiveReviews){
            topValue = item.positiveReviews
            topAppId = item.id
          }
        }  
        //Discard game if its already in the "ratio" viz 
        //(this gives erroneous data, but it won't be repetitive)
        if(!topGamesJSON.ratios.some(arrayItem => arrayItem.id === item.id)){
          //Calculate ratio
          let gameRatio = item.positiveReviews / (item.positiveReviews + item.negativeReviews)
            * 100
            //Update the ratio values if the ratio is higher
          if(ratio < gameRatio){
            ratio = gameRatio
            ratioPositiveReviews = item.positiveReviews
            ratioAppId = item.id
          }
          //Update the ratio values if the # of positive reviews is higher and
          //they have the same ratio
          if(ratio === gameRatio){
            if(ratioPositiveReviews < item.positiveReviews){
              ratio = gameRatio
              ratioPositiveReviews = item.positiveReviews
              ratioAppId = item.id
            }
          }
        }
      }
    })
    topGamesJSON.topGames.push({Genre: genre, id: topAppId, positiveReviews: topValue})
    topGamesJSON.ratios.push({Genre: genre, id: ratioAppId, percentage: ratio,
      positiveReviews: ratioPositiveReviews})
  })
  return topGamesJSON
}

//Find Lowest rated games per genre and games with the highest negative/positive reviews ratio
function findLowestRatedGames() {
  //Build genre array
  let genreArray = buildGenreArray()
  //Initialize the array to hold the game's data
  let lowGamesJSON = {lowGames: [], ratios: []}
  //For each genre in the genreArray
  genreArray.forEach(genre => {
    //Percentage ratio related values
    let ratioAppId = ""
    let ratioNegativeReviews = 0;
    let ratio = 0
    //Initialize a review value for the worst
    let lowValue = 0
    //Initialize a value to hold the game's appID
    let lowAppId = ""
    reviews.forEach(item => {
      if(item.Genre.includes(genre)){
        //Discard game if its already in the "low" viz 
        //(this gives erroneous data, but it won't be repetitive)
        if(!lowGamesJSON.lowGames.some(arrayItem => arrayItem.id === item.id)){
        //Update the topvalue and topAppId if the positive reviews are higher
          if(lowValue < item.negativeReviews){
            lowValue = item.negativeReviews
            lowAppId = item.id
          }
        }
        //Discard game if its already in the "ratio" viz 
        //(this gives erroneous data, but it won't be repetitive)
        if(!lowGamesJSON.ratios.some(arrayItem => arrayItem.id === item.id)){
        //Calculate ratio
          let gameRatio = item.negativeReviews / (item.positiveReviews + item.negativeReviews)
        * 100
        //Update the ratio values if the ratio is higher
          if(ratio < gameRatio){
            ratio = gameRatio
            ratioNegativeReviews = item.negativeReviews
            ratioAppId = item.id
          }
          //Update the ratio values if the # of positive reviews is higher and
          //they have the same ratio
          if(ratio === gameRatio){
            if(ratioNegativeReviews < item.negativeReviews){
              ratio = gameRatio
              ratioNegativeReviews = item.negativeReviews
              ratioAppId = item.id
            }
          }
        }
      }
    })
    lowGamesJSON.lowGames.push({Genre: genre, id: lowAppId, negativeReviews: lowValue})
    lowGamesJSON.ratios.push({Genre: genre, id: ratioAppId, percentage: ratio,
      negativeReviews: ratioNegativeReviews})
  })
  return lowGamesJSON
}

function getTotalReviewData(reviews){
  let genreArray = buildGenreArray()
  let totalReviewJSON = {}
  genreArray.forEach(item => {
    totalReviewJSON[item] = {positiveReviews: 0, negativeReviews: 0}
  })

  reviews.forEach(item => {
    item.Genre.forEach(genre => {
      totalReviewJSON[genre].positiveReviews += item.positiveReviews
      totalReviewJSON[genre].negativeReviews += item.negativeReviews
    })
  })
  return totalReviewJSON
}

module.exports = {findHighestRatedGames, findLowestRatedGames, getTotalReviewData}