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
      // Perform an API request to fetch the data
      const response = await fetch('your-api-endpoint');
      const data = await response.json();
      setData(data);
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
                <td>{item.location}</td>
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
