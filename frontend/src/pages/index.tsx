import { GetStaticProps } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import { PostsDocument, usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Link } from "@chakra-ui/core";
import NextLink from "next/link";

const Index = () => {
  const { data } = usePostsQuery();

  return (
    <Layout>
      <NextLink href="/post/create">
        <Link>create post</Link>
      </NextLink>
      <br />
      {data.posts.map((p) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </Layout>
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
  };
};

export default Index;
