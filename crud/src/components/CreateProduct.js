import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // adjust path if Navbar is in the same folder

function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  function addProduct() {
    // Prepare product data
    const newProduct = {
      name,
      price: parseFloat(price),
      category,
      quantity: parseInt(quantity),
    };

    axios
      .post("https://worksheet-catalogue.mashupstack.com/products", newProduct)
      .then((response) => {
        alert("Product added successfully!");
        navigate("/"); // go back to product list
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Failed to add product.");
      });
  }

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <h1 className="text-center my-4">Add Product</h1>

            <div className="form-group mb-2">
              <label>Product Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-2">
              <label>Price:</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-2">
              <label>Category:</label>
              <input
                type="text"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-2">
              <label>Quantity:</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div className="form-group mt-3">
              <button
                className="btn btn-primary float-end"
                onClick={addProduct}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
