import { useRouter } from "next/router";
import { useIsAuth } from "../../utils/useIsAuth";
import { useCreatePostMutation } from "../../generated/graphql";
import { Layout } from "../../components/Layout";
import { Formik, Form } from "formik";
import { InputField } from "../../components/InputField";
import { Box, Button } from "@chakra-ui/core";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          await createPost({
            variables: { input: values },
          }).then(() => {
            router.push("/");
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Body"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreatePost;
