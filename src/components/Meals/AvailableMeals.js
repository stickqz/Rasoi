import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				"https://react-http-eb29f-default-rtdb.firebaseio.com/meals.json"
			);

			if (!response.ok) {
				throw new error("Something went wrong!");
			}
			const responseData = await response.json();

			const loadedMeal = [];

			for (const key in responseData) {
				loadedMeal.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}
			// console.log(loadedMeal);
			setMeals(loadedMeal);
			setLoading(false);
		};

		fetchMeals().catch((error) => {
			setLoading(false);
			setError(error.message);
		});
	}, []);

	if (loading) {
		return (
			<section>
				<p className={classes.loading}>...Loading Meals...</p>
			</section>
		);
	}

	if (error) {
		return (
			<section>
				<p className={classes.error}>Something went wrong!</p>
			</section>
		);
	}

	const mealsList = meals.map((meal) => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
