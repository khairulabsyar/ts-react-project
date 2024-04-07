import { ChangeEvent, ReactElement, memo } from "react";
import {
  CartItemType,
  ReducerAction,
  ReducerActionType,
} from "../reducer/CartReducer";

type PropsType = {
  item: CartItemType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTION: ReducerActionType;
};
const CartLineItem = ({ item, dispatch, REDUCER_ACTION }: PropsType) => {
  const img: string = new URL(`../images/${item.sku}.jpg`, import.meta.url)
    .href;

  const lineTotal: number = item.quantity * item.price;

  const highestQ: number = 20 > item.quantity ? 20 : item.quantity;

  const optionValue: number[] = [...Array(highestQ).keys()].map((i) => i + 1);

  const options: ReactElement[] = optionValue.map((val) => {
    return (
      <option key={`opt${val}`} value={val}>
        {val}
      </option>
    );
  });

  const onChangeQ = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: REDUCER_ACTION.QUANTITY,
      payload: { ...item, quantity: Number(e.target.value) },
    });
  };

  const onRemoveFromCart = () =>
    dispatch({ type: REDUCER_ACTION.REMOVE, payload: item });

  const content = (
    <li className='cart__item'>
      <img src={img} alt={item.name} className='cart_img' />
      <div aria-label='Item Name'>{item.name}</div>
      <div aria-label='Price Per Item'>
        {new Intl.NumberFormat("en-MY", {
          style: "currency",
          currency: "MYR",
        }).format(item.price)}
      </div>

      <label htmlFor='itemQuantity' className='offscreen'>
        Item Quantity
      </label>
      <select
        name='itemQuantity'
        id='itemQuantity'
        className='cart__select'
        value={item.quantity}
        aria-label='Item Quantity'
        onChange={onChangeQ}
      >
        {options}
      </select>
      <div className='cart__item-subtotal' aria-label='Line Item Subtotal'>
        {new Intl.NumberFormat("en-MY", {
          style: "currency",
          currency: "MYR",
        }).format(lineTotal)}
      </div>
      <button
        className='cart__button'
        aria-label='Remove Item from Cart'
        title='Remove Item from Cart'
        onClick={onRemoveFromCart}
      >
        ❌
      </button>
    </li>
  );
  return content;
};

function areItemsEqual(
  { item: prevItem }: PropsType,
  { item: nextItem }: PropsType
) {
  return Object.keys(prevItem).every((key) => {
    return (
      prevItem[key as keyof CartItemType] ===
      nextItem[key as keyof CartItemType]
    );
  });
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(
  CartLineItem,
  areItemsEqual
);

export default MemoizedCartLineItem;
