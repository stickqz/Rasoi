import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (val) => val.trim() === "";
const isNotFive = (val) => val.trim().length !== 5;

const Checkout = (props) => {
	const [formInputValid, setFormInputValid] = useState({
		name: true,
		street: true,
		city: true,
		postal: true,
	});

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostal = postalInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const nameValid = !isEmpty(enteredName);
		const streetValid = !isEmpty(enteredStreet);
		const postalValid = !isNotFive(enteredPostal);
		const cityValid = !isEmpty(enteredCity);

		setFormInputValid({
			name: nameValid,
			street: streetValid,
			city: cityValid,
			postal: postalValid,
		});

		const formValid = nameValid && streetValid && postalValid && cityValid;

		if (!formValid) return;

		props.submit({
			name: enteredName,
			street: enteredStreet,
			postal: enteredPostal,
			city: enteredCity,
		});
	};

	const nameClasses = `${classes.control} ${
		formInputValid.name ? "" : classes.invalid
	}`;
	const streetClasses = `${classes.control} ${
		formInputValid.street ? "" : classes.invalid
	}`;
	const postalClasses = `${classes.control} ${
		formInputValid.postal ? "" : classes.invalid
	}`;
	const cityClasses = `${classes.control} ${
		formInputValid.city ? "" : classes.invalid
	}`;
	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={nameClasses}>
				<label htmlFor="name">Your Name</label>
				<input ref={nameInputRef} type="text" id="name" />
				{!formInputValid.name && <p>Enter valid name!</p>}
			</div>
			<div className={streetClasses}>
				<label htmlFor="street">Street</label>
				<input ref={streetInputRef} type="text" id="street" />
				{!formInputValid.street && <p>Enter valid street!</p>}
			</div>
			<div className={postalClasses}>
				<label htmlFor="postal">Postal</label>
				<input ref={postalInputRef} type="text" id="postal" />
				{!formInputValid.postal && <p>Enter valid postal!</p>}
			</div>
			<div className={cityClasses}>
				<label htmlFor="city">City</label>
				<input ref={cityInputRef} type="text" id="city" />
				{!formInputValid.city && <p>Enter valid city!</p>}
			</div>
			<div className={classes.actions}>
				<button className={classes.submit}>Confirm</button>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default Checkout;
