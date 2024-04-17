'use client'
import styles from "./page.module.css";
import PredictionFeed, { FeedType } from "./components/predictionFeed/predictionFeed";
import { useState } from "react";

export default function Home() {
	const [category, setCategory] = useState("All")
	return (
		<main className={styles.main}>
			<div className={"flex flex-col w-full items-center "}>
				<div>{"thats so much better isn't it?"}</div>
				<PredictionFeed modifier={category} feedType={FeedType.Normal} />
			</div>
		</main>
	);
}
