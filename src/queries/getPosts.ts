/**
 * 获取文章列表
 * id:用户id
 * after分页查询的id
 * tagId：分类id
 */

import { gql } from "@apollo/client";

export const getPosts = gql`
query Posts($id:ObjectId,$after:String,$tagId:[ObjectId!]) {
  publication(id:$id) {
    posts(first: 5, after: $after, filter: { tags: $tagId }) {
      totalDocuments,
      pageInfo{
        hasNextPage,
        endCursor
      },
      edges{
        node{
          title,
          id,
          slug,
          title,
          content{
            markdown
          },
          series{
            slug,
            name,
            id,
            coverImage,
            description{
              text
            },
          },
         brief 
        }
      }
    }
  }
}
`;
