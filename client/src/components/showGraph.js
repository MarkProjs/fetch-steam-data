import React from 'react';
import Plot from 'react-plotly.js';

function ShowGraph(){
  return (
    <>
      <div id = "plots">
        <Plot
          data={[
            {
              x: ['RPG', 'Shooter', 'Sports', 'Adventure'],
              y: [1, 4, 9, 16],
              type: 'bar',
            },
          ]}
          // eslint-disable-next-line max-len
          layout={{ barmode: 'relative', title: 'Steam Graph', margin: {b: 15}}} />
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