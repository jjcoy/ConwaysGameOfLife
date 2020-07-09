// front_end/src/App.js

// standard imports
import React from 'react'; // the main React library
import { RecoilRoot } from 'recoil'; // Recoil is a state management library

// import components, assets, and css files
import Home from './components/Home';
import logo from './logo.svg';
import './App.css';

// bring in other components needed
// TODO:  import the gameboard component and the controls component

// this is the App component that wraps everything else, and is rendered inside index.js
const App = () => {
  // return the html we want to render on the page
  return (
    <RecoilRoot>
      {/* We only need one RecoilRoot per application */}
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <Home />
          </p>
        </header>
      </div>
    </RecoilRoot>
  );
};

// make it so we can import this into the index.js file
export default App;
