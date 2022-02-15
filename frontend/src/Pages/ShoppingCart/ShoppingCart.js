import { useDispatch, useSelector } from "react-redux";
import { clearCart, delFromCart } from "../../Actions/cart.actions";
import CartItem from "../../Components/CartItem/CartItem";
import "./ShoppingCart.css";

const ShoppingCart = () => {
	const { cart } = useSelector((state) => state.cart);
  const { courses } = useSelector((state) => state.courses);
	const dispatch = useDispatch();
	console.log(courses);
	console.log(cart);

	return (
		<div>
			<h2>Mi Carrito de compras</h2>
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
			<article className="box">
				{cart.length > 0 ? (
					<button onClick={() => dispatch(clearCart())}>Limpiar carrito</button>
				) : null}
				{cart.map((item, index) => (
					<CartItem
						key={index}
						data={item}
						delFromCart={() => dispatch(delFromCart(item.id))}
					/>
				))}
			</article>
		</div>
	);
};

export default ShoppingCart;