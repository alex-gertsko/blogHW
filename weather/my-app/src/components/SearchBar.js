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
//  const [searchInput, setSearchInput] = useState("");

// const handleChange = (e) => {
//   e.preventDefault();
//   setSearchInput(e.target.value);
// };

// if (searchInput.length > 0) {
//     countries.filter((country) => {
//     return country.name.match(searchInput);
// });
// }

return <div>

<input
   type="search"
   placeholder="insert city name"
   onSubmit={onSearch}
//    onChange={handleChange}
//    value={"write city name"} 
   />
</div>


};

export default SearchBar;