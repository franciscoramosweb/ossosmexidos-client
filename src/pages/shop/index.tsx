import { Link, Navigate, useNavigate } from "react-router-dom";
import { Product } from "./product-item";
import { useContext, useEffect } from "react";
import { IShopContext, ShopContext } from "../../context/shop.context";
import { motion } from "framer-motion";
import styles from "./style.module.scss";

export default function Index() {
  const { products, fetchProduct } = useContext<IShopContext>(ShopContext);

  const text = "WEAR THE BONES".split("");

  return (
    <motion.div animate={{ x: [-100, 0] }} className={styles.shop}>
      <div className={styles.shopTitle}>
        <div className={styles.shopTitleDiv}>
          {text.map((el, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i * 0.1,
              }}
              key={i}
            >
              {el}
            </motion.span>
          ))}
        </div>
      </div>
      <div className={styles.products}>
        {products.map((product) => (
          <Link to={`/product/${product._id}`}>
            <Product key={product._id} product={product} />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
