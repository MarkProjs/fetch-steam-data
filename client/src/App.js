import './App.css';
import ShowGraph from './components/ShowGraph';
import GameData from "./components/GameData"
import { useState } from 'react';

function App() {

  let totalReviews = {Action: {positiveReviews: 300, negativeReviews: 42}}
  //Hold our detail data
  let negativeDetails = [{
    "Genre": "Action",
    "id": "730",
    "negativeReviews": 455735,
    "name": "Counter-Strike: Global Offensive",
    "image": "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg?t=1668125812",
    "description": "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).",
    "date": "21 Aug, 2012"
  }]

  let positiveDetails = [{
    
  }]

  //Props we will send to GameData that contains the specific json info
  let [gameDetails, setGameDetails] = useState({})
  let [ratioDetails, setRatioDetails] = useState({})
  let [isPositiveGame, setIsPositiveGame] = useState(true)

  //Function used to update gameDetails
  function changeData(data, isPositive){
    //Init empty objects to hold future specific game detail data
    let details = {}
    let ratioDetails = {}
    //These will copy the top-level jsons
    let topRated = {}
    let topRatedRatio = {}
    //Depending on the isPositive value, copy the correct dataset
    //if(identifier === "positive"){
    topRated = {}
    topRatedRatio = {}
    //setIsPositiveGame(true)
    //} else {
    topRated = [...negativeDetails]
    topRatedRatio = {}
    setIsPositiveGame(false)
    //}
    //For each element in our chosen jsonDatas, pick the one that matches
    topRated.forEach(element => {
      if(element.Genre === data.label){
        details = element
      }
    });
    //Another loop for the ratios
    // jsonRatioData.forEach(element => {
    //   if(element.Genre === data.label){
    //     ratioDetails = element
    //   }
    // });
    
    setGameDetails(details)
    //setRatioDetails(ratioDetails)
  }
  
  return (
    <div className="App">
      <ShowGraph data={totalReviews} getDataBack={changeData} isPositive={false}></ShowGraph>
      <GameData details={gameDetails} isPositive={isPositiveGame}></GameData>
    </div>
  );
}

export default App;
