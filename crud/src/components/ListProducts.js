import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"; // make sure path is correct
import ProductListItem from "./ProductListItem"; // list item component

function ListProducts() {
  const [allProducts, setAllProducts] = useState([]); // all fetched products
  const [filteredProducts, setFilteredProducts] = useState([]); // filtered by search
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all products from API
  const fetchProducts = () => {
    axios
      .get("https://worksheet-catalogue.mashupstack.com/products")
      .then((response) => {
        setAllProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products.");
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle search input change
  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle search button click
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() === "") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container my-4">
        <div className="row mb-3">
          <div className="col-md-8">
            <form>
              <label>Search Product: </label>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInputChange}
                className="form-control d-inline w-50 ms-2"
              />
              &nbsp;
              <button
                className="btn btn-success btn-sm"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </form>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-8">
            <Link to="/create" className="btn btn-info mb-2">
              Add Product
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {filteredProducts.length === 0 ? (
              <p>No products found.</p>
            ) : (
              filteredProducts.map((product) => (
                <ProductListItem
                  key={product.id}
                  product={product}
                  refresh={fetchProducts}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProducts;
