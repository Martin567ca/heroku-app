import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import 'leaflet/dist/leaflet.css';

// Our ReactDOM rendering file - > where we combine all react components
// in our case its only one - > App

ReactDOM.render(<App />, document.getElementById('root'))