import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getListings, clearListings } from '../../actions/listing';

const SearchBar = ({ getListings, clearListings }) => {
  const [formData, setFormData] = useState({
    query: '',
    category: 'All Categories'
  });

  let { query, category } = formData;
  let history = useHistory();

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    clearListings();
    let search = '';
    if (query) {
      search = '?search=' + query.split(' ').join('+');
    }
    if (category !== '' && category !== 'All Categories') {
      query === ''
        ? (search = '?category=' + category)
        : (search = search + '&category=' + category);
    }
    search === ''
      ? (search = `?limit=${10}&page=${1}`)
      : (search = search + `&limit=${10}&page=${1}`);

    history.push(`/listings${search}`);
    getListings(search);
  };

  return (
    <form onSubmit={e => onSubmit(e)}>
      <select onChange={e => onChange(e)} name='category' value={category}>
        <option value='All Categories'>All Categories</option>
        <option value='Dog'>Dog</option>
        <option value='Cat'>Cat</option>
      </select>
      <input
        type='text'
        placeholder='Enter a search'
        name='query'
        value={query}
        onChange={e => onChange(e)}
      />
      <input type='submit' className='btn btn-primary' value='Search' />
    </form>
  );
};

export default connect(null, { getListings, clearListings })(SearchBar);
