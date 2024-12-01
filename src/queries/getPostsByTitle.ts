// 根据关键词搜索

import { gql } from "@apollo/client";

export const getPostsByTitle = gql`
query Posts($id: ObjectId!, $after: String, $query: String) {
  searchPostsOfPublication(
    first: 5
    after: $after
    filter: {publicationId: $id, query: $query}
  ) {
    pageInfo{
      endCursor,
      hasNextPage
    },
    edges {
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
`;