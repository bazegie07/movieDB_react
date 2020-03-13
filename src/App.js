import React, { useState } from 'react';
import axios from 'axios';

import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup';


function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  //storing our api into a variable for  better practice
  const apiurl ="http://www.omdbapi.com/?apikey=dac02b4d";

  const search = (e) => {
    if(e.key === "Enter"){
      //&s= stanse for search
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        console.log(data);
        let results = data.Search;
        
        setState(prevState => {
          return { ...prevState, results: results }
        })
      });
    }
  }
  
  //this will be the value of our input that will store in ou
  // useState "s"
  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return {...prevState, s: s}
    });
    console.log(state.s);
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      // console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  return (
    <div className="App">
      <header>
      <h1>Movie Database</h1>
      </header>
      <main>
          <Search handleInput={handleInput} search={search}/>
          <Results results={state.results} openPopup={openPopup} />
          {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App;
