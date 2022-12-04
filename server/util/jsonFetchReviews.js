const fetch = require("node-fetch-commonjs")
const cleanedGenresJSON = require("../data/nonfinal_data/cleaned_game_genres.json")

//Gets # of positive and negative reviews for a game in JSON format
async function jsonFetchReviews(stringNumber){
  const number = parseInt(stringNumber)
  let jsonArray = []
  //length is 7333. Next is /7332
  //Big loop (change + 1 to + 200 eventually)
  for(i = number; i < number + 1; i++){
    console.log(i)
    //Get id from json data
    let data = cleanedGenresJSON[i]
    //Query id with the interface that gets reviews
    const url = `https://store.steampowered.com/appreviews/${data.appid}?json=1&language=all`
    //Fetch
    try{
      const response = await fetch(url)
      if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`)
      }
      const newData = await response.json() 
      const summary = newData.query_summary
      const cleanedData = {id: data.appid, Genre: data.Genre,
        positiveReviews: summary.total_positive, negativeReviews: summary.total_negative}
      //Add data to big json object
      jsonArray.push(cleanedData)
    } catch (err) {
      console.error(err)
    }
  }
  return jsonArray
}

module.exports = jsonFetchReviews