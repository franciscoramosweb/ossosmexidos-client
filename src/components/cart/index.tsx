import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/shop.context";
import { IProduct } from "../../models/product";
import styles from "./styles.module.scss";
import CartItem from "./cart-item";
import { motion } from "framer-motion";

export default function Index() {
  const { getCartItemCount, getTotalCartAmount, checkout, products } =
    useContext(ShopContext);

  const navigate = useNavigate();

  const totalAmount = getTotalCartAmount();

  const perspective = {
    initial: {
      opacity: 0,
      rotateX: 90,
      translateY: 130,
    },
    enter: (i) => ({
      opacity: 1,
      rotateX: 0,
      translateY: 0,
      transition: {
        duration: 0.25,
        opacity: { delay: 0.35, duration: 0.25 },
        delay: i * 0.1,
      },
    }),
    exit: {
      opacity: 0,
      translateY: 130,
    },
  };

  return (
    <motion.div
      className={styles.cart}
      variants={perspective}
      animate="enter"
      exit="exit"
      initial="initial"
    >
      <div className={styles.title}>
        <h1>Bag</h1>
      </div>
      <div className={styles.body}>
        <div className={styles.cartItems}>
          {products.map((product: IProduct, i) => {
            if (getCartItemCount(product._id) !== 0) {
              return (
                <motion.div
                  className={styles.cart}
                  variants={perspective}
                  custom={i}
                  animate="enter"
                  exit="exit"
                  initial="initial"
                >
                  <CartItem key={product._id} data={product} />
                </motion.div>
              );
            }
          })}
        </div>
      </div>
      {totalAmount > 0 ? (
        <div className={styles.checkout}>
          <p>Subtotal: ${totalAmount.toFixed(2)}</p>
          <button onClick={checkout}>COMPLETE ORDER</button>
        </div>
      ) : (
        <div className={styles.cartEmpty}>
          <h1 > Your shopping cart is empty</h1>
        </div>
      )}
    </motion.div>
  );
}
