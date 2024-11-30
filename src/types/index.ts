export interface QueryPostsResult {
  publication: {
    posts: {
      edges: PostItem[];
      pageInfo: {
        endCursor: string;
        hasNextPage: boolean;
      };
      totalDocuments: number;
    };
  };
}

export interface QuerySeriesResult {
  publication: {
    seriesList: {
      edges: PostItem[];
      pageInfo: {
        endCursor: string;
        hasNextPage: boolean;
      };
      totalDocuments: number;
    };
  };
}

export interface QueryPostDetailResult {
  publication: {
    post:PostItem["node"]
  };
}


export interface PostItem {
  node: {
    brief: string;
    id: string;
    series: {
      id: string;
      coverImage: string;
      description: { text: string };
      slug: string;
      name: string;
    };

    slug: string;
    title: string;
    content: {
      markdown: string;
    };
  };
}
