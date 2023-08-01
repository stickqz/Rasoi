import React, { useContext, useState } from "react";

import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
	const [checkout, setCheckout] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const ctx = useContext(CartContext);

	const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
	const hasItems = ctx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		ctx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		ctx.addItem({ ...item, amount: 1 });
	};

	const clickHandler = () => {
		setCheckout(true);
	};

	const submitHandler = async (userData) => {
		setSubmitting(true);
		await fetch(
			"https://react-http-eb29f-default-rtdb.firebaseio.com/orders.json",
			{
				method: "POST",
				body: JSON.stringify({
					user: userData,
					orderedItems: ctx.items,
				}),
			}
		);
		setSubmitting(false);
		setDidSubmit(true);
		ctx.clearCart();
	};

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{ctx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.amount}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)}
				/>
			))}
		</ul>
	);

	const modalActions = (
		<div className={classes.actions}>
			<button className={classes["button--alt"]} onClick={props.onClose}>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={clickHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<React.Fragment>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			{checkout && (
				<Checkout onCancel={props.onClose} submit={submitHandler} />
			)}
			{!checkout && modalActions}
		</React.Fragment>
	);

	const submittingModalContent = <p>Processing Order...</p>;

	const didSubmitModalContent = (
		<React.Fragment>
			<p>Order Placed!!!</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onClose}>
					Close
				</button>
			</div>
		</React.Fragment>
	);

	return (
		<Modal onClick={props.onClose}>
			{!submitting && !didSubmit && cartModalContent}
			{submitting && submittingModalContent}
			{!submitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
