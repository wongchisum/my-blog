import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { getPostDetail } from "@/queries";
import { USER_ID } from "@/constants";
import type { QueryPostDetailResult } from "@/types";
import Markdown from "react-markdown";
import styles from "./index.module.less";

export function Post() {
  const { id } = useParams();
  const { data } = useQuery<QueryPostDetailResult>(getPostDetail, {
    variables: { id: USER_ID, postId: id },
  });

  console.log("data>>", data);

  if (!data) return <></>;
  return (
    <div className={styles.post}>
      <div className={styles.title}>{data?.publication.post.title}</div>
      <div className={styles.content}>
        <Markdown>{data?.publication.post.content.markdown}</Markdown>
      </div>
    </div>
  );
}
