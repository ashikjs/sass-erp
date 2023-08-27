import React, {useState} from 'react';
import {Container, Box, Heading, FormControl, FormLabel, Input, Button, Textarea, Select} from '@chakra-ui/react';
import axiosApi from "src/app/utiles/axiosApi";

const CreateProductCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    status: 'ACTIVE',
    parentID: null,
    description: '',
    imageUrl: '',
  });

  const categories = []
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosApi.post('/product-categories', formData);
      console.log('Category created:', response.data);
      // Redirect or show success message
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
          <FormControl>
            <FormLabel>Parent Category</FormLabel>
            <Select
              name="parentID"
              value={formData.parentID || ''}
              onChange={handleChange}
            >
              <option value="">Select a parent category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image URL</FormLabel>
            <Input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" mt={4}>
            Create
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateProductCategory;
