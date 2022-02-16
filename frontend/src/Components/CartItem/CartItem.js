import React from "react";

const CartItem = ({ data, deleteFromCart }) => {
	const { id, name, price } = data;

	return (
		<div style={{ borderBottom: "thin solid gray" }}>
			<h4>{name}</h4>
			<h5>{`${price}.00`}</h5>
			<>
				<button onClick={() => deleteFromCart(id)}>Eliminar</button>
				<br />
				<br />
			</>
		</div>
	);
};

export default CartItem;
