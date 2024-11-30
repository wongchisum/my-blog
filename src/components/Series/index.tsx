import styles from "./index.module.less";
import type { PostItem } from "@/types";

type SeriesProps = PostItem["node"]["series"];

export function Series(props: SeriesProps) {
  return (
    <div className={styles.series}>
      <div className={styles.left}>
        <div className={styles.title}>{props.name}</div>
        <div  className={styles.text}>{props.description.text}</div>
      </div>
      <div className={styles.right}>
        <img src={props.coverImage} alt="" />
      </div>
    </div>
  );
}
