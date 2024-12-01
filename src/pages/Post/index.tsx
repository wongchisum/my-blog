import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { getPostDetail } from "@/queries";
import { USER_ID } from "@/constants";
import type { QueryPostDetailResult } from "@/types";
import Markdown from "react-markdown";
import styles from "./index.module.less";
import { Loading } from "@/components";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function Post() {
  const { id } = useParams();
  const { data } = useQuery<QueryPostDetailResult>(getPostDetail, {
    variables: { id: USER_ID, postId: id },
  });

  console.log("data>>", data);

  if (!data) return <Loading />;
  return (
    <div className={styles.post}>
      <div className={styles.title}>{data?.publication.post.title}</div>
      <div className={styles.content}>
        <Markdown
          children={data?.publication.post.content.markdown}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              console.log("match>>",match)
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={oneDark}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </div>
  );
}
