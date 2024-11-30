// query Posts($id: ObjectId) {
//     publication(id: $id) {
//     post(slug:"5om5ye65pya6zw55qe56we5awh5pww5yix") {
//       title
//     }
//   }
//   }

/**
 * 获取文章
 * id:用户id
 * after分页查询的id
 */

import { gql } from "@apollo/client";

export const getPostDetail = gql`
query Posts($id:ObjectId,$postId:String!) {
  publication(id:$id) {
    post(slug: $postId) {
      title
      tags {
        name
        slug
        id
      }
      updatedAt
      author {
        username
      }
      content {
        markdown
      }
    }
  }
}
`;
