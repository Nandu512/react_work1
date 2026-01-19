import axios from "axios";
import { Link } from "react-router-dom";

function ProductListItem({ product, refresh }) {
  const deleteProduct = () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      axios
        .delete(`https://worksheet-catalogue.mashupstack.com/products/${product.id}`)
        .then((response) => {
          alert(response.data.message || "Product deleted successfully");
          refresh(); // refresh the product list
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
          alert("Failed to delete product.");
        });
    }
  };

  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5>{product.name}</h5>
        <p>
          <strong>Price:</strong> ${product.price} <br />
          <strong>Category:</strong> {product.category} <br />
          <strong>Quantity:</strong> {product.quantity}
        </p>
        <Link
          to={`/edit/${product.id}`}
          className="btn btn-primary me-2 float-end"
        >
          Edit
        </Link>
        <button
          className="btn btn-danger float-end me-2"
          onClick={deleteProduct}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductListItem;
