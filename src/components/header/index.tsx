import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faPerson } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Nav from "../nav";
import Cart from "../cart";
import { useCookies } from "react-cookie";
import { ShopContext } from "../../context/shop.context";

export default function Index({}) {
  const [isCartActive, setIsCartActive] = useState(false);
  const [isNavMenuActive, setIsNavMenuActive] = useState(false);
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const { cartItems } = useContext(ShopContext);
  const location = useLocation();

  const totalCartItems = Object.values(cartItems).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const optionsContainer = {
    cartOpen: {
      width: "480px",
      height: "650px",
      transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
    navOpen: {
      width: "130px",
      height: "170px",
      transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      width: "130px",
      height: "40px",
      transition: {
        duration: 0.75,
        delay: 0.35,
        type: "tween",
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  useEffect(() => {
    const currentUrl = location.pathname;
    console.log(currentUrl);

    if (
      currentUrl.includes("/product") ||
      currentUrl.includes("/product") ||
      currentUrl === "/auth"
    ) {
      setIsCartActive(false);
      setIsNavMenuActive(false);
    }
  }, [location.pathname]);

  const controls = useAnimation();

  useEffect(() => {
    controls.start({ scale: [1, 1.5, 1] });
  }, [totalCartItems, controls]);

  return (
    <div className={styles.header}>
      <Link to={"/"}>
        <h1 className={styles.title}>OSSOSMEXIDOS</h1>
      </Link>

      <div className={styles.menuContainer}>
        <motion.div
          className={styles.menu}
          variants={optionsContainer}
          animate={
            isCartActive ? "cartOpen" : isNavMenuActive ? "navOpen" : "closed"
          }
          initial="closed"
        >
          <AnimatePresence>{isNavMenuActive && <Nav></Nav>}</AnimatePresence>
          <AnimatePresence>{isCartActive && <Cart></Cart>}</AnimatePresence>
        </motion.div>

        <div className={styles.navOptions}>
          <div
            onClick={() => {
              setIsNavMenuActive(!isNavMenuActive);
              setIsCartActive(false);
            }}
            className={`${styles.burger} ${
              isNavMenuActive ? styles.burgerActive : ""
            }`}
          ></div>
          <Link to={cookies.accessToken ? "/account" : "/auth"}>
            <FontAwesomeIcon icon={faPerson} />
          </Link>

          <div
            onClick={() => {
              setIsCartActive(!isCartActive);
              setIsNavMenuActive(false);
            }}
            className={styles.cartIcon}
          >
            <FontAwesomeIcon icon={faShoppingCart} />
            <motion.div className={styles.circle} animate={controls}>
              {totalCartItems}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
