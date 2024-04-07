import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import { useState } from "react";

// npx json-server -w data/products.json  -p 3500
function App() {
  const [viewCart, setViewCart] = useState<boolean>(false);

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {viewCart ? <Cart /> : <ProductList />}
      <Footer viewCart={viewCart} />
    </>
  );

  return content;
}

export default App;
