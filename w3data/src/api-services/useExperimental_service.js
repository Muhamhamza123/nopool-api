// useExperimentalEffect.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useExperimentalEffect = (username) => {
  const [data, setData] = useState([]);
  const [fieldNames, setFieldNames] = useState([]);
  const [chartTypes, setChartTypes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/influxdb-data-home/${username}`);
        setData(response.data.data_list);
        setFieldNames(response.data.field_names);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    if (fieldNames && fieldNames.length > 0) {
      const initialVisibility = {};
      fieldNames.forEach((fieldName) => {
        initialVisibility[fieldName] = true;
      });
  
      // Update the chartTypes state with the initialVisibility object
      setChartTypes(initialVisibility);
    }
  }, [fieldNames]);

  const handleToggleChart = (field, type) => {
    // Update the chart type for the specified field
    setChartTypes((prevTypes) => ({
      ...prevTypes,
      [field]: type,
    }));
  };

  return { data, fieldNames, chartTypes, handleToggleChart };
};

export default useExperimentalEffect;