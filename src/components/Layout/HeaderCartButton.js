import { useContext, useEffect, useState } from "react";

import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
	const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);
	const ctx = useContext(CartContext);

	const { items } = ctx;

	const numberOfItem = ctx.items.reduce((currNum, item) => {
		return currNum + item.amount;
	}, 0);

	const btnClasses = `${classes.button} ${
		buttonIsHighlighted ? classes.bump : ""
	}`;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setButtonIsHighlighted(true);

		const timer = setTimeout(() => {
			setButtonIsHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{numberOfItem}</span>
		</button>
	);
};

export default HeaderCartButton;
