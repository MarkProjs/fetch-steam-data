import Plot from 'react-plotly.js';

function ShowGraph(props){

  //Set the titles
  let genres = []

  let positiveReviews = []
  let negativeReviews = []
  //Re-organize the data so it can be inserted into the bar data
  for(const [key, value] of Object.entries(props.data)){
    genres.push(key)
    positiveReviews.push(value.positiveReviews)
    negativeReviews.push(value.negativeReviews)
  }
  //Bar data
  let positiveBarData = { data: [{ x: genres, y: positiveReviews, type: 'bar'}]}
  let negativeBarData = { data: [{ x: genres, y: negativeReviews, type: 'bar'}]}
  //height and width variables
  let globalHeight = 300
  let globalWidth = 1500

  return (
    <div id = "graph">
      <div id = "plots">
        <Plot
          data={positiveBarData.data}
          onClick={(e) => props.getDataBack(e.points[0], true)} 
          layout={{title: "Top positively and negatively reviewed Steam games sorted by Genre",
            margin: {b: 15, r: 0, l: 40, t:40}, height: globalHeight,
            width: globalWidth}}
        />
        <Plot
          data={negativeBarData.data}
          onClick={(e) => props.getDataBack(e.points[0], false)}
          layout={{ yaxis: { autorange: 'reversed'},
            xaxis: { visible: false }, margin: {t: 0, r: 0, l: 40, b:40}, height: globalHeight,
            width: globalWidth}} />
      </div>
    </div>
  );
}

export default ShowGraph;