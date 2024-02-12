import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { IShopContext, ShopContext } from "../../context/shop.context";
import styles from "./style.module.scss";
import { useCookies } from "react-cookie";

export default function Index() {
  const { setIsAuthenticated } = useContext<IShopContext>(ShopContext);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className={styles.account}>
      ACCOUNT PAGE
      <Link to={"/auth"} onClick={logout}>
        Logout
      </Link>
      <Link to={"/purchased-items"}>Purchases</Link>
    </div>
  );
}
