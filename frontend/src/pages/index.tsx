import {GetStaticProps} from "next";
import {initializeApollo} from "../../lib/apolloClient";
import {PostsDocument, usePostsQuery} from "../generated/graphql";

import {NavBar} from "../components/NavBar";

const Index = () => {
  const { data } = usePostsQuery();

  return (
    <>
      <NavBar/>
      <div>test</div>
      <br/>
      {data.posts.map((p) => <div key={p.id}>{p.title}</div>)}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: PostsDocument,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index;