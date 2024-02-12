import React, { useContext } from "react";
import { ShopContext } from "../../context/shop.context";
import { IProduct } from "../../models/product";
import styles from "./style.module.scss";


interface Props {
  product: IProduct;
}

export const Product = (props: Props) => {
  const { _id, productName, description, price, stockQuantity, imageURL } =
    props.product;

  const { addToCart, getCartItemCount } = useContext(ShopContext);

  return (
    <div className={styles.product}>

      <div className={styles.imageContainer}>
        <img src={`./clothes/${imageURL}`} />
      </div>

      <div className={styles.description}>
        <h3>{productName.toUpperCase()}</h3>
        <p> ${price}</p>
      </div>

    </div>
  );
};
