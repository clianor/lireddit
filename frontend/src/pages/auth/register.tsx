import React from "react";
import { Formik, Form } from "formik";
import { Box, Button } from "@chakra-ui/core";
import { Wrapper } from "../../components/Wrapper";
import { InputField } from "../../components/InputField";
import { useRegisterMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { toErrorMap } from "../../utils/toErrorMap";
import { useApolloClient } from "@apollo/client";
import { NavBar } from "../../components/NavBar";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const client = useApolloClient();
  const router = useRouter();
  const [register] = useRegisterMutation();

  return (
    <>
      <NavBar />
      <Wrapper variant="small">
        <Formik
          initialValues={{ email: "", username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({
              variables: {
                options: values,
              },
            }).then(async (response) => {
              await client.resetStore();
              return response;
            });
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else {
              await router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mt={4}>
                <InputField name="email" placeholder="email" label="Email" />
              </Box>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default Register;
