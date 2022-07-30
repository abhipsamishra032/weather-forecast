import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoAPIOptions, GEO_API_URL } from '../../api.js';

const Search = ({onSearchChange}) => {
    const [search, setSearch] = useState(null);

    const loadOptions = (input) => {
        return fetch(`${GEO_API_URL}cities?minPopulation=1000000&namePrefix=${input}`, geoAPIOptions)
        .then(response => response.json())
        .then(response => {
            console.log("city response => ", response)
            return {
                options: response.data.map(city => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name} ${city.countryCode}`,
                    }
                })
            }
        })
        .catch(err => console.error(err));
    }
    
    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData)
    }
    return (
        <AsyncPaginate 
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;