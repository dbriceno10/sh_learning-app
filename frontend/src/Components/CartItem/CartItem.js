import React from "react";
import { useDispatch } from "react-redux";
import { deleteFromCart, getLocalStorage } from "../../Actions/cart.actions";

const CartItem = ({ data }) => {
  const dispatch = useDispatch();
	const { name, price, img } = data;
  console.log(data);

  const handleClick = (id) => {
    dispatch(deleteFromCart(data.id))
    dispatch(getLocalStorage())
  }

	return (
		<div style={{ borderBottom: "thin solid gray" }}>
      <img src={img} alt={name} />
			<h4>{name}</h4>
			<h5>{`${price}.00`}</h5>
			<>
				<button onClick={handleClick}>Eliminar</button>
				<br />
				<br />
			</>
		</div>
	);
};

export default CartItem;
