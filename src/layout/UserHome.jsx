// import axios from 'axios'
// import {useEffect, useState} from 'react'
// import Banner from "../components/Banner/Banner";
// import Promote from "../layout/Promote"

// export default function UserHome() {
//   const [todos, setTodos] = useState([])

//   useEffect( ()=>{
//     const run = async()=>{
//       let token = localStorage.getItem('token')
//       const rs = await axios.get('http://localhost:8889/todos', {
//         headers : { Authorization : `Bearer ${token}`}
//       })
//       setTodos(rs.data.todos)
//     }
//     run()
//   }, [] )






//   return (
//     <>
//     <div></div>
//     {/* { JSON.stringify(todos)} */}
//     <Promote />
//     </>
//   )
// }

// import axios from "axios";
// import { useEffect, useState } from "react";
// import TodoCard from "../components/TodoCard";
// import ModalEdit from "../components/ModalEdit";

// export default function UserHome() {
//   //const [todos, setTodos] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [editIdx, setEditIdx] = useState(-1)
//   const [trigger, setTrigger] = useState(false)

//   useEffect(() => {
//     const run = async () => {
//       let token = localStorage.getItem("token");
//       const rs = await axios.get("http://localhost:8889/product/landing", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts(rs.data.products);
//     };
//     run();
//   }, [trigger]);

//   const openModal = (id) => {
//     let idx = products.findIndex( el=> el.id === id)
//     setEditIdx(idx)
//     document.getElementById("my_modal_2").showModal()
//   }

//   const closeModal = () => {
//     document.getElementById("my_modal_2").close()
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="text-center text-2xl text-blue-500">Your jobs</div>
//       {/* <ModalEdit el={products[editIdx]} closeModal={closeModal} setTrigger={setTrigger}/> */}
//       <div className="flex gap-4">
//         {products.map((el) => (
//           <TodoCard key={el.id} el={el} openModal={openModal} setTrigger={setTrigger}/>
//         ))}
//       </div>
//     </div>
//   );
// }
import axios from 'axios';
import { useEffect, useState } from 'react';
import './css/UserHome.css';
import Promote from "../layout/Promote";
import { Link } from 'react-router-dom';

export default function UserHome() {
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8889/auth/getproduct', {
          headers: { Authorization: `Bearer ${token}` } 
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, []);

  const filteredProducts = product.filter(item =>
    item.ItemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-home-container">
      <div className='poster'>
        <Promote />
        <h3 className="productfi">รายการสินค้า</h3>
         {/* Updated Search Bar */}
         <div id="search-bar" style={{ width: '550px' }}className="w-120 bg-white rounded-md shadow-lg z-10 mx-auto my-4">
          <form className="flex items-center justify-center p-2">
            <input 
              type="text" 
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
            />
            
          </form>
        </div>

        
      </div>

      {/* Product list */}
      {filteredProducts.map((item) => (
        <div key={item.id} className="product-item flex justify-center">
          <Link to={`/product/${item.id}`}>
            <img src={item.file} alt="" />
            <hr />
            <h3 className="font-semibold product-title">{item.ItemName}</h3>
            <p className="font-semibold product-price">ราคา: {item.price.toLocaleString()} บาท</p>
          </Link>
          <div className="button-group">
            {/* Add buttons or actions if needed */}
          </div>
        </div>
      ))}
    </div>
  );
}
