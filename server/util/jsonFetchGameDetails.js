const fetch = require("node-fetch-commonjs")

//Fetch game details and put them in JSON format
async function jsonFetchPositiveGameDetails(gamesJSON) {
  let detailedGamesJSON = gamesJSON
  for(i = 0; i < gamesJSON.topGames.length; i++){
    console.log(i)
    let appID = gamesJSON.topGames[i].id
    const topURL = 
    `http://store.steampowered.com/api/appdetails?appids=${appID}&l=english`
    //Fetch
    try {
      const response = await fetch(topURL)
      if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`)
      }
      let data = await response.json()
      //We get the game's name, the header image, short description and release date
      detailedGamesJSON.topGames[i].name = data[appID].data.name
      detailedGamesJSON.topGames[i].image = data[appID].data.header_image
      detailedGamesJSON.topGames[i].description = data[appID].data.short_description
      detailedGamesJSON.topGames[i].date = data[appID].data.release_date.date
    } catch(err){
      console.error(err)
    }
  }
  return detailedGamesJSON
}

module.exports = jsonFetchPositiveGameDetails