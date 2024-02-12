import React, { useContext } from "react";
import { ShopContext } from "../../../context/shop.context";
import { IProduct } from "../../../models/product";
import styles from "./styles.module.scss";

interface Props {
  data: IProduct;
}

export default function Index(props: Props) {
  const { _id, productName, description, price, stockQuantity, imageURL } =
    props.data;
  const { getCartItemCount, addToCart, removeFromCart, removeAllItemsFromCart } =
    useContext(ShopContext);

  const cartItemCount = getCartItemCount(_id);
  return (
    <div className={styles.cartItem}>
      <img src={`./../clothes/${imageURL}`} />
      <div className={styles.description}>
        <p>
          <b>{productName}</b>
        </p>
        <div className={styles.count}>
          <button onClick={() => removeFromCart(_id)}> - </button>
            {cartItemCount}
          <button onClick={() => addToCart(_id)}> + </button>
        </div>
      </div>
      <div className={styles.price}>
        <p> Price: ${price}</p>
        <button onClick={() => removeAllItemsFromCart(_id)} className={styles.delete}>Delete</button>
      </div>
    </div>
  );
}
