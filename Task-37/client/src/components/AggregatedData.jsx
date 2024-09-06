import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SERVER_URL from '../server_url'

const AggregatedData = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAggregatedData = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/aggregate`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchAggregatedData();
  }, [props.addToDB]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Aggregated Data</h2>
      <div className="mb-4">
        <h3 className="font-bold">Group by Category:</h3>
        {data.groupByCategory.map(item => (
          <p key={item._id}>{item._id}: {item.count}</p>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="font-bold">Average Value:</h3>
        <p>{data.averageValue[0]?.averageValue || 0}</p>
      </div>
      <div>
        <h3 className="font-bold">Sorted Data:</h3>
        {data.sortedData.map(item => (
          <p key={item._id}>{item.name} - {item.value}</p>
        ))}
      </div>
    </div>
  );

}
export default AggregatedData;

