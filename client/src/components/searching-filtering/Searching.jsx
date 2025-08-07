
import React, { useState } from 'react';
import { Data } from './Data';

const Page = () => {
  const [store] = useState(Data);
  const [data, setData] = useState('');

  const getData = (e) => {
    console.log(e.target.value);
    setData(e.target.value);
  };

  // Optional: Filter the data based on search input
  const filteredStore = store.filter((item) =>
    item.name.toLowerCase().includes(data.toLowerCase())
  );

  return (
    <div className='container'>
      <h1>This is login components</h1>
      <input
        type='text'
        placeholder='Search here...'
        onChange={getData}
      />

      <div className='type'>
        <h3>Name</h3>
        <h3>Brand</h3>
        <h3>Images</h3>
      </div>

      {/* map method creates a new array to iterate the value of array */}
      {filteredStore.map((cur, index) => (
        <div className='itemlist' key={index}>
          <p>{cur.name}</p>
          <p>{cur.brand}</p>
          <img src={cur.img} alt={cur.name} />
        </div>
      ))}
    </div>
  );
};

export default Searching;
