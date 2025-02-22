// front_end/src/App.js

// standard imports
import React from 'react'; // the main React library
import { RecoilRoot } from 'recoil'; // Recoil is a state management library

// import components, assets, and css files
import Home from './components/Home';
import './App.css';

// this is the App component that wraps everything else, and is rendered inside index.js
const App = () => {
  // return the html we want to render on the page
  return (
    <RecoilRoot>
      {/* We only need one RecoilRoot per application */}
      <div className="App">
        <Home />
      </div>
    </RecoilRoot>
  );
};

// make it so we can import this into the index.js file
export default App;
