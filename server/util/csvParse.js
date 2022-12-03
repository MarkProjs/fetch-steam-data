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

//Squashes existing game ids together and adds additionnal Genres
function organizeJSONArray(jsonArray){
  const newJSONArray = []
  for(i = 0; i < jsonArray.length; i++){
    let exists = false
    let index = 0
    for(j = 0; j < newJSONArray.length; j++){
      if(newJSONArray[j].appid === jsonArray[i].appid){
        exists = true
        index = j
      }
    }
    
    //If it exists, append a new Genre to the existing item. If it doesn't, create the entry
    if(exists){
      newJSONArray[index].Genre.push(jsonArray[i].Genre)
    } else {
      newJSONArray.push({appid: jsonArray[i].appid, Genre: [jsonArray[i].Genre]})
    }
  }
  return newJSONArray
}

module.exports = {csvParse, organizeJSONArray}