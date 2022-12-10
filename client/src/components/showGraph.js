import Plot from 'react-plotly.js';

function ShowGraph(props){

  //Set the titles
  let genres = []

  let positiveReviews = []
  let negativeReviews = []
  let positiveBarData = { data: [{ x: genres, y: positiveReviews, type: 'bar'}]}
  let negativeBarData = { data: [{ x: genres, y: negativeReviews, type: 'bar'}]}

  for(const [key, value] of Object.entries(props.data)){
    genres.push(key)
    positiveReviews.push(value.positiveReviews)
    negativeReviews.push(value.negativeReviews)
  }

  let globalHeight = 350
  let globalWidth = 1100

  return (
    <>
      <div id = "plots">
        <Plot
          data={positiveBarData.data}
          onClick={(e) => props.getDataBack(e.points[0], true)} 
          layout={{title: "sus", margin: {b: 15, r: 0, l: 40, t:40}, height: globalHeight,
            width: globalWidth}}
        />
        <Plot
          data={negativeBarData.data}
          onClick={(e) => props.getDataBack(e.points[0], false)}
          layout={{ yaxis: { autorange: 'reversed'},
            xaxis: { visible: false }, margin: {t: 0, r: 0, l: 40, b:40}, height: 350,
            width: globalWidth}} />
      </div>
    </>
  );
}

export default ShowGraph;