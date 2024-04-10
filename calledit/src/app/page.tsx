'use client'
import styles from "./page.module.css";
import PredictionFeed from "./components/predictionFeed/predictionFeed";
import CategoryPicker from "./components/categoryPicker/categoryPicker";

import { useState } from "react";

export default function Home() {
	const [category, setCategory] = useState("All")
	return (
		<main className={styles.main}>
			<div className={"flex flex-col w-full md:w-1/4 lg:w-1/2 h-full"}>
				<div>{"thats so much better isn't it?"}</div>
				<div className={"flex"}>
					<CategoryPicker setCategory={setCategory} />
				</div>
					<PredictionFeed modifier={category} />
			</div>
		</main>
	);
}
