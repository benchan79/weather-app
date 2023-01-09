import { useState } from "react";

import {FaSearch} from 'react-icons/fa';

const SearchBar = (props) => {
    const [searchInputs, setSearchInputs] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(searchInputs);
    }

    const handleChange = (event) => {
      event.preventDefault();
      setSearchInputs(event.target.value);
    };

    return (
        <div className='flex flex-row justify-center w-full'>
            <form 
                onSubmit={handleSubmit} 
                className='flex justify-between bg-white rounded-lg w-full' 
            >
                <input
                    onChange={handleChange}
                    className='font-light w-full shadow-xl bg-transparent h-full p-4 text-black'
                    name='location' type='text'
                    placeholder='Type a location here' 
                />
                <button onClick={handleSubmit} className='p-4'>
                    <FaSearch size={20} />
                </button>
            </form>
        </div>
    )
}

export default SearchBar;