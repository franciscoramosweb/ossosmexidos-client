import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ShopContextProvider } from "./context/shop.context";
import { PurchasedItemsPage } from "./pages/purchased-items/purchased-items-page";
import Header from "./components/header";
import { useEffect, useState } from "react";
import Account from "./pages/account";
import Main from "./pages/main";
import About from "./pages/about";
import Footer from "./components/footer";
import Auth from "./pages/auth";
import ScrollToTop from "./components/utils";
import Archive from "./pages/archive";
import ShopItem from "./pages/shop/shop-item";
import Shop from "./pages/shop";

function App() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  

  return (
    <div className="App">
      <Router>
        <ScrollToTop />

        <ShopContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:productId" element={<ShopItem />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/account" element={<Account />} />
            <Route path="/purchased-items" element={<PurchasedItemsPage />} />
          </Routes>
          <Footer />
        </ShopContextProvider>

      </Router>
    </div>
  );
}

export default App;