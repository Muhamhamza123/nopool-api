// ChartComponent.js
import React from 'react';
import Plot from 'react-plotly.js';

const ChartComponent = ({ data, selectedFields, toggleView,showTable }) => {
    if (!data || !Array.isArray(data) || data.length === 0 || selectedFields.length === 0) {
      return <p>No data available.</p>;
    }
    const filteredData = data.filter((item) => selectedFields.includes(item.Field));
    const traceData = selectedFields.map((field) => {
      const fieldData = filteredData.filter((item) => item.Field === field);
      const xData = fieldData.map((item) => item.Time);
      const yData = fieldData.map((item) => item.Value);
      return {
        x: xData,
        y: yData,
        type: 'scatter',
        mode: 'lines+markers',
        name: field,
      };
    });
    const layout = {
      plot_bgcolor: '#27293d',
      paper_bgcolor: '#27293d',
      innerHeight:600,
      xaxis: {
        gridcolor:'rgba(51, 88, 244, 0.3)',
        gridwidth: 0.2,
        title: {
          text: 'Time',
          font: {
            color: '#9a9a9a', // Set x-axis title color to red
          },
        },
        type: 'date',
    
        tickfont: {
          color: '#9a9a9a', // Set x-axis tick color to orange
        },
      },
      yaxis: {
        showgrid: false,
        title: {
          text: 'Values',
          font: {
            color: '#9a9a9a', // Set x-axis title color to red
          },
         },
         tickfont: {
          color: '#9a9a9a', // Set x-axis tick color to orange
        },
      },     
    };

    return (
    <div style={{ }}>
       <button className='toggel_button' onClick={toggleView}>
        {showTable ? 'Show Graphs' : 'Show Table'}
      </button>     
    <Plot  style={{width: '100%'}} data={traceData} layout={layout} />
    </div>
 )};

export default ChartComponent;
