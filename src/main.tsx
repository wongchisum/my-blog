import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./global.less";
import { Layout } from "./components";
import { Home, Posts,Post,Talks,Search } from "./pages";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://gql.hashnode.com",
  cache: new InMemoryCache(),
  //link:
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="talks/" element={<Talks />} />
          <Route path="posts/:id/" element={<Posts />} />
          <Route path="post/:id/" element={<Post />} />
          <Route path="search/" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
