import React from 'react';
import Plot from 'react-plotly.js';

function ShowGraph(){
  return (
    <><Plot
      data={[
        {
          x: ['RPG', 'Shooter', 'Sports', 'Adventure'],
          y: [1, 4, 9, 16],
          type: 'bar',
        },
      ]} /></>
  );
}

export default ShowGraph;