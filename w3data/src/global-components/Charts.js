import React from 'react';
import Plot from 'react-plotly.js';
import { useParams } from 'react-router-dom';
import '../styles/Loading.css';
import '../styles/charts.css'
import useExperimentalEffect from '../api-services/useExperimental_service';
const Charts = () => {
const { username } = useParams();
const { data, fieldNames, chartTypes, handleToggleChart } = useExperimentalEffect(username); 


  const renderCharts = () => {    
    if (!data || !Array.isArray(data) || data.length === 0 || !fieldNames || fieldNames.length === 0) {
      return <p>No data available.</p>;
    }  
    const xData = data.map((item) => item.Time);    
  
    // Render all fields in a single chart initially
    const allFieldsChartData = fieldNames.map((field) => {
      const fieldData = data.filter((item) => item.Field === field);
      const yData = fieldData.map((item) => item.Value);
  
      return {
        x: xData,
        y: yData,
       
        mode: 'lines',
        fill: 'tonexty',
        type: 'scatter',
        fillcolor: 'rgba(51, 88, 244, 0.15)',
        name: `<span style="color: ${'#3358f4'}">${field}</span>`,
        line: {
          color: '#3358f4', // Set line color to blue
          font:'120'
          
        },
        
        
        
      };
    });
  
    // Define layout for all charts
    const allFieldsLayout = {
      plot_bgcolor: '#27293d',
      paper_bgcolor: '#27293d',
     
         innerHeight:'50vh',
         
         marginLeft:10,
     
      xaxis: {
        gridcolor:'rgba(51, 88, 244, 0.3)',
        gridwidth: 0.2,
        title: {
          text: 'Time',
          font: {
            color: '#9a9a9a', // Set x-axis title color to red
          },
        },

        type: 'Time',
        
        tickfont: {
          color: '#9a9a9a', 
        },
      },
      yaxis: {
        showgrid: false,
        title: {
          font: {
            color: '#9a9a9a',
             // Set x-axis title color to red
          },
        },
        tickfont: {
          color: '#9a9a9a',
         
        },
        dtick: 50, // Set the gap between tick values on the y-axis, adjust as needed
        type: 'linear', // Set the y-axis type to linear
        overlaying: 'y', // Overlay the traces on the same y-axis
   
   
        
      },
  
      
      
    };
  
    // Render separate charts for each field
    const separateCharts = fieldNames.map((field) => {
      const fieldData = data.filter((item) => item.Field === field);
      const yData = fieldData.map((item) => item.Value);    
      const chartData = {
        x: xData,
        y: yData,
        type: chartTypes[field] || 'scatter',
        mode: 'lines',
        name:`<span style="color: ${'#3358f4'}">${field}</span>`,
        line: {
          color: '#3358f4', // Set line color to blue
        },
        text: yData.map((value) => value.toString()), // Set text to values (convert to string if not already)
        textposition: 'left', // Adjust the text position as needed
      };
      const layout = {
        plot_bgcolor: '#27293d',
        paper_bgcolor: '#27293d',
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
          gshowgrid: false,
          title: {
            text: 'Value',
            font: {
              color: '#9a9a9a', // Set x-axis title color to red
            },
          },          
          tickfont: {
            color: '#9a9a9a', // Set x-axis tick color to orange
          },
        },
        title: {
          text: field,
          font: {
            color: '#9a9a9a', // Set x-axis title color to red
            align: 'left',
          },
        },
      };  
      return (
        <div className='seperate_chart_section' key={field}>
          <Plot
            style={{  width: '100%'}}
            data={[chartData]}
            layout={layout}
          />
            <div className="toggel_button_seperate_chart">
            <button className="toggel_button_seperate_chart-btn1" onClick={() => handleToggleChart(field, 'bar')}>Bar</button>
            <button onClick={() => handleToggleChart(field, 'line')}>Line</button>            
          </div>
        </div>
      );
    });
    return (
      <div className='chart_bundle_view'>
        {/* Initial chart with all fields */}
        <div className='bundle_chart_section'>
       
          <h3>All Measurements</h3>
       
        
          <Plot style={{width: '95%',height:'500px',marginInline:'2.5%'}} data={allFieldsChartData} layout={allFieldsLayout} />
        </div>
  
        {/* Separate charts for each field */}
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent:'center'}}>
         
          {separateCharts}
        </div>
      </div>
    );
  };
  return (
    <div className='render_charts_main'>
      {renderCharts()}
    </div>
  );
};

export default Charts;