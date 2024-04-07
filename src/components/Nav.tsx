type PropsType = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav = ({ viewCart, setViewCart }: PropsType) => {
  const button = viewCart ? (
    <button style={{ width: 164 }} onClick={() => setViewCart(false)}>
      View Products
    </button>
  ) : (
    <button style={{ width: 164 }} onClick={() => setViewCart(true)}>
      View Cart
    </button>
  );

  const content = <nav className='nav'>{button}</nav>;
  return content;
};

export default Nav;
