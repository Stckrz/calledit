'use client'
import styles from "./page.module.css";
import PredictionFeed from "./components/predictionFeed/predictionFeed";

export default function Home() {
	return (
		<main className={styles.main}>
			<div className={"flex flex-col w-1/2"}>
				<div>thats so much better isn't it?</div>
				<PredictionFeed />
			</div>
		</main>
	);
}
