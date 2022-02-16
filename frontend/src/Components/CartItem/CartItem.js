import React from "react";
import { useDispatch } from "react-redux";
import { deleteFromCart, getLocalStorage } from "../../Actions/cart.actions";
import DeleteIcon from "@mui/icons-material/Delete";
import "./CartItem.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const CartItem = ({ data }) => {
	const dispatch = useDispatch();
	const { name, price, img } = data;
	// console.log(data);

	const MySwal = withReactContent(Swal);

	const handleClick =  (id) => {
		MySwal.fire({
			title: `¿Quieres borrar ${name} del carrito?`,
			icon: 'warning',
			showDenyButton: true,
			// showCancelButton: true,
			confirmButtonText: 'Borrar',
			denyButtonText: 'Cancelar',
		}).then( async (result) => {
			/* Read more about isConfirmed, isDenied below */
			console.log(result);
			if (result.isConfirmed) {
				MySwal.fire({
					position: "center-center",
					icon: "success",
					title: `Curso borrado con éxito`,
					showConfirmButton: false,
					timer: 1500,
				});
				dispatch(deleteFromCart(data.id));
				await dispatch(getLocalStorage());
			} else {
				return
			}
		})
	};

	return (
		<div className="cartItemContainer">
			<div className="imgText">
				<img src={img} alt={name} className="cartImg" />
					<h3 className="itemName">{name}</h3>
			</div>
			<div className="priceAndBtn">
				<h3 className="itemPrice">{`$${price}.00`}</h3>
					<DeleteIcon color="error" fontSize="large" onClick={handleClick} className='deleteItem'/>
			</div>
		</div>
	);
};

export default CartItem;
