import React from 'react';
import Searchicon from '../img/search.png'
import './styles.scss'
const SearchInput = ({ onSearch }: { onSearch: (text: string) => void }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        onSearch(text);
    };
    return (
        <div className="search-input-container">
            <input
                type="text"
                className="search-input"
                placeholder="Pesquisar notas"
                onChange={handleInputChange}
            />
            <img src={Searchicon} alt="Lupa" className="search-icon" draggable='false' />
        </div>
    );
};

export default SearchInput;