import { GetStaticProps } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import { PostsDocument } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Link } from "@chakra-ui/core";
import NextLink from "next/link";

const Index = ({ posts }: any) => {
  return (
    <Layout>
      <NextLink href="/post/create">
        <Link>create post</Link>
      </NextLink>
      <br />
      {posts.map((p: any) => (
        <div key={p.id}>{p.title}</div>
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: PostsDocument,
    variables: {
      limit: 10,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      posts: data.posts,
    },
  };
};

export default Index;
