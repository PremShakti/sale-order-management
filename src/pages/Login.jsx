import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    if (values.username === "admin" && values.password === "password") {
      localStorage.setItem("authenticated", "true");
      navigate("/orders");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Center height="100vh">
      <Box width="300px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              {...register("username", { required: "Username is required" })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button type="submit" mt={4} colorScheme="teal">
            Login
          </Button>
        </form>
      </Box>
    </Center>
  );
};

export default Login;
