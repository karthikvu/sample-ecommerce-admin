import logo from './logo.svg';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)

  useEffect(() => {
    axios.get("http://localhost:3002/products").then(resp => {
      setProducts(resp.data)
    })
  }, [])


  const addProduct = () => {
    const product = {
      name,
      price: parseInt(price),
      id: uuidv4(),
      image: "https://via.placeholder.com/300?text=" + name.replaceAll(" ", "+")
    }
    console.log(product)
    axios.post("http://localhost:3002/products", product).then(resp => {
      console.log("Successfully added the product", name)
    }).catch(err => {
      console.error("Failed to add product", err)
    })
  }

  console.log("name = ", name)
  console.log("price = ", price)
  return (
    <div className="App">
      <h3>My eCommerce Admin</h3>
      <div className="add-form">
        <div className="field">
          <label>Product Name : </label>
          <input value={name} onChange={event => setName(event.target.value)} name="name"></input>
        </div>
        <div className="field">
          <label>Product Price : </label>
          <input value={price} onChange={event => setPrice(event.target.value)} name="price"></input>
        </div>
        <button onClick={ addProduct}>Add Product</button>
      </div>
      <div className="all-products">
        <table>
          <thead>
            <td>Id</td>
            <td>Name</td>
            <td>Price</td>
            <td>Image</td>
            <td>Actions</td>
          </thead>
          <tbody>
            {products.map(product => <tr>
              <td>{ product.id}</td>
              <td>{ product.name}</td>
              <td>{ product.price}</td>
              <td><a target="_blank" href={product.image}>Image</a></td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
