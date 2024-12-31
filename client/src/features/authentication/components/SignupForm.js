import React, { useEffect, useState } from "react";
import {
  Stack,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Text,
  Heading,
  useColorModeValue,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import rocket from "../../../assets/images/rocket.png";
import styles from "./LoginForm.module.css";
import Error from "../../../components/ui/Error";
import { getCitiesAction, getNeighborhoodsAction, signupAction } from "../authActions";
import { useDispatch } from "react-redux";
import { signup } from "../authSlice";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    neighborhood: "",
  });

  const [cities, setCities] = useState([]);
  const [neighborhoods, setNeighbohoods] = useState([]);

  useEffect(() => {
    const getCities = async () => {
      const res = await getCitiesAction();
      setCities(res.data);
    };
    getCities();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "city") {
      const res = await getNeighborhoodsAction({ cityId: value });
      setNeighbohoods(res.data);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      for (const key of Object.keys(formData))
        if (formData[key] === "") {
          setError(`${key} must have a value`);
          setIsLoading(false);
          return;
        }

      if (formData.password !== formData.confirmPassword) setError("Passwords doesn't match !");

      const res = await signupAction(formData);
      dispatch(signup(res.data.user));
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      navigate("/");

      setIsLoading(false);
    } catch (e) {
      setError(e.response?.data?.message);
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column" align="center" justify="start" width="100%">
      <Image w="150px" h="150px" src={rocket} className={styles.floating} />
      <Stack direction="column" position="relative" top="-25px" spacing={4} my={2} px={2}>
        <Heading textAlign="center" color={useColorModeValue("green.500", "green.300")} mt={4}>
          Signup
        </Heading>

        <SimpleGrid columns={2} spacing={10} mb={4}>
          <FormControl>
            <FormLabel>Firstname</FormLabel>
            <Input
              name="firstname"
              placeholder="firstname"
              variant="filled"
              value={formData.firstname}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Lastname</FormLabel>
            <Input
              name="lastname"
              placeholder="lastname"
              variant="filled"
              value={formData.lastname}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="email"
              variant="filled"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              variant="filled"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm password</FormLabel>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
              variant="filled"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>City</FormLabel>
            <Select
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Your city ?"
            >
              {cities.map((city) => (
                <option value={city._id}>{city.cityName}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Neighborhood</FormLabel>
            <Select
              placeholder="Your neighborhood ?"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
            >
              {neighborhoods.map((neighborhood) => (
                <option value={neighborhood._id}>{neighborhood.neighborhoodName}</option>
              ))}
            </Select>
          </FormControl>
        </SimpleGrid>

        <Button colorScheme="green" onClick={handleSubmit} isLoading={isLoading}>
          Signup
        </Button>
        <Text fontSize="sm">
          Your already have an account ?{" "}
          <Link to="/login">
            <Button variant="link" alignSelf="start" size="sm" colorScheme="green">
              Login
            </Button>
          </Link>
        </Text>
        {error && <Error message={error} />}
      </Stack>
    </Flex>
  );
};

export default SignupForm;
