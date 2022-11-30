const fetch = require("axios")
const cleanedGenresJSON = require("../data/cleaned_game_genres.json")

//Should get # of positive and negative reviews
async function jsonFetchReviews(number){
  jsonArray = []
  //Big loop (change + 1 to + 200 eventually)
  for(i = number; i < number + 1; i++){
    //Get id from json data
    let data = cleanedGenresJSON[i]
    //query id with the interface that gets reviews
    const url = `store.steampowered.com/appreviews/${data.appid}?json=1&language=all`
    //fetch
    try{
      const response = await fetch(url)
      if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`)
      }
      const data = await response.json() 
      const summary = data.query_summary
      const cleanedData = {id: data.appid, Genre: data.Genre,
        positiveReviews: summary.total_positive, negativeReviews: summary.total_negative}
      //Add data to big json object
      jsonArray.push(cleanedData)
    } catch (err) {
      console.error(err)
    }
  }
  return jsonObject
}

module.exports = jsonFetchReviews