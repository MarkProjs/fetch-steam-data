import React from 'react';
import Plot from 'react-plotly.js';

function ShowGraph(props){

  //Set the titles
  let newData = []

  let barData = { data: [{ x: newData, y: [1, 4, 9, 16], type: 'bar'}]}

  props.data.forEach(element => {
    newData.push(element.text)
  });

  return (
    <>
      <Plot
        data={barData.data}
        onClick={(e) => props.getDataBack(e.points[0], "positive")} />
    </>
  );
}

export default ShowGraph;