import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { DataGrid } from '@mui/x-data-grid';

const TopGainer = () => {
  const { base_address } = useParams(); // Get base_address from the URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [base_address]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/holder_dex_data/${base_address}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="top-gainer-buffering-screen">
        <div className="top-gainer-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Define columns for the Holders Data table
  const holdersColumns = [
    { field: 'owner', headerName: 'Owner', width: 300 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'uiAmount', headerName: 'UI Amount', width: 250 },
  ];

  // Format holdersData for the table
  const holdersRows = data?.holders_data?.map((holder, index) => ({
    id: index + 1,
    owner: holder.owner,
    state: holder.state,
    uiAmount: holder.uiAmount,
  })) || [];

  return (
    <Box className="top-gainer-container">
      <Navbar />
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Sidebar />
        <Box className="top-gainer-main-content">
          <Box className="top-gainer-header">
            {/* Optional header content */}
          </Box>
          <Box className="top-gainer-table" sx={{ height: 500, width: '100%' }}>
            <h2>Holders Data</h2>
            <DataGrid
              rows={holdersRows}
              columns={holdersColumns}
              pageSize={10}
              sx={{
                '& .MuiDataGrid-cell': {
                  color: '#fff',
                },
                '& .MuiDataGrid-columnHeader': {
                  color: '#fff',
                },
                '& .MuiDataGrid-footerContainer': {
                  color: '#fff',
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TopGainer;
