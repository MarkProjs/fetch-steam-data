const fetch = require("node-fetch")

//Should get # of positive and negative reviews
async function jsonFetch(number){
  let jsonObject = {data:[]}
  //Big loop (change 10 to 200 eventually)
  for(i = number; i < number + 10; i++){
    //Get id from csv
    //query id with the interface that gets reviews
    const url = ""
    //fetch
    try{
      const response = await fetch(url)
      if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`)
      }
      const data = await response.json() 
      const cleanedData = {id: data.id, positiveReviews: data.positive_reviews,
        negativeReviews: data.negative_reviews}
      //Add data to big json object
      jsonObject.data.push(cleanedData)
    } catch (err) {
      console.error(err)
    }
  }
  return jsonObject
}

module.exports(jsonFetch)