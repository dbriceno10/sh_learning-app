import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { clearCart, getLocalStorage, postPurchaseOrder } from "../../Actions/cart.actions";
import Button from "../../Components/Buttons/Buttons";
import CartItem from "../../Components/CartItem/CartItem";
import Navbar from "../../Components/NavBars/Navbars";
import "./ShoppingCart.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { v4 } from 'uuid';

const ShoppingCart = ({ isLoggedIn }) => {
	const { localStorageCart } = useSelector((state) => state.cart);
	const { userCredentials } = useSelector((state) => state.login);
	const dispatch = useDispatch();
	let navigate = useNavigate()

	const MySwal = withReactContent(Swal);

	useEffect(() => {
		dispatch(getLocalStorage());
	}, [dispatch]);

	const prices = localStorageCart?.map((el) => el.price);
	let total = prices?.reduce((a, b) => a + b, 0);

	const idCourses = localStorageCart?.map(el => el.id) 

	const handlePurchase = () => {
		const orderObj = {
			id: v4(),
			totalAmount: total,
			coursesId: idCourses,
			studentId: userCredentials.id,
			status: false
		}
		dispatch(postPurchaseOrder(orderObj))
		MySwal.fire({
			position: "center-center",
			icon: "info",
			title: "Redirigiendo",
			showConfirmButton: false,
			timer: 2000,
		});
		setTimeout(() => {
				navigate(`/pay?orderId=${orderObj.id}&studentId=${userCredentials.id}&total=${orderObj.totalAmount}`)
			}, 1000);
		dispatch(clearCart());
	}

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
								onClick={handlePurchase}
							></Button>
						</div>
						<article className="box">
							{localStorageCart?.map((item) => (
								<CartItem key={item.id} data={item} />
							))}
							{localStorageCart?.length > 0 ? (
								<Button
									icon={"bi:cart-dash-fill"}
									type={"raised-icon"}
									text={"Vaciar"}
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
								onClick={handlePurchase}
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
