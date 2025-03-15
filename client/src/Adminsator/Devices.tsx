import React, { useEffect, useState } from 'react';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
interface Device {
  sessionId: string;
  ip: string;
  browser: string;
  os: string;
  device: string;
  loginAt: string;
}

interface DevicesProps {
  adminId: string;
}

const Devices: React.FC<DevicesProps> = ({ adminId } : any) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get(`${baseUrl}/devices/${adminId}`);
      
        setDevices(response.data.devices);
      } catch (error) {
        console.error("Error fetching devices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, [adminId]);

  if (loading) {
    return <div className="text-center text-xl text-blue-500">Loading devices...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md overflow-auto">
      <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-200 mb-4">Devices Information</h3>
      {devices.length === 0 ? (
        <p className="text-center text-lg text-gray-500 dark:text-gray-400">No devices found.</p>
      ) : (
        <table className="min-w-full table-auto bg-white overflow-auto dark:bg-gray-700 border  border-gray-200 dark:border-gray-600 rounded-lg">
          <thead className="bg-gray-200 dark:bg-gray-600">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Device</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">OS</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Browser</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">IP Address</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">Login Time</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-4 py-2 border-b text-sm text-gray-700 dark:text-gray-300">{device.device === 'Other' ? 'Desktop' : device.device}</td>
                <td className="px-4 py-2 border-b text-sm text-gray-700 dark:text-gray-300">{device.os}</td>
                <td className="px-4 py-2 border-b text-sm text-gray-700 dark:text-gray-300">{device.browser}</td>

                <td className="px-4 py-2 border-b text-sm text-gray-700 dark:text-gray-300">{device.ip}</td>
                <td className="px-4 py-2 border-b text-sm text-gray-700 dark:text-gray-300">{new Date(device.loginAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Devices;
