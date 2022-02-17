import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getLocalStorage } from "../../Actions/cart.actions";
import Button from "../../Components/Buttons/Buttons";
import CartItem from "../../Components/CartItem/CartItem";
import Navbar from "../../Components/NavBars/Navbars";
import "./ShoppingCart.css";

const ShoppingCart = ({ isLoggedIn }) => {
	const { localStorageCart } = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getLocalStorage());
	}, [dispatch]);

	const prices = localStorageCart?.map((el) => el.price);
	let total = prices?.reduce((a, b) => a + b, 0);

	return (
		<div style={{ overflow: "hidden" }} className="cartContainer">
			<Navbar isLoggedIn={isLoggedIn} />
			<div>
				<h1 style={{ textAlign: "center" }}>Mi carrito de compras</h1>
				{localStorageCart ? (
					<div className="cartItemsContainer">
						<div className="totalAndBtn">
							<h2 style={{ marginRight: "1rem" }}>{`Total: $${total}.00`}</h2>
							<Button
								icon={"bi:cart-plus"}
								type={"raised-icon"}
								text={"Comprar"}
								link={""}
							></Button>
						</div>
						<article className="box">
							{localStorageCart?.map((item) => (
								<CartItem key={item.id} data={item} />
							))}
							{localStorageCart?.length > 0 ? (
								// <button onClick={() => dispatch(clearCart())}>
								// 	Limpiar carrito
								// </button>
								<Button
									icon={"bi:cart-plus"}
									type={"raised-icon"}
									text={"Limpiar"}
									link={""}
									onClick={() => dispatch(clearCart())}
								></Button>
							) : null}
						</article>
						<div className="totalAndBtn">
							<h2 style={{ marginRight: "1rem" }}>{`Total: $${total}.00`}</h2>
							<Button
								icon={"bi:cart-plus"}
								type={"raised-icon"}
								text={"Comprar"}
								link={""}
							></Button>
						</div>
					</div>
				) : (
					<h2 style={{ textAlign: "center" }}>
						No tienes productos en tu carrito
					</h2>
				)}
			</div>
		</div>
	);
};

export default ShoppingCart;
