import React from "react";
import {Formik, Form} from "formik";
import {Box, Button, Flex, Link} from "@chakra-ui/core";
import {Wrapper} from "../../components/Wrapper";
import {InputField} from "../../components/InputField";
import {useLoginMutation} from "../../generated/graphql";
import {useRouter} from "next/router";
import {toErrorMap} from "../../utils/toErrorMap";
import {NavBar} from "../../components/NavBar";
import {useApolloClient} from "@apollo/client";
import NextLink from "next/link";

interface loginProps {
}

const Login: React.FC<loginProps> = ({}) => {
  const client = useApolloClient()
  const router = useRouter();
  const [login, ] = useLoginMutation();

  return (
    <>
      <NavBar/>
      <Wrapper variant="small">
        <Formik
          initialValues={{usernameOrEmail: "", password: ""}}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({
              variables: {
                ...values
              }
            })
              .then(async (response) => {
                await client.resetStore();
                return response;
              });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else {
              await router.push("/");
            }
          }}
        >
          {({isSubmitting}) => (
            <Form>
              <InputField
                name="usernameOrEmail"
                placeholder="username or email"
                label="Username Or Email"
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Flex mt={2}>
                <NextLink href="/auth/forgot-password">
                  <Link ml="auto">forgot password?</Link>
                </NextLink>
              </Flex>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                login
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default Login;