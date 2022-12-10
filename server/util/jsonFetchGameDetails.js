const fetch = require("node-fetch-commonjs")

//Fetch game details and put them in JSON format
async function jsonFetchPositiveGameDetails(gamesJSON) {
  let detailedGamesJSON = gamesJSON
  for(i = 0; i < gamesJSON.topGames.length; i++){
    console.log(i)
    let topAppID = gamesJSON.topGames[i].id
    const topURL = 
    `http://store.steampowered.com/api/appdetails?appids=${topAppID}&l=english`
    //Fetch
    try {
      const response = await fetch(topURL)
      if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`)
      }
      let data = await response.json()
      //We get the game's name, the header image, short description and release date
      detailedGamesJSON.topGames[i].name = data[topAppID].data.name
      detailedGamesJSON.topGames[i].image = data[topAppID].data.header_image
      detailedGamesJSON.topGames[i].description = data[topAppID].data.short_description
      detailedGamesJSON.topGames[i].date = data[topAppID].data.release_date.date
    } catch(err){
      console.error(err)
    }

    let ratioAppID = gamesJSON.ratios[i].id
    const ratioURL = `http://store.steampowered.com/api/appdetails?appids=${ratioAppID}&l=english`
    try {
      const responseRatio = await fetch(ratioURL)
      if(!responseRatio.ok){
        throw new Error(`HTTP error: ${responseRatio.status}`)
      }
      let dataRatio = await responseRatio.json()
      detailedGamesJSON.ratios[i].name = dataRatio[ratioAppID].data.name
      detailedGamesJSON.ratios[i].image = dataRatio[ratioAppID].data.header_image
      detailedGamesJSON.ratios[i].description = dataRatio[ratioAppID].data.short_description
      detailedGamesJSON.ratios[i].date = dataRatio[ratioAppID].data.release_date.date
    } catch(err) {
      console.error(err)
    }
  }
  return detailedGamesJSON
}

async function jsonFetchNegativeGameDetails(gamesJSON) {
  let detailedGamesJSON = gamesJSON
  for(i = 0; i < gamesJSON.lowGames.length; i++){
    console.log(i)
    let lowAppID = gamesJSON.lowGames[i].id
    const lowURL = 
      `http://store.steampowered.com/api/appdetails?appids=${lowAppID}&l=english`
      //Fetch
    try {
      const response = await fetch(lowURL)
      if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`)
      }
      let data = await response.json()
      //We get the game's name, the header image, short description and release date
      detailedGamesJSON.lowGames[i].name = data[lowAppID].data.name
      detailedGamesJSON.lowGames[i].image = data[lowAppID].data.header_image
      detailedGamesJSON.lowGames[i].description = data[lowAppID].data.short_description
      detailedGamesJSON.lowGames[i].date = data[lowAppID].data.release_date.date
    } catch(err){
      console.error(err)
    }
  
    let ratioAppID = gamesJSON.ratios[i].id
    const ratioURL = `http://store.steampowered.com/api/appdetails?appids=${ratioAppID}&l=english`
    try {
      const responseRatio = await fetch(ratioURL)
      if(!responseRatio.ok){
        throw new Error(`HTTP error: ${responseRatio.status}`)
      }
      let dataRatio = await responseRatio.json()
      detailedGamesJSON.ratios[i].name = dataRatio[ratioAppID].data.name
      detailedGamesJSON.ratios[i].image = dataRatio[ratioAppID].data.header_image
      detailedGamesJSON.ratios[i].description = dataRatio[ratioAppID].data.short_description
      detailedGamesJSON.ratios[i].date = dataRatio[ratioAppID].data.release_date.date
    } catch(err) {
      console.error(err)
    }
  }
  return detailedGamesJSON
}
module.exports = {jsonFetchPositiveGameDetails, jsonFetchNegativeGameDetails}