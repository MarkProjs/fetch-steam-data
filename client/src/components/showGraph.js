import React from 'react';
import Plot from 'react-plotly.js';

function ShowGraph(){
        return (
            <Plot
                data = {[
                    {type: 'bar', x:[1,2,3], y:[2,5,3], marker: {color: 'green'}},
                ]}
                layout = { {width: 600, height: 600, title: 'Steam graph'} }
            />
        );
}

export default ShowGraph;