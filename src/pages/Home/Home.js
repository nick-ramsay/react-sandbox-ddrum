import React, { useState, useEffect } from "react";
import { datadogRum } from "@datadog/browser-rum";
import { datadogLogs } from "@datadog/browser-logs";
import { } from "../../sharedFunctions/sharedFunctions";
import logo from "../../../src/logo.svg";
import GithubLogo from "../../images/github_logos/GitHub_Logo_White.png";
import "./style.css";

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Home = () => {
  var [messages, setMessages] = useState([]);

  const renderMessages = () => {
    let currentMessages = localStorage.getItem("messages");
    if (currentMessages !== null) {
      setMessages((messages) => JSON.parse(currentMessages));
    }
  };

  const saveMessage = (event) => {
    let tempMessages = messages;
    let newMessage = document.getElementById("messageInput").value;
    if (newMessage !== "") {
      tempMessages.unshift({
        date: Date(),
        message: newMessage,
      });
      localStorage.setItem("messages", JSON.stringify(tempMessages));
      document.getElementById("messageInput").value = "";
      renderMessages();
    }
  };

  const deleteMessage = (event) => {
    let messageDeletionID = event.currentTarget.dataset.message_id;
    let currentMessages = messages;
    currentMessages.splice(messageDeletionID, 1);
    localStorage.setItem("messages", JSON.stringify(currentMessages));
    renderMessages();
  };
  ////////////////////////////////////////
  //START: Datadog RUM Functions

  const triggerRuntimeError = () => {
    const obj = {};
    const a = obj.name.surname;
    console.log(a) // ⬅️ - Just to get rid of warning about "a" not being used
  }

  const generateManualRumError = () => {
      datadogRum.addError("My error message goes here", {
        session_id: datadogRum.getInternalContext().session_id,
        name: "This was my manually triggered error"
      });
  }

  const generateBrowserLogs = () => {
    datadogLogs.logger.info(
      "User clicked 'Generate Browser Log' button - INFO level",
      { custom_timestamp: new Date() }
    );
    datadogLogs.logger.warn(
      "User clicked 'Generate Browser Log' button - WARN level",
      { custom_timestamp: new Date() }
    );
    datadogLogs.logger.error(
      "User clicked 'Generate Browser Log' button - ERROR level",
      { custom_timestamp: new Date() }
    );
    datadogLogs.logger.debug(
      "User clicked 'Generate Browser Log' button - DEBUG level",
      { custom_timestamp: new Date() }
    );
  }

  const fetchDummyJson = () => {
    fetch('https://dummyjson.com/products/1')
      .then(res => res.json())
      .then(json => console.log(json))
  }

  const applyGlobalContextAttribute = () => {
    let item_1 = String(Math.round(Math.random() * 100000));
    let item_2 = String(Math.round(Math.random() * 100000));
    let item_3 = String(Math.round(Math.random() * 100000));

    datadogRum.setGlobalContextProperty("my_custom_attribute.message", "Congrats! You applied a global context attribute...");
    datadogRum.setGlobalContextProperty("tag_string", item_1);
    datadogRum.setGlobalContextProperty("tag_array", [item_1, item_2, item_3]);
  }

  const applyUser = () => {
    datadogRum.setUser({
      id: '1234',
      name: 'John Doe',
      email: 'john@doe.com',
      plan: 'premium'
    })
  }
//END: Datadog RUM Functions
///////////////////////////////////////////
  
  const saveNewMessageEnterKey = () => {
    var input = document.getElementById("messageInput");
    var saveBtn = document.getElementById("submitNewMessageBtn");

    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submitNewMessageBtn").click();
        input.focus();
      }
    });

    saveBtn.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("submitNewMessageBtn").click();
        input.focus();
      }
    });
  }

  useEffect(() => {
    renderMessages();
    applyUser()
  }, []);

  return (
    <div>
      <div className="App">
        <header className="App-header p-4">
          <h1>
            React Sandbox for Datadog RUM
          </h1>
          <h4><code>Home Page</code></h4>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/pages/Home/Home.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div className="container">
          <div className="col-md-12">
            <form className="mt-3">
              <div className="form-row text-center">
                <div className="col">
                  <input
                    type="text"
                    placeholder="Enter your message here"
                    className="form-control"
                    id="messageInput"
                    name="messageInput"
                    aria-describedby="messageHelp"
                    onKeyUp={saveNewMessageEnterKey}
                  />
                </div>
              </div>
              <div className="form-row text-center">
                <div className="col mt-3">
                  <div
                    type="button"
                    id="submitNewMessageBtn"
                    className="btn btn-sm btn-custom"
                    tabIndex="0"
                    onClick={saveMessage}
                    onKeyUp={saveNewMessageEnterKey}
                    data-dd-action-name="Clicked Custom Action Button Again"
                  >
                    Submit
                  </div>
                </div>
              </div>
            </form>
            <hr></hr>
            <h5>Message List</h5>
            <p style={{ color: "#e83e8c" }} className=" mb-1">
              {messages.length === 0
                ? "No Messages"
                : messages.length +
                (messages.length > 1 ? " messages" : " message")}
            </p>
            {messages.map((message, i) => (
              <div className="col-md-12 mt-2 mb-2 message-card" key={i}>
                <div className="pt-1">
                  <div style={{ fontStyle: "italic" }} className="mt-1 mb-1">
                    "{message.message}"
                  </div>
                  <div style={{ color: "#61dafb" }} className="mb-2">
                    {weekday[new Date(message.date).getDay()] +
                      ", " +
                      new Date(message.date).getDate() +
                      " " +
                      month[new Date(message.date).getMonth()] +
                      " " +
                      new Date(message.date).getFullYear() +
                      " " +
                      (new Date(message.date).getHours() < 13
                        ? new Date(message.date).getHours()
                        : new Date(message.date).getHours() - 12) +
                      ":" +
                      (new Date(message.date).getMinutes() > 9
                        ? new Date(message.date).getMinutes()
                        : "0" + new Date(message.date).getMinutes()) +
                      " " +
                      (new Date(message.date).getHours() > 11 ? "PM" : "AM")}
                  </div>
                  <div
                    className="btn btn-sm btn-custom-red mb-1 mt-1"
                    data-message_id={i}
                    onClick={deleteMessage}
                  >
                    Delete
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr></hr>
          <h5>Visit New View</h5>
          <div className="col-md-12 pt-3 pb-3">
            <button className="btn btn-sm btn-outline-light" onClick={() => window.location.href = "./alternate"}>Go to Alternative View</button>
          </div>
          <hr></hr>
          <h5>Manually Trigger RUM Events</h5>
          <div className="col-md-12 pt-3 pb-3">
            <div className="row">
              <div className="col-md-3">
                <button
                  className="btn btn-sm btn-outline-danger m-2"
                  onClick={() => triggerRuntimeError()}
                >
                  Trigger Runtime Error
                </button>
              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-sm btn-outline-danger m-2"
                  onClick={() => generateManualRumError()}
                >
                  Generate Manual RUM Error Event
                </button>
              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-sm btn-outline-warning m-2"
                  onClick={() => generateBrowserLogs()}
                >
                  Generate Browser Logs
                </button>
              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-sm btn-outline-light m-2"
                  data-dd-action-name="Clicked Custom Action Button Again"
                  data-dd-action-example_id="123customid456"
                  onClick={() => {
                    console.log("Clicked custom action button!");
                  }}
                >
                  Custom Action Name
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <button className="btn btn-sm btn-outline-secondary m-2" onClick={() => fetchDummyJson()}>
                  Call DummyJSON
                </button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-sm btn-outline-primary m-2" onClick={() => applyGlobalContextAttribute()}>
                  Apply Global Context
                </button>
              </div>
            </div>
            <div className="row mt-4">
              <a
                href="https://github.com/nick-ramsay/react-sandbox-ddrum"
                target="_blank"
                rel="noopener noreferrer"
                title="Check out this repo on GitHub!"
                className="github-link"
              >
                <img className="github-logo" src={GithubLogo} alt="GitHub_logo" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
