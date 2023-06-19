import React, { useState, useEffect } from 'react';
import Toolbar from './Toolbar';
import './table.css'

function PageWithTable() {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    // Fetch data from the database or an API endpoint
    // Update the setData state with the fetched data
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://testbucket1senior-design.s3.amazonaws.com/potholeData.json');
      const textData = await response.json();
      try {
        const potholeData = JSON.parse(textData);
        console.log(potholeData);
      } catch (err) {
        console.error('Error parsing JSON:', err);
      }
    //   setData(data);
    setData(textData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <Toolbar />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Location</th>
              <th>Size</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>lat: {item.coordinates.lat}, long: {item.coordinates.long}</td>
              <td>{item.size}</td>
              <td>{item.date}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PageWithTable;
