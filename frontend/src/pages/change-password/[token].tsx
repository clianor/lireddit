import React from "react";
import {NextPage} from "next";
import {Wrapper} from "../../components/Wrapper";
import {Formik, Form} from "formik";
import {Login} from "../auth/login";
import {toErrorMap} from "../../utils/toErrorMap";
import {InputField} from "../../components/InputField";
import {Button} from "@chakra-ui/core/dist";

const ChangePassword: NextPage<{token: string}> = ({token}) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(token);
          console.log(values, setErrors);
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              type="password"
            />
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  }
}

export default ChangePassword;