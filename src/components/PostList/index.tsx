import styles from "./index.module.less";
import type { PostItem } from "@/types";
import {useNavigate} from 'react-router'


export interface PostListProps {
  data: Array<PostItem["node"]>;
}

export function PostList({ data }: PostListProps) {
  const nav = useNavigate()
  // 跳转到详情页
  const handleClick = (id:string) => {
    nav(`/post/${id}`)
  }
  return (
    <>
      {data.map((item) => {
        const seriesName = item?.series?.name ? `[${item.series.name}]` : ""

        return (
          <div className={styles.postList} key={item.id}>
            <div className={styles.content}>
              <div className={styles.title}>{`${seriesName} ${item.title}`}</div>
              <div className={styles.brief}>{item.brief}</div>
            </div>
            <div className={styles.more} onClick={() => handleClick(item.slug)}>More</div>
          </div>
        );
      })}
    </>
  );
}
