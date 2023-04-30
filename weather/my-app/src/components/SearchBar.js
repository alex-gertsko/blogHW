import React from 'react'
import axios from 'axios'
import { token } from '../settings';

const SearchBar = function(props){
    const {url} = props
    const params = {'units': 'metric', 'appid': token}
    const onSearch = async (cityName) => {
        params.q = cityName
        const res = await axios.get(url, {params:params})
        console.log(res)
    }

return (
<div>
    <input
    type="search"
    placeholder="insert city name"
    onSubmit={onSearch}
    />
</div>)
}

export default SearchBar;