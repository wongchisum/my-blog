import styles from "./index.module.less";

export function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loader} />
    </div>
  );
}
