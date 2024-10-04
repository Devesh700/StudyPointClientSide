// LogTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LogTable = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
const version = import.meta.env.VITE_VERSION;
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
        let token=JSON.parse(sessionStorage.getItem("user")).accessToken;
      try {
        const response = await axios.get(`${baseUrl}/${version}/logs`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        setLogs(response.data.data); // Assuming response.data is an array of logs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching logs: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {logs.map((log, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.method}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.url}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.ip}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.pid}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogTable;
