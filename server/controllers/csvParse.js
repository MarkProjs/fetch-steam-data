const csv = require("csvtojson")
const fs = require("fs")

//Parses a csv file into a JSON array
async function csvParse() {
  const filePath = "./data/game_genres_modified.csv" 
  if(fs.existsSync(filePath)) {
    console.log("file exists")
  } else {
    console.log("file doesn't exist")
  }
  const jsonArray = await csv().fromFile(filePath)
  return jsonArray
}

module.exports = csvParse