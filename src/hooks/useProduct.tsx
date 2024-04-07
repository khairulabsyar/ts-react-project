import { useContext } from "react";
import {
  UseProductsContextType,
  ProductsContext,
} from "../context/ProductsProvider";

const useProducts = (): UseProductsContextType => {
  return useContext(ProductsContext);
};

export default useProducts;
