import { useNavigate } from "react-router";
import { getPosts } from "@/queries";
import { useLazyQuery } from "@apollo/client";
import { USER_ID } from "@/constants";
import type { QueryPostsResult } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { PostList, Pagination, Loading } from "@/components";
import { useRef } from "react";
import type { PostListProps } from "@/components";

interface PagePostMap {
  [page: number]: PostListProps["data"];
}

export function Home() {
  const nav = useNavigate();
  const afterCursorRef = useRef("");
  const [request, { loading, data, error }] = useLazyQuery<QueryPostsResult>(
    getPosts,
    { variables: { id: USER_ID } }
  );
  const [pageNum, setPageNum] = useState(1); // 页码
  const [maxPageNum, setMaxPageNum] = useState(1); // 最大页码数
  const [pageCaches, setPageCaches] = useState<PagePostMap>({}); // 列表/分页映射,用于缓存

  useEffect(() => {
    if (data) {
      // 更新分页索引
      afterCursorRef.current = data.publication.posts.pageInfo.endCursor;

      // 更新数据缓存
      const currentPosts = (data?.publication.posts.edges || []).map(
        (item) => item.node
      );
      setPageCaches((prev) => ({ ...prev, [pageNum]: currentPosts }));

      // 更新最大页数
      setMaxPageNum(Math.floor(data.publication.posts.totalDocuments / 5) + 1);
    }
  }, [data]);

  useEffect(() => {
    request();
  }, []);

  // 获取当前页码的列表数据
  const posts = useMemo(() => {
    return pageCaches[pageNum] || [];
  }, [pageCaches, pageNum]);

  const hasNextPage = pageNum < maxPageNum;

  // 页面切换，优先读取缓存
  const handleNextPage = (nextPage: number) => {
    setPageNum(nextPage);
    if (pageCaches[nextPage]) return;
    else {
      request({ variables: { id: USER_ID, after: afterCursorRef.current } });
    }
  };

  return (
    <div>
      {
        loading && <Loading />
      }
      <PostList data={posts} />
      {posts.length > 0 && (
        <Pagination
          maxPageNum={maxPageNum}
          pageNum={pageNum}
          hasNextPage={hasNextPage}
          onPageChange={handleNextPage}
        />
      )}
    </div>
  );
}
