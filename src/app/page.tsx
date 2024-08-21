"use client";
import styles from "./page.module.css";
import DatePicker from "./datePicker/DatePicker";

export default function Home() {
  return (
    <main className={styles.main}>
      <DatePicker />
    </main>
  );
}
