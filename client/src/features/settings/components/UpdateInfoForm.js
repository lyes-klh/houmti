import React, { useState } from 'react';
import Error from '../../../components/ui/Error';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Button,
  Icon,
  Avatar,
  Select,
} from '@chakra-ui/react';
import { FiEdit, FiEdit2 } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import {
  getAllCities,
  getAllNeiborhoods,
  updateUser,
} from '../settingsActions';
import { useDispatch } from 'react-redux';
import { login } from '../../authentication/authSlice';
import { useNavigate } from 'react-router-dom';

const UpdateInfoForm = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [firstname, setFirstname] = useState(currentUser.firstname);
  const [lastname, setLastname] = useState(currentUser.lastname);
  const [email] = useState(currentUser.email);
  const [city, setCity] = useState(currentUser.city._id);
  const [neighborhood, setNeighborhood] = useState(
    currentUser.neighborhood._id
  );

  const [cities, setCities] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);

  const fetchCities = async (e) => {
    const res = await getAllCities();
    setCities(res.data);
  };

  const fetchNeighborhoods = async (e) => {
    const res = await getAllNeiborhoods(city);
    setNeighborhoods(res.data);
  };

  const handleChangeCity = (e) => {
    setCity(e.target.value);
    setNeighborhoods([]);
    setNeighborhood(null);
  };

  const handleChangeNeighborhood = (e) => {
    setNeighborhood(e.target.value);
  };

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    try {
      setIsLoading(true);
      if (!firstname || !lastname || !city || !neighborhood) {
        setError('Please enter all the fields');
      }
      const res = await updateUser({
        firstname,
        lastname,
        city,
        neighborhood,
      });

      dispatch(login(res.data.user));
      localStorage.setItem('currentUser', JSON.stringify(res.data.user));
      setIsLoading(false);
      navigate(`/profile/${currentUser._id}`);
    } catch (e) {
      setError(e.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <Box
      ml={8}
      display='flex'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
    >
      <Box position='relative' mb={6}>
        <Avatar
          size='2xl'
          name={currentUser.firstname + ' ' + currentUser.lastname}
          src={
            process.env.REACT_APP_BACKEND + '/img/users/' + currentUser.avatar
          }
        />
        <Box
          borderRadius='full'
          bg='green.700'
          w={8}
          h={8}
          color='white'
          display='flex'
          alignItems='center'
          justifyContent='center'
          position='absolute'
          bottom={-2}
          right={4}
          cursor='pointer'
        >
          <Icon as={FiEdit2} />
        </Box>
      </Box>

      <SimpleGrid mb={8} columns={2} spacingX={8} spacingY={4}>
        <FormControl>
          <FormLabel>Firstname</FormLabel>
          <Input
            type='text'
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Lastname</FormLabel>
          <Input
            type='text'
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type='email' value={email} isDisabled />
        </FormControl>
        <FormControl>
          <FormLabel>City</FormLabel>
          <Select
            onClick={fetchCities}
            defaultValue={city}
            onChange={handleChangeCity}
          >
            {cities.length !== 0 ? (
              cities.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.cityName}
                </option>
              ))
            ) : (
              <option value={currentUser.city._id}>
                {currentUser.city.cityName}
              </option>
            )}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Neighborhood</FormLabel>
          <Select
            defaultValue={neighborhood}
            onChange={handleChangeNeighborhood}
            onClick={fetchNeighborhoods}
            placeholder='Select neighborhood'
          >
            {neighborhoods.length !== 0 &&
              neighborhoods.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.neighborhoodName}
                </option>
              ))}
            {city === currentUser.city._id && (
              <option value={currentUser.neighborhood._id}>
                {currentUser.neighborhood.neighborhoodName}
              </option>
            )}
          </Select>
        </FormControl>
      </SimpleGrid>
      <Button
        leftIcon={<Icon as={FiEdit} />}
        colorScheme='green'
        w={32}
        onClick={handleUpdate}
        isLoading={isLoading}
        mb={4}
      >
        Update
      </Button>
      {error && <Error message={error} />}
    </Box>
  );
};

export default UpdateInfoForm;
