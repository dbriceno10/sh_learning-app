import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, delFromCart, getLocalStorage } from "../../Actions/cart.actions";
import CartItem from "../../Components/CartItem/CartItem";
import "./ShoppingCart.css";

const ShoppingCart = () => {
	const { localStorageCart } = useSelector((state) => state.cart);
  const { courses } = useSelector((state) => state.courses);
	const dispatch = useDispatch();
	console.log(localStorageCart);
	// console.log(cart);


  useEffect(() => {
    dispatch(getLocalStorage())
  }, [dispatch])

	return (
    <>
    <div>
    <h2>Mi Carrito de compras</h2>
    {localStorageCart
      ?
      <article className="box">
      {localStorageCart.length > 0 ? (
        <button onClick={() => dispatch(clearCart())}>Limpiar carrito</button>
        ) : null}
      {localStorageCart.map((item, index) => (
        <CartItem
        key={index}
        data={item}
        delFromCart={() => dispatch(delFromCart(item.id))}
        />
        ))}
    </article>
    :
        <h2>No tienes productos en tu carrito</h2>
    }
			{/* <h3>Productos</h3>
			<article className="box grid-responsive">
      {products.map((product) => (
        <ProductItem
        key={product.id}
						data={product}
						addToCart={() => dispatch(addToCart(product.id))}
					/>
          ))}
			</article> */}
			{/* <h3>Carrito</h3> */}
			{/* <article className="box">
				{localStorageCart.length > 0 ? (
					<button onClick={() => dispatch(clearCart())}>Limpiar carrito</button>
          ) : null}
				{localStorageCart.map((item, index) => (
          <CartItem
          key={index}
          data={item}
          delFromCart={() => dispatch(delFromCart(item.id))}
					/>
          ))}
			</article> */}
		</div>
          </>
	);
};

export default ShoppingCart;