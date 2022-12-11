import './App.css';
import ShowGraph from './components/showGraph';
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
        const url = "https://steam-statistics.onrender.com/api";
        const resp = await fetch(url);
        const json = await resp.json();
        setTotalReviews(json);
      } catch(err) {
        console.error("Fetch Total Review error", err)
      }
    }

    //fetch the positive review
    const fetchPositiveDetails = async () => {
      try {
        const url = "https://steam-statistics.onrender.com/positiveGamesDetails";
        const response = await fetch(url);
        const content = await response.json();
        setPositiveDetials(content)
      } catch(err) {
        console.error("Fetch Positive Details error" + err);
      }
    }

    //fetch the negative 
    const fetchNegativeDetails = async() => {
      try {
        const url = "https://steam-statistics.onrender.com/api/negativeGamesDetails";
        const resp = await fetch(url);
        const json = await resp.json();
        setNegativeDetails(json);
      } catch(err) {
        console.error("Fetch negative details error", err)
      }
    }

    //fetch the positive ratio details
    const fetchPositiveRatioDetails = async() => {
      try {
        const url = "https://steam-statistics.onrender.com/api/ratioPositiveGamesDetails";
        const resp = await fetch(url);
        const json = await resp.json();
        setPositiveRatioDetails(json);
      }catch(err) {
        console.error("Fetch the positive ratio details", err)
      }
    }

    //fetch the negative ratio details
    const fetchNegativeRatioDetails = async() => {
      try {
        const url = "https://steam-statistics.onrender.com/api/ratioNegativeGamesDetails";
        const resp = await fetch(url);
        const json = await resp.json();
        setNegativeRatioDetails(json);
      }catch(err) {
        console.error("Fetch the positive ratio details", err)
      }
    }
    
    fetchTotalReviews();
    fetchNegativeDetails();
    fetchPositiveDetails();
    fetchPositiveRatioDetails();
    fetchNegativeRatioDetails();
  }, []);


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
      <h1 id = "title">Steam Statistics</h1>
      <ShowGraph data={totalReviews} ratioData={ratioDetails} getDataBack={changeData}></ShowGraph>
      <GameData details={gameDetails} ratioDetails={ratioDetails}
        isPositive={isPositiveGame}></GameData>
    </div>
  );
}

export default App;
