import {useState} from 'react';

function GameData(props){

  return(
    <div>
      <h1>title: {props.object.text}</h1>
      <p>desc: {props.object.desc}</p>
      <p>two: {props.object.two} </p>
    </div>
  )
}

export default GameData