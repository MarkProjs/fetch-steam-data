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
    <div id = "plots">
      <Plot
        data={barData.data}
        onClick={(e) => props.getDataBack(e.points[0], props.isPositive)} 
        layout={{title: "sus"}}
        />
        <Plot
          data={[
            {
              y: [1, 4, 9, 16],
              type: 'bar',
            },
          ]}
          // eslint-disable-next-line max-len
          layout={{ yaxis: { autorange: 'reversed'}, barmode: 'relative', margin: {t: 0}  }} />
      </div>
    </>
  );
}

export default ShowGraph;