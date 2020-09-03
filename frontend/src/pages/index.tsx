import { GetStaticProps } from "next";
import { initializeApollo } from "../../lib/apolloClient";
import { PostsDocument } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Link, Stack, Box, Heading, Text, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";

const Index = ({ posts, loading }: any) => {
  return (
    <Layout>
      <Flex align="center">
        <Heading>LiReddit</Heading>
        <NextLink href="/post/create">
          <Link ml="auto">create post</Link>
        </NextLink>
      </Flex>

      <br />
      <Stack spacing={8}>
        {posts.map((p: any) => (
          <Box key={p.id} p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{p.title}</Heading>
            <Text mt={4}>{p.textSnippet}</Text>
          </Box>
        ))}
      </Stack>
      {posts ? (
        <Flex>
          <Button isLoading={loading} m="auto" my={8}>
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  const { data, loading } = await apolloClient.query({
    query: PostsDocument,
    variables: {
      limit: 10,
    },
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      posts: data.posts,
      loading,
    },
  };
};

export default Index;
