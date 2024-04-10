/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import classes from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Login
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        {showPassword && (
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
          />
        )}

        <Button fullWidth mt="xl" onClick={() => navigate("/")}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
