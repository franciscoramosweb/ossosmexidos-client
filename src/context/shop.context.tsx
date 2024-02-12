import { createContext, useEffect, useState } from "react";
import { IProduct } from "../models/product";
import axios from "axios";
import { useGetToken } from "../hooks/useGetToken";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export interface IShopContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  removeAllItemsFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  getCartItemCount: (itemId: string) => number;
  getTotalCartAmount: () => number;
  checkout: () => void;
  availableMoney: number;
  purchasedItems: IProduct[];
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  products: IProduct[];
  fetchProduct: (itemId: string) => Promise<IProduct | null>;
  cartItems: { string: number } | {};
}

export const ShopContext = createContext<IShopContext | null>(null);

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const [cartItems, setCartItems] = useState<{ string: number } | {}>({});
  const [availableMoney, setAvailableMoney] = useState<number>(0);
  const [purchasedItems, setPurchasedItems] = useState<IProduct[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    cookies.accessToken != null
  );

  const location = useLocation();

  useEffect(() => {
    const currentUrl = location.pathname.includes.bind(location.pathname);

    switch (true) {
      case currentUrl("/auth"):
        document.body.style.background = "black";
        break;
      case currentUrl("/about"):
        document.body.style.background = "black";
        break;
      case currentUrl("/product"):
        document.body.style.background = "black";
        break;
      case currentUrl("/archive"):
        document.body.style.background = "black";
        break;
      case currentUrl("/shop"):
        document.body.style.background = "black";
        break;
      case currentUrl("/account"):
        if (!cookies.accessToken) {
          navigate("/auth");
          break;
        }
        document.body.style.background = "orange";
        break;
      default:
        document.body.style.background = "#1B59C2";
    }
  }, [location.pathname]);

  const { headers } = useGetToken();
  const navigate = useNavigate();

  const fetchAvailableMoney = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/user/available-money/${localStorage.getItem(
          "userID"
        )}`,
        { headers }
      );
      setAvailableMoney(res.data.availableMoney);
    } catch (error) {
      console.log(error);
      alert(` ERROR: Something went wrong`);
    }
  };

  const fetchPurchasedItems = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/product/purchased-items/${localStorage.getItem(
          "userID"
        )}`,
        { headers }
      );
      setPurchasedItems(res.data.purchasedItems);
    } catch (error) {
      console.log(error);
      alert("ERROR: Something went wrong :");
    }
  };

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await axios.get("http://localhost:3001/product", {
        headers,
      });
      setProducts(fetchedProducts.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProduct = async (itemId: string): Promise<IProduct | null> => {
    try {
      const product = await axios.get(
        `http://localhost:3001/product/${itemId}`,
        {
          headers,
        }
      );
      return product.data.product[0];
    } catch (error) {
      console.log(error);
    }
  };

  const getCartItemCount = (itemId: string): number => {
    if (itemId in cartItems) {
      return cartItems[itemId];
    }
    return 0;
  };

  const addToCart = (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId: string) => {
    if (!cartItems[itemId]) return;
    if (cartItems[itemId] == 0) return;
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const removeAllItemsFromCart = (itemId: string) => {
    if (!cartItems[itemId]) return;
    if (cartItems[itemId] == 0) return;
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
  };

  const updateCartItemCount = (newAmount: number, itemId: string) => {
    if (newAmount < 0) return;

    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const getTotalCartAmount = (): number => {
    let totalAmount = 0;

    if (cartItems != "{}")
      for (const item in cartItems) {
        if (cartItems[item] > 0) {
          let itemInfo: IProduct = products.find(
            (product) => product._id === item
          );
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
    return totalAmount;
  };

  const checkout = async () => {
    const body = { customerID: localStorage.getItem("userID"), cartItems };

    try {
      await axios.post("http://localhost:3001/product/checkout", body, {
        headers: headers,
      });

      setCartItems({});

      fetchAvailableMoney();

      fetchPurchasedItems();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    if (isAuthenticated) {
      fetchAvailableMoney();
      fetchPurchasedItems();
    } else {
      localStorage.clear();
      setCookies("accessToken", null);
    }
  }, [isAuthenticated]);

  const contextValue: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getCartItemCount,
    getTotalCartAmount,
    checkout,
    availableMoney,
    purchasedItems,
    isAuthenticated,
    setIsAuthenticated,
    products,
    removeAllItemsFromCart,
    fetchProduct,
    cartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
