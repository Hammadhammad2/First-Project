import React from "react";
import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import Alert from "@mui/material/Alert";
import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, Navigate, useNavigate } from "react-router-dom";

const paperStyle = { padding: "30px 20px", width: 400, margin: "50px auto" };
const headerStyle = { margin: 0 };
const avatarStyle = { backgroundColor: "#1877f2" };

//validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Please Enter your Email"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const Login = () => {
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  return (
    <Grid align="center">
      <Paper elevation={10} style={paperStyle}>
        <Avatar style={avatarStyle}>
          <AccountCircleIcon></AccountCircleIcon>
        </Avatar>
        <h2 style={headerStyle}> Sign In</h2>
        <Typography variant="caption">Sign In to your Account</Typography>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={schema}
          onSubmit={(user) => {
            axios
              .post("http://localhost:3001/Login", user)
              .then((res) => {
                // setResponse("Logged In Successfully!");
                localStorage.setItem("profile", JSON.stringify(res.data));
                window.location.replace("/City");
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
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
                    placeholder="Enter your Password"
                  />
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <Divider sx={{ margin: "15px" }} orientation="horizontal">
          OR
        </Divider>
        <Button
          component={Link}
          to="/Signup"
          variant="contained"
          color="primary"
          fullWidth
        >
          Sign up
        </Button>
        <Paper>
          {response && (
            <Alert
              elevation={1}
              sx={{
                mt: 2,
              }}
              severity={
                response === "Logged In Successfully!" ? "success" : "error"
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

export default Login;
