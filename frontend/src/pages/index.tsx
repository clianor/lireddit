import { GetStaticProps } from "next";
import NextLink from "next/link";
import { Link, Stack, Box, Heading, Text, Flex, Button } from "@chakra-ui/core";
import { initializeApollo } from "../../lib/apolloClient";
import { PostsDocument, usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";

const limit = 15;

const Index = ({ data }: any) => {
  const { data: results, loading, fetchMore } = usePostsQuery({
    variables: {
      limit,
      cursor: null,
    },
  });

  const handleClick = () => {
    if (results?.posts.hasMore) {
      fetchMore({
        variables: {
          limit,
          cursor: results.posts.posts[results.posts.posts.length - 1].createdAt,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return Object.assign({}, prev, {
            posts: {
              hasMore: fetchMoreResult.posts.hasMore,
              posts: [...prev.posts.posts, ...fetchMoreResult.posts.posts],
            },
          });
        },
      });
    }
  };

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
        {results?.posts &&
          results.posts.posts.map((p: any) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text>posted by {p.creator.username}</Text>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))}
      </Stack>
      {data.posts ? (
        <Flex>
          <Button onClick={handleClick} isLoading={loading} m="auto" my={8}>
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: PostsDocument,
    variables: {
      limit,
      cursor: null as null | string | undefined,
    },
  });

  console.dir(
    await apolloClient.query({
      query: PostsDocument,
      variables: {
        limit,
        cursor: null as null | string | undefined,
      },
    })
  );

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      data: data,
    },
  };
};

export default Index;
