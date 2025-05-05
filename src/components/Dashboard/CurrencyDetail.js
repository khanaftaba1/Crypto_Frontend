import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { DataGrid } from '@mui/x-data-grid';
import './CurrencyDetail.css';

const CurrencyDetail = () => {
  const { base_address } = useParams(); // Get base_address from the URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [predictedClosePrice, setPredictedClosePrice] = useState(null);

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
      const pairAddress = response.data?.dex_data?.pairAddress;
      if (pairAddress) {
        fetchPredictedClosePrice(pairAddress);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPredictedClosePrice = async (pairAddress) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/closing_predict/${pairAddress}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setPredictedClosePrice(response.data.predicted_close);
      console.log('Predicted Close Price:', response.data.predicted_close);
    } catch (error) {
      console.error('Error fetching predicted close price:', error);
    }
  };


  if (loading) {
    return (
      <div className="buffering-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Custom cell renderer to color the text based on value
  const renderCell = (params) => {
    const value = params.value;
    let color = '#fff'; // Default color
    if (typeof value === 'number') {
      color = value < 0 ? 'red' : 'green';
    }
    return (
      <div style={{ color }}>
        {value}
      </div>
    );
  };

  // Ensure data and its nested properties are defined before rendering
  const dexData = data?.dex_data || {};
  const baseToken = dexData.baseToken || {};
  const liquidity = dexData.liquidity || {};
  const priceChange = dexData.priceChange || {};
  const quoteToken = dexData.quoteToken || {};
  const txns = dexData.txns || {};
  const volume = dexData.volume || {};
  // const pairAddress = dexData.pairAddress || {};

  // Dynamically generate columns for Dex Data
  const dexColumns = [
    { field: 'key', headerName: 'Key', width: 250 },
    { 
      field: 'value', 
      headerName: 'Value', 
      width: 400,
      renderCell: renderCell, // Apply custom renderer
    },
  ];

  const dexRows = [
    { id: 1, key: 'Base Token Address', value: baseToken.address || 'N/A' },
    { id: 2, key: 'Base Token Name', value: baseToken.name || 'N/A' },
    { id: 3, key: 'Base Token Symbol', value: baseToken.symbol || 'N/A' },
    { id: 4, key: 'FDV', value: dexData.fdv || 'N/A' },
    { id: 5, key: 'Liquidity (Base)', value: liquidity.base || 'N/A' },
    { id: 6, key: 'Liquidity (Quote)', value: liquidity.quote || 'N/A' },
    { id: 7, key: 'Liquidity (USD)', value: liquidity.usd || 'N/A' },
    { id: 8, key: 'Price Change (1h)', value: priceChange.h1 || 'N/A' },
    { id: 9, key: 'Price Change (24h)', value: priceChange.h24 || 'N/A' },
    { id: 10, key: 'Price Change (6h)', value: priceChange.h6 || 'N/A' },
    { id: 11, key: 'Price Change (5m)', value: priceChange.m5 || 'N/A' },
    { id: 12, key: 'Price USD', value: dexData.priceUsd || 'N/A' },
    { id: 13, key: 'Quote Token Address', value: quoteToken.address || 'N/A' },
    { id: 14, key: 'Quote Token Name', value: quoteToken.name || 'N/A' },
    { id: 15, key: 'Quote Token Symbol', value: quoteToken.symbol || 'N/A' },
    { id: 16, key: 'Volume (1h)', value: volume.h1 || 'N/A' },
    { id: 17, key: 'Volume (24h)', value: volume.h24 || 'N/A' },
    { id: 18, key: 'Volume (6h)', value: volume.h6 || 'N/A' },
    { id: 19, key: 'Volume (5m)', value: volume.m5 || 'N/A' },
    { id: 20, key: 'Buys (1h)', value: txns.h1?.buys || 'N/A' },
    { id: 21, key: 'Sells (1h)', value: txns.h1?.sells || 'N/A' },
    { id: 22, key: 'Buys (24h)', value: txns.h24?.buys || 'N/A' },
    { id: 23, key: 'Sells (24h)', value: txns.h24?.sells || 'N/A' },
    { id: 24, key: 'Buys (6h)', value: txns.h6?.buys || 'N/A' },
    { id: 25, key: 'Sells (6h)', value: txns.h6?.sells || 'N/A' },
    { id: 26, key: 'Buys (5m)', value: txns.m5?.buys || 'N/A' },
    { id: 27, key: 'Sells (5m)', value: txns.m5?.sells || 'N/A' },
  ];

  // Define columns for the Holders Data table
  const holdersColumns = [
    { field: 'owner', headerName: 'Owner', width: 300 },
    { field: 'state', headerName: 'State', width: 150 },
    { field: 'uiAmount', headerName: 'Amount', width: 250 },
  ];

  // Format holdersData for the table
  const holdersRows = data?.holders_data?.map((holder, index) => ({
    id: index + 1,
    owner: holder.owner,
    state: holder.state,
    uiAmount: holder.uiAmount,
  })) || [];

  return (
    <Box className="currency-detail-container" sx={{ display: 'flex', flexDirection: 'column'}}>
      <Navbar />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <Box className="main-content" sx={{ flex: 1, p: 5}}>
        <Box sx={{ height: '100%' }}>
         {/* Predicted Price Card */}
         <Card sx={{ 
            mb: 2, 
            bgcolor: '#2c3e50', 
            color: '#fff', 
            p: 2, 
            borderRadius: 2, 
            boxShadow: 3,
            textAlign: 'center',
            margintop: 20
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Predicted Price (1D)
              </Typography>
              <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
                {predictedClosePrice !== null ? `$${predictedClosePrice.toFixed(2)}` : 'Loading...'}
              </Typography>
            </CardContent>
          </Card>
          <Box className="currency-detail-table"  sx={{ height: 500, mb: 2, overflowY: 'hidden' }}>
            <h2>Token Data</h2>
            <DataGrid
              rows={dexRows}
              columns={dexColumns}
              // pageSize={4}
              hideFooter
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
          
          <Box className="currency-detail-table" sx={{ height: 500, overflowY: 'hidden' }} >
            <h2>Holders Data</h2>
            <DataGrid
              rows={holdersRows}
              columns={holdersColumns}
              // pageSize={5} 
              hideFooter
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
    </Box>
  );
};

export default CurrencyDetail;
