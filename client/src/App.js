import './App.css';
import ShowGraph from './components/ShowGraph';
import GameData from "./components/GameData"
import { useState } from 'react';

function App() {

  let jsonData = [{text:"s", desc:"wow", two:"damn"},
    {text:"w", desc:"woww", two:"damnw"}, {text:"i", desc:"wowww", two:"damnww"},
    {text:"l", desc:"wowwww", two:"damnwww"}]

  let [leObject, setLeObject] = useState({})

  function changeData(data){
    console.log(data)
    let details = {}
    jsonData.forEach(element => {
      if(element.text === data.label){
        details = element
      }
    });
    setLeObject(details)
  }
  
  return (
    <div className="App">
      <ShowGraph data={jsonData} getDataBack={changeData}></ShowGraph>
      <GameData object={leObject}></GameData>
    </div>
  );
}

export default App;
