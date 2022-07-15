import React from "react";
import { useState } from "react";
import axios from "axios";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as yup from "yup";
import Alert from "@mui/material/Alert";
import {
  Grid,
  Avatar,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

//validation schema
const schema = yup.object().shape({
  name: yup.string().required("Please Enter your name"),
  phoneno: yup
    .number("Please enter digits only")
    .required("Please Enter your Phone no")
    .positive("Please enter Positiv digits only")
    .integer("Enter Integer only"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Please Enter your Email"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Provide confirm password"),
});

//handle change

const paperStyle = { padding: "30px 20px", width: 400, margin: "50px auto" };
const headerStyle = { margin: 0 };
const avatarStyle = { backgroundColor: "#1877f2" };

const Signup = () => {
  const [response, setResponse] = useState(null);

  return (
    <Grid align="center">
      <Paper elevation={10} style={paperStyle}>
        <Grid>
          <Avatar style={avatarStyle}>
            <AccountCircleIcon></AccountCircleIcon>
          </Avatar>
          <h2 style={headerStyle}> Sign UP</h2>
          <Typography variant="caption">Create an Account</Typography>
        </Grid>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phoneno: "",
            password: "",
            confirmpassword: "",
          }}
          validationSchema={schema}
          onSubmit={(user) => {
            setResponse(null);
            axios
              .post("http://localhost:3001/Signup", user)
              .then((res) => {
                console.log(res.data);
                setResponse("Account created successfully!");
              })
              .catch((res) => {
                console.log(res.response.data.message);
                setResponse(res.response.data.message);
              });
          }}
        >
          {({ errors, touched, handleBlur }) => (
            <Form>
              <Grid container direction={"column"} spacing={3}>
                <Grid item>
                  <Field
                    as={TextField}
                    label="Name"
                    name="name"
                    onBlur={handleBlur}
                    helperText={touched.name ? errors.name : ""}
                    error={touched.name && Boolean(errors.name)}
                    placeholder="Enter your name"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Email"
                    name="email"
                    onBlur={handleBlur}
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && Boolean(errors.email)}
                    placeholder="Enter your email"
                  />
                </Grid>
                <Grid item>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Phone no"
                    name="phoneno"
                    onBlur={handleBlur}
                    helperText={touched.phoneno ? errors.phoneno : ""}
                    error={touched.phoneno && Boolean(errors.phoneno)}
                    placeholder="Enter your Phone no"
                  />
                </Grid>
                <Grid item>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
                    placeholder="Enter your Password"
                  />
                </Grid>
                <Grid item>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Confirm Password"
                    name="confirmpassword"
                    onBlur={handleBlur}
                    helperText={
                      touched.confirmpassword ? errors.confirmpassword : ""
                    }
                    error={
                      touched.confirmpassword && Boolean(errors.confirmpassword)
                    }
                    placeholder="Enter your Confirm Password"
                  />
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <Paper>
          {response && (
            <Alert
              elevation={1}
              sx={{
                mt: 2,
              }}
              severity={
                response === "Account created successfully!"
                  ? "success"
                  : "error"
              }
            >
              {response}
            </Alert>
          )}
        </Paper>
      </Paper>
    </Grid>
  );
};
export default Signup;
