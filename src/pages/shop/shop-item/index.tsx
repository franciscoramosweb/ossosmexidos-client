import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../../context/shop.context";
import { IProduct } from "../../../models/product";
import { useParams } from "react-router-dom";
import styles from "./style.module.scss";

export default function ProductDetails() {
  const [product, setProduct] = useState<IProduct>(null);
  const [selectedSize, setSelectedSize] = useState(""); // State to store the selected size
  const { fetchProduct, addToCart } = useContext(ShopContext);
  const { productId } = useParams();

  // Array of available sizes
  const sizes = ["S", "M", "L", "XL"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await fetchProduct(productId);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, [fetchProduct, productId]);

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart(product._id);
  };

  if (!product) {
    // Optional: Show loading spinner or message while product is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.product}>
      <div className={styles.box}>
        <img src={`./../clothes/${product.imageURL}`} alt="" />
      </div>
      <div className={styles.box}>
        <div className={styles.options}>
          <h1>{product.productName.toUpperCase()}</h1>
          <p>${product.price}</p>
          <div>
            <div className={styles.sizeOptions}>
              {sizes.map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? styles.selected : ""}
                  onClick={() => handleSizeSelection(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button className="addToCartBttn" onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}