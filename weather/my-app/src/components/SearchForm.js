import React from "react"
import SearchBar from "./SearchBar.js"

function SearchForm(props) {
    return (
      // <form>
      <div >
        <label>Enter your name:
        <SearchBar></SearchBar>
          <input type="button" />
        </label>
      </div>
      // </form>
    )
}

export default SearchForm