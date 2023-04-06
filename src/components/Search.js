import React from "react";

function Search({ plantSearch, setPlantSearch }) {
  return (
    <div className="ui search">
      <div className="ui icon input">
        <input 
          onChange={(e) => setPlantSearch(e.target.value)}
          value={plantSearch}
          className="prompt" />
        <i className="search icon" />
      </div>
    </div>
  );
}

export default Search;
