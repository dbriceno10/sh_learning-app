import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteFromCart, getLocalStorage } from "../../Actions/cart.actions";
import CartItem from "../../Components/CartItem/CartItem";
import "./ShoppingCart.css";

const ShoppingCart = () => {
	const { localStorageCart } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	console.log(localStorageCart);


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
        deleteFromCart={() => dispatch(deleteFromCart(item.id))}
        />
        ))}
    </article>
    :
        <h2>No tienes productos en tu carrito</h2>
    }
		</div>
          </>
	);
};

export default ShoppingCart;