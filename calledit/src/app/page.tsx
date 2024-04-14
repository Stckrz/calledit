'use client'
import { useState } from "react";
import styles from "./page.module.css";
import PredictionFeed, { FeedType } from "./components/predictionFeed/predictionFeed";
import CategoryPicker from "./components/categoryPicker/categoryPicker";

export default function Home() {
	const [category, setCategory] = useState("All")
	return (
		<main className={styles.main}>
			<div className={"flex flex-col w-full md:w-1/3 lg:w-1/2 items-center"}>
				<div>{"thats so much better isn't it?"}</div>
					<CategoryPicker setCategory={setCategory} />
					<PredictionFeed feedType={FeedType.Normal} modifier={category} />
			</div>
		</main>
	);
}
