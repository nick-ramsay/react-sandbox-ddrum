import React, { } from 'react';
import keys from "./keys";
import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Home from "../src/pages/Home/Home";

datadogRum.init({
    applicationId: keys.datadog.dd_app_id_rum,
    clientToken: keys.datadog.dd_client_token_rum,
    site: keys.datadog.dd_site,
    service:'rum-react-sandbox',
    
    // Specify a version number to identify the deployed version of your application in Datadog 
    // version: '1.0.0',
    sampleRate: 100,
    sessionReplaySampleRate: 100,
    trackInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel:'mask-user-input'
});
    
datadogRum.startSessionReplayRecording();

datadogLogs.init({
  clientToken: keys.datadog.dd_client_token_rum,
  site: keys.datadog.dd_site,
  forwardErrorsToLogs: true,
  sampleRate: 100,
});

function App() {
  return (
    <Router>
      <Routes>  
          <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
