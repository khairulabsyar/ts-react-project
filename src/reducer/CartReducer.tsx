import { useMemo, useReducer } from "react";
import REDUCER_ACTION_TYPE from "../enums/ReducerActionType";

export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  quantity: number;
};

type CartStateType = { cart: CartItemType[] };

export const InitCartState: CartStateType = { cart: [] };

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  const { type, payload } = action;

  switch (type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!payload) throw new Error("payload missing in ADD action");

      const { sku, name, price } = payload;

      const filterCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );

      const quantity: number = itemExists ? itemExists.quantity + 1 : 1;

      return {
        ...state,
        cart: [...filterCart, { sku, name, price, quantity }],
      };
    }
    case REDUCER_ACTION_TYPE.REMOVE: {
      if (!payload) throw new Error("payload missing in REMOVE action");

      const { sku } = payload;

      const filterCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      return { ...state, cart: [...filterCart] };
    }
    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!payload) throw new Error("payload missing in QUANTITY action");

      const { sku, quantity } = payload;

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );

      if (!itemExists) {
        throw new Error("Item must exist in order to update the quantity");
      }

      const updatedItem: CartItemType = { ...itemExists, quantity };

      const filterCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      return { ...state, cart: [...filterCart, updatedItem] };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }
    default:
      return state;
  }
};

export const UseCartContext = (InitCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, InitCartState);

  const REDUCER_ACTION = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItems: number = state.cart.reduce((prev, cartItem) => {
    return prev + cartItem.quantity;
  }, 0);

  const totalPrice: string = new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
  }).format(
    state.cart.reduce((prev, cartItem) => {
      return prev + cartItem.quantity * cartItem.price;
    }, 0)
  );

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-4));
    const itemB = Number(b.sku.slice(-4));

    return itemA - itemB;
  });

  return { dispatch, REDUCER_ACTION, totalItems, totalPrice, cart };
};
