import './App.css';
import ShowGraph from './components/ShowGraph';
import GameData from "./components/GameData"
import { useState } from 'react';

function App() {

  //Hold our detail data
  let jsonData = [{text:"s", desc:"wow", two:"damn"},
    {text:"w", desc:"woww", two:"damnw"}, {text:"i", desc:"wowww", two:"damnww"},
    {text:"l", desc:"wowwww", two:"damnwww"}]

  //Props we will send to GameData that contains the specific json info
  let [gameDetails, setGameDetails] = useState({})
  let [ratioDetails, setRatioDetails] = useState({})

  //Function used to update gameDetails
  function changeData(data, identifier){
    //debug
    console.log(data)
    //Init empty objects to hold specific game detail data
    let details = {}
    let ratioDetails = {}
    //These will copy the top-level jsons
    let topRated = {}
    let topRatedRatio = {}
    //Conditions will need to be added to query the correct datas
    //if(identifier === "positive"){

    //}
    //For each element in our chosen jsonDatas, pick the one that matches
    //the genre (replace .text with .Genre). jsonData will be replaced by vars above
    jsonData.forEach(element => {
      if(element.text === data.label){
        details = element
      }
    });
    //Another loop for the ratios
    // jsonRatioData.forEach(element => {
    //   if(element.text === data.label){
    //     details = element
    //   }
    // });
    
    setGameDetails(details)
    //setRatioDetails(ratioDetails)
  }
  
  return (
    <div className="App">
      <ShowGraph data={jsonData} getDataBack={changeData}></ShowGraph>
      <GameData object={gameDetails}></GameData>
    </div>
  );
}

export default App;
