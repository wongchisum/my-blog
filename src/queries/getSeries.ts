/**
 * 根据分页获取文章分类
 * id:用户id
 */

import { gql } from "@apollo/client";

export const getSeries = gql`
  query Posts($id: ObjectId) {
    publication(id: $id) {
      seriesList(first: 10) {
        totalDocuments
        edges {
          node {
            name
            id
            slug,
            posts(first:1){
              edges{
                node{
                  tags{
                    name,
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
