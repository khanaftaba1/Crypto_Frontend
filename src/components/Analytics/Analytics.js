import React, { useEffect, useRef, memo } from 'react';
import Box from '@mui/material/Box';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
// import './Analytics.css'; 

const TradingViewWidget = () => {
  const container = useRef();

  useEffect(() => {
    // Check if the script is already added to avoid duplicate scripts
    if (container.current && container.current.children.length === 0) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "ORCA:JLPSOL_4Z1A4W.USD",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "withdateranges": true,
          "range": "YTD",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "hotlist": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
    }
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Sidebar />
        <Box className="main-content" sx={{ p: 2, flexGrow: 1 }}>
          <Box 
            className="tradingview-widget-container" 
            ref={container} 
            style={{ height: "100%", width: "100%" }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default memo(TradingViewWidget);
