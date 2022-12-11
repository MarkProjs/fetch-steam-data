import './App.css';
import ShowGraph from './components/ShowGraph';
import GameData from "./components/GameData"
import { useState, useEffect } from 'react';

function App() {
  const[totalReviews, setTotalReviews] = useState({});
  const[negativeDetails, setNegativeDetails] = useState([]);
  const[positiveDetails, setPositiveDetials] = useState([]);
  const[positiveRatioDetails, setPositiveRatioDetails] = useState([]);
  const[negativeRatioDetails, setNegativeRatioDetails] = useState([]);

  useEffect(() => {
    //fetch the TotalReviews
    const fetchTotalReviews = async() => {
      try {
        const url = "http://localhost:3001/api";
        const resp = await fetch(url);
        const json = await resp.json();
        setTotalReviews(json);
      } catch(err) {
        console.log("Fetch Total Review error", err)
      }
    }

    const fetchNegativeDetails = async() => {
      try {
        const url = "http://localhost:3001/api/negativeGamesDetails";
        const resp = await fetch(url);
        const json = await resp.json();
        setNegativeDetails(json);
      } catch(err) {
        console.error("Fetch negative details error", err)
      }
    }

    fetchTotalReviews();
    fetchNegativeDetails();
  }, []);
  // let totalReviews = {Action: {positiveReviews: 300, negativeReviews: 42}}
  //Hold our detail data
  // let negativeDetails = [{
  //   "Genre": "Action",
  //   "id": "730",
  //   "negativeReviews": 455735,
  //   "name": "Counter-Strike: Global Offensive",
  //   "image": "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg?t=1668125812",
  //   "description": "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).",
  //   "date": "21 Aug, 2012"
  // }]

  // let positiveDetails = [{
  //   "Genre": "Action",
  //   "id": "730",
  //   "positiveReviews": 3101146,
  //   "name": "Counter-Strike: Global Offensive",
  //   "image": "https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg?t=1668125812",
  //   "description": "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).",
  //   "date": "21 Aug, 2012"
  // }]

  // let positiveRatioDetails = [{
  //   "Genre": "Action",
  //   "id": "292050",
  //   "percentage": 100,
  //   "positiveReviews": 43,
  //   "name": "Valkyrie Hat (or \"Buy Us Coffee\") DLC for Secrets of Grindea",
  //   "image": "https://cdn.akamai.steamstatic.com/steam/apps/292050/header.jpg?t=1447361128",
  //   "description": "You get a totally sweet Valkyrie Hat for Secrets of Grindea, and we get a few bucks to get some well needed coffee for those long nights of coding and pixel artistry!",
  //   "date": "13 Jul, 2015"
  // }]

  // let negativeRatioDetails = [{
  //   "Genre": "Action",
  //   "id": "210490",
  //   "percentage": 100,
  //   "negativeReviews": 42,
  //   "name": "Fray: Reloaded Edition",
  //   "image": "https://cdn.akamai.steamstatic.com/steam/apps/210490/header.jpg?t=1447355658",
  //   "description": "Combining the strategy elements of turn-based games with the action of a shooter, this is a rare hybrid that offers an all new gameplay experience. Are you ready to enter the Fray?",
  //   "date": "19 Jun, 2012"
  // }]

  //Props we will send to GameData that contains the specific json info
  let [gameDetails, setGameDetails] = useState({})
  let [ratioDetails, setRatioDetails] = useState({})
  let [isPositiveGame, setIsPositiveGame] = useState(true)

  //Function used to update gameDetails
  function changeData(data, isPositive){
    //Initialize empty objects to hold future specific game detail data
    let details = {}
    let ratioDetails = {}
    //These will copy the top-level jsons
    let topRated = {}
    let topRatedRatio = {}

    //Depending on the isPositive value, copy the correct dataset
    if(isPositive){
      topRated = [...positiveDetails]
      topRatedRatio = [...positiveRatioDetails]
      setIsPositiveGame(true)
    } else {
      topRated = [...negativeDetails]
      topRatedRatio = [...negativeRatioDetails]
      setIsPositiveGame(false)
    }
    //For each element in our chosen jsonDatas, pick the one that matches
    topRated.forEach(element => {
      if(element.Genre === data.label){
        details = element
      }
    });
    //Another loop for the ratios
    topRatedRatio.forEach(element => {
      if(element.Genre === data.label){
        ratioDetails = element
      }
    });
    //Update these values
    setGameDetails(details)
    setRatioDetails(ratioDetails)
  }
  
  return (
    <div className="App">
      <ShowGraph data={totalReviews} ratioData={ratioDetails} getDataBack={changeData}></ShowGraph>
      <GameData details={gameDetails} ratioDetails={ratioDetails}
        isPositive={isPositiveGame}></GameData>
    </div>
  );
}

export default App;
