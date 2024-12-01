import { Input, Loading } from "@/components";
import { USER_ID } from "@/constants";
import { getPostsByTitle } from "@/queries";
import { useLazyQuery } from "@apollo/client";
import { useRef, useState, useEffect, useMemo } from "react";
import type { PostListProps } from "@/components";
import { PostList, Pagination } from "@/components";
import type { QueryPostsByTitleResult } from "@/types";

interface PagePostMap {
  [page: number]: PostListProps["data"];
}

export function Search() {
  const [request, { data, loading }] =
    useLazyQuery<QueryPostsByTitleResult>(getPostsByTitle);
  const afterCursorRef = useRef("");
  const [pageNum, setPageNum] = useState(1); // 页码
  const [pageCaches, setPageCaches] = useState<PagePostMap>({}); // 列表/分页映射,用于缓存
  const queryRef = useRef("");

  useEffect(() => {
    if (data) {
      // 更新分页索引
      afterCursorRef.current = data.searchPostsOfPublication.pageInfo.endCursor;

      // 更新数据缓存
      const currentPosts = (data?.searchPostsOfPublication.edges || []).map(
        (item) => item.node
      );
      setPageCaches((prev) => ({ ...prev, [pageNum]: currentPosts }));
    }
  }, [data]);

  const handleSearch = (text: string) => {
    queryRef.current = text;
    request({
      variables: {
        id: USER_ID,
        after: afterCursorRef.current,
        query: queryRef.current,
      },
    });
  };

  // 页面切换，优先读取缓存
  const handleNextPage = (nextPage: number) => {
    setPageNum(nextPage);
    if (pageCaches[nextPage]) return;
    else {
      request({
        variables: {
          id: USER_ID,
          after: afterCursorRef.current,
          query: queryRef.current,
        },
      });
    }
  };

  // 获取当前页码的列表数据
  const posts = useMemo(() => {
    return pageCaches[pageNum] || [];
  }, [pageCaches, pageNum]);

  const hasNextPage = data?.searchPostsOfPublication.pageInfo.hasNextPage;

  // 搜索关键词变动，重置状态
  useEffect(() => {
    afterCursorRef.current = "";
    setPageCaches({});
    setPageNum(1);
  }, [queryRef.current]);

  return (
    <div>
      <Input disabled={loading} onSearch={handleSearch} />
      {loading && <Loading />}
      <PostList data={posts} />
      {posts.length > 0 && (
        <Pagination
          pageNum={pageNum}
          hasNextPage={hasNextPage}
          onPageChange={handleNextPage}
        />
      )}
    </div>
  );
}
