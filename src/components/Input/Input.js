import React, { useState, useEffect } from 'react';
import "./Input.css"
import { Link } from 'react-router-dom';
import { Spinner } from '../Spinner/Spinner';
import { toast } from 'react-toastify';


export const Input = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    
  
    const apiKey = 'AIzaSyBxs1i5opkZoRDBvfC9J9uABPbeXkuVD5E'; // Replace with your Google Books API key
  
    // Debouncing logic with useEffect
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        if (query.length > 2) {
          fetchBookSuggestions(query);
        }
      }, 300); // Wait 300ms before sending the request
  
      return () => clearTimeout(delayDebounceFn); // Cleanup to prevent overlapping requests
    }, [query]);
  
    const fetchBookSuggestions = async (searchTerm) => {
      setLoading(true);
      setError(null);  
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(searchTerm)}&key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSuggestions( data.items.filter((item, index, self) =>
        index === self.findIndex((t) => t.volumeInfo.title === item.volumeInfo.title)
      )|| []);
      } catch (error) {
        setError('Error fetching book suggestions');
        console.error(error);

        toast.error("unable to get search result", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          })
      

      }
  
      setLoading(false);
    };
  
    const handleInputChange = (event) => {
      setSuggestions([]);
      setQuery(event.target.value);
    };
  
    return (
      <div className='search'>
        <div className='SearchHead'>Autocomplete Book Search</div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Type a book name"
        />
        {/* {loading && <p>Loading...</p>} */}
        {/* {error && <p>{error}</p>} */}
        {suggestions.length!=0?<div className={`search-container ${suggestions.length > 0 ? 'visible' : ''}`}>
          {suggestions.map((item) => (
            <Link to={{ pathname:`/book`,search:`?bookname=${encodeURIComponent(item.volumeInfo.title)}`}} className='search-item' key={item.id}>
            {item.volumeInfo.title}
            </Link>
          ))}
        </div>:null}

        {loading==true?<div><Spinner loading={loading}/></div>:null}
        {suggestions.length==0 && query.length>2 &&loading==false ?<div className='no-search-result'>No result Found</div>:null}
        {query.length<=2?<div className='no-search-result'>Search Something</div>:null}

      </div>
    );
}

