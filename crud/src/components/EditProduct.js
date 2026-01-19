import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    axios
      .get(`https://worksheet-catalogue.mashupstack.com/products/${id}`)
      .then((response) => {
        setName(response.data.name);
        setPrice(response.data.price);
        setCategory(response.data.category);
        setQuantity(response.data.quantity);
      });
  }, [id]);

  function updateProduct() {
    axios
      .put(`https://worksheet-catalogue.mashupstack.com/products/${id}`, {
        name,
        price,
        category,
        quantity,
      })
      .then(() => {
        navigate("/products");
      });
  }

  return (
    <div className="container">
      <h2>Edit Product</h2>

      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={price} onChange={(e) => setPrice(e.target.value)} />
      <input value={category} onChange={(e) => setCategory(e.target.value)} />
      <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />

      <button onClick={updateProduct}>Update</button>
    </div>
  );
}

export default EditProduct;
