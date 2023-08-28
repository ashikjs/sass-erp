import React, {useState} from 'react';
import {
  Container,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Select,
  useToast
} from '@chakra-ui/react';
import axiosApi from "./../../app/utiles/axiosApi";

const CreateProductCategory = () => {
  const toast = useToast(); // Initialize useToast

  const formInitialValues = {
    name: '',
    status: 'ACTIVE',
    parentID: null,
    description: '',
    imageUrl: null,
  }
  const [formData, setFormData] = useState(formInitialValues);

  const categories = []
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('handleSubmit', formData)
    try {
      const response = await axiosApi.post('/categories', formData);
      // Show success toast notification
      toast({
        title: 'Category Created',
        description: 'The product category has been created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      // Reset the form
      setFormData(formInitialValues);
    } catch (error) {
      console.error('Error creating category:', error);
      // Handle error or show error message
    }
  };

  return (
    <Container maxWidth="xl">
      <Box p={4}>
        <Heading marginBottom={2}>Create Product Category</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormControl>
          {/*<FormControl>*/}
          {/*  <FormLabel>Parent Category</FormLabel>*/}
          {/*  <Select*/}
          {/*    name="parentID"*/}
          {/*    value={formData.parentID || ''}*/}
          {/*    onChange={handleChange}*/}
          {/*  >*/}
          {/*    <option value="">Select a parent category</option>*/}
          {/*    {categories?.map((category) => (*/}
          {/*      <option key={category.id} value={category.id}>*/}
          {/*        {category.name}*/}
          {/*      </option>*/}
          {/*    ))}*/}
          {/*  </Select>*/}
          {/*</FormControl>*/}
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormControl>
          {/*<FormControl>*/}
          {/*  <FormLabel>Image URL</FormLabel>*/}
          {/*  <Input*/}
          {/*    type="url"*/}
          {/*    name="imageUrl"*/}
          {/*    value={formData.imageUrl}*/}
          {/*    onChange={handleChange}*/}
          {/*  />*/}
          {/*</FormControl>*/}
          <Button type="submit" colorScheme="blue" mt={4}>
            Create
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateProductCategory;
