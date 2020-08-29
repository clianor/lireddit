import React from "react";
import {Formik, Form} from "formik";
import {
  Box,
  Button,
} from "@chakra-ui/core";
import {Wrapper} from "../../components/Wrapper";
import {InputField} from "../../components/InputField";
import {useLoginMutation} from "../../generated/graphql";
import {useRouter} from "next/router";
import {toErrorMap} from "../../utils/toErrorMap";

interface loginProps {
}

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [login, ] = useLoginMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{username: "", password: ""}}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({
            variables: {
              options: values
            }
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
              login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;