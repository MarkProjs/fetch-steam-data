import React from 'react';
import Plot from 'react-plotly.js';

function ShowGraph(props){

  //Set the titles
  let genres = []

  let reviews = []

  let barData = { data: [{ x: genres, y: reviews, type: 'bar'}]}

  for(const [key] of Object.entries(props.data)){
    genres.push(key)
  }

  for(const [key, value] of Object.entries(props.data)){
    if(props.isPositive){
      reviews.push(value.positiveReviews)
    } else {
      reviews.push(value.negativeReviews)
    }
  }

  return (
    <>
      <Plot
        data={barData.data}
        onClick={(e) => props.getDataBack(e.points[0], props.isPositive)} />
    </>
  );
}

export default ShowGraph;