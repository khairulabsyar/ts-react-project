import { ReactElement, createContext } from "react";
import { InitCartState, UseCartContext } from "../reducer/CartReducer";
import REDUCER_ACTION_TYPE from "../enums/ReducerActionType";

export type UseCartContextType = ReturnType<typeof UseCartContext>;

const initContextState: UseCartContextType = {
  dispatch: () => {},
  REDUCER_ACTION: REDUCER_ACTION_TYPE,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

export const CartContext = createContext<UseCartContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={UseCartContext(InitCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
