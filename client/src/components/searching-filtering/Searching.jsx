import React, { useState } from "react";
import "../searching-filtering/Product.css";

function Searching() {
  const [query, setQuery] = useState("");
  const items = ["Computer", "Laptop", "Mobile", "Mouse", "Headphone"];

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="Searching">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Filtered List */}
      <ul className="list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <li key={index} className="listItem">
              {item}
            </li>
          ))
        ) : (
          <li className="listItem">No items found</li>
        )}
      </ul>
    </div>
  );
}

export default Searching;



// import "../searching-filtering/Product.css";
// function Searching(){
//     const[query,setQuery]=useState("");
//     const items = ['Computer', 'Laptop', 'Mobile', 'Mouse', 'Headphone'];
//     const filteredItems = items.filter(item =>
//     item.toLowerCase().includes(query.toLowerCase())
//   );
//     return(
//         <div className=" Searching">
//     <input type="text" placeholder="Search..." className="search" onChange={e=> setQuery(e.target.value)}/>
//     <ul className="list">
//         <li className="listItem ">Computer</li>
//         <li className="listItem">Laptop</li>
//         <li className="listItem">Mobile</li>
//         <li className="listItem ">Mouse</li>
//         <li className="listItem ">Headphone</li>
//     </ul>
//     </div>
//     );
// }
// export default Searching;


// import React, { useState } from 'react';
// import { Data } from './Data';

// const Page = () => {
//   const [store] = useState(Data);
//   const [data, setData] = useState('');

//   const getData = (e) => {
//     console.log(e.target.value);
//     setData(e.target.value);
//   };

//   // Optional: Filter the data based on search input
//   const filteredStore = store.filter((item) =>
//     item.name.toLowerCase().includes(data.toLowerCase())
//   );

//   return (
//     <div className='container'>
//       <h1>This is login components</h1>
//       <input
//         type='text'
//         placeholder='Search here...'
//         onChange={getData}
//       />

//       <div className='type'>
//         <h3>Name</h3>
//         <h3>Brand</h3>
//         <h3>Images</h3>
//       </div>

//       {/* map method creates a new array to iterate the value of array */}
//       {filteredStore.map((cur, index) => (
//         <div className='itemlist' key={index}>
//           <p>{cur.name}</p>
//           <p>{cur.brand}</p>
//           <img src={cur.img} alt={cur.name} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Searching;