import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import RestaurantDetails from "./pages/RestaurantDetails";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const Watchlist = () => (
  <div style={{ height: "200vh", padding: "2rem" }}>Watchlist Page</div>
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/account" element={<Profile />} />
          <Route
            path="/restaurant/:restaurantId"
            element={<RestaurantDetails />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
