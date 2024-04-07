import { ReactElement, memo } from "react";
import { ProductType } from "../context/ProductsProvider";
import { ReducerAction, ReducerActionType } from "../reducer/CartReducer";

type PropsType = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTION: ReducerActionType;
  inCart: boolean;
};

const Product = ({
  product,
  dispatch,
  REDUCER_ACTION,
  inCart,
}: PropsType): ReactElement => {
  // React
  //   const img: string = require(`../images/${product.sku}.jpg`);

  // Vite
  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
    .href;

  const onAddToCart = () =>
    dispatch({
      type: REDUCER_ACTION.ADD,
      payload: { ...product, quantity: 1 },
    });

  const itemInCart = inCart ? " → Item in Cart: ✔️" : null;

  const content = (
    <article className='product'>
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} className='product__img' />
      <p>
        {new Intl.NumberFormat("en-MY", {
          style: "currency",
          currency: "MYR",
        }).format(product.price)}
        {itemInCart}
      </p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </article>
  );

  return content;
};

function areProductsEqual(
  { product: prevProduct, inCart: prevInCart }: PropsType,
  { product: nextProduct, inCart: nextIncart }: PropsType
) {
  return Object.keys(prevProduct).every((key) => {
    return (
      prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType] && prevInCart === nextIncart
    );
  });
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;
