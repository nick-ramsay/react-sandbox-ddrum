import React from "react";
import keys from "./keys";
import { datadogRum } from "@datadog/browser-rum";
import { datadogLogs } from "@datadog/browser-logs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "../src/pages/Home/Home";

datadogRum.init({
  applicationId: keys.datadog.dd_app_id_rum,
  clientToken: keys.datadog.dd_client_token_rum,
  site: keys.datadog.dd_site,
  service: "rum-react-sandbox",
  env: "staging",
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sampleRate: 100,
  sessionReplaySampleRate: 100,
  //trackInteractions: true,
  trackUserInteractions:true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: "mask-user-input",
  allowedTracingUrls: [
    { match: "https://dummyjson.com", propagatorTypes: ["datadog"]}
  ],
  beforeSend: (event) => {
    // remove email from view url
    if (
      event.type === "action" &&
      event.action.target.name === "Clicked Custom Action Button Again"
    ) {
      event.context.id = "123XYZ";
      event.context.example_id = event.action.target.example_id
      console.log(event);
    }
    // console.log(event.action.target.name);
    //event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
  },
});

datadogRum.startSessionReplayRecording();

datadogLogs.init({
  clientToken: keys.datadog.dd_client_token_rum,
  site: keys.datadog.dd_site,
  forwardErrorsToLogs: true,
  sampleRate: 100,
  telemetrySampleRate: 100,
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
