import React from "react";
import keys from "./keys";
import { datadogRum } from "@datadog/browser-rum";
import { datadogLogs } from "@datadog/browser-logs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "../src/pages/Home/Home";
import Alternate from "../src/pages/Alternate/Alternate";

datadogRum.init({
  applicationId: keys.datadog.dd_app_id_rum,
  clientToken: keys.datadog.dd_client_token_rum,
  site: keys.datadog.dd_site,
  service: "react-sandbox-ddrum",
  env: "staging",
  version: keys.datadog.dd_version,
  sampleSampleRate: 100,
  sessionReplaySampleRate: 100,
  trackUserInteractions: true,
  startSessionReplayRecordingManually: false,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
  allowedTracingUrls: ["https://dummyjson.com"],
  beforeSend: (event, context) => {
    if (event.type === 'action' && event.action.target.name === "Apply Global Context") {
      event.context.beforeSendContextAttribute = "This attribute was applied by beforeSend when clicking the 'Apply Global Context' button."
    }
  },
});

datadogLogs.init({
  clientToken: keys.datadog.dd_client_token_rum,
  site: keys.datadog.dd_site,
  forwardErrorsToLogs: true,
  forwardConsoleLogs: "all",
  sessionSampleRate: 100,
  telemetrySampleRate: 100,
});

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/alternate" element={<Alternate />} />
      </Routes>
    </Router>
  );
}

export default App;