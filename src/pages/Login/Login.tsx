/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useLogin } from "../../hooks/useLogin";
import { emailExists } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useSetPassword } from "../../hooks/useSetPassword";

const Login = () => {
  const [email, setEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [count, setCount] = useState<number>(0);

  const [showCreatePassword, setShowCreatePassword] = useState(false);

  const { login, isPending } = useLogin();
  const { passwordSet } = useSetPassword();

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Login
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {showPassword && (
          <PasswordInput
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            mt="md"
          />
        )}

        {showCreatePassword && (
          <>
            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              mt="md"
            />
            {/* <Space h="xs" /> */}
            <PasswordInput
              label="Confirm Password"
              placeholder="Your password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              mt="md"
            />
          </>
        )}

        <Button
          fullWidth
          mt="xl"
          onClick={async (e) => {
            e.preventDefault();

            try {
              setIsCheckingEmail(true);
              const res = await emailExists(email);

              console.log(res);

              if (res?.statusCode === 200) {
                setIsCheckingEmail(false);
                setShowPassword(true);
                if (email && password) {
                  login(
                    { email, password },
                    {
                      onSettled: () => {
                        setEmail("");
                        setPassword("");
                      },
                    }
                  );
                }
              } else if (res?.statusCode === 204) {
                setIsCheckingEmail(false);
                setCount((prevCount) => prevCount + 1);
                if (count < 1) {
                  toast.success("Create your password");
                }
                setShowCreatePassword(true);
                if (email && newPassword && confirmNewPassword) {
                  passwordSet(
                    {
                      email,
                      confirmPassword: confirmNewPassword,
                      newPassword,
                    },
                    {
                      onSettled: () => {
                        // toast.success("Password created successfully");
                        setShowCreatePassword(false);
                        setEmail("");
                        setConfirmNewPassword("");
                        setNewPassword("");
                      },
                    }
                  );

                  // window.location.reload();
                }
              } else if (res?.statusCode === 404) {
                toast.error("User doesn't exist!");
              } else {
                toast.error("An unexpected error occurred.");
              }
            } catch (error: any) {
              // Handle the AxiosError
              if (error.response && error.response.status === 400) {
                // Handle 400 Bad Request error
                toast.error("Email does not exist");
              } else {
                // Handle other errors
                console.error("An unexpected error occurred:", error);
                toast.error(
                  "An unexpected error occurred. Please try again later."
                );
              }
            }
          }}
          loading={isPending || isCheckingEmail}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
