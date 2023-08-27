import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Box,
  Heading,
  Text,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button, RadioGroup, Stack, Radio, HStack
} from '@chakra-ui/react';
import axiosApi from "src/app/utiles/axiosApi";

const ProductCategoryUpdate = () => {
  const router = useRouter();
  const toast = useToast(); // Initialize useToast
  const { id } = router.query; // Get the id parameter from the URL
  const formInitialValues = {
    name: '',
    status: 'ACTIVE',
    parentID: null,
    description: '',
    imageUrl: null,
  }
  const [formData, setFormData] = useState(formInitialValues);
  const [productCategory, setProductCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch product details using axios
      axiosApi.get(`/categories/${id}`)
        .then((response) => {
          const category = response.data
          setProductCategory(response.data)
          setFormData((prevData) => ({
            ...prevData,
            name: category.name,
            description: category.description,
            status: category.status,
            imageUrl: category.imageUrl,
            parentID: category.parentID,
          }));
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const categories = []
  const handleChange = (e) => {
    console.log(e)
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onStatusChange = (status) => {
    setFormData((prevData) => ({
      ...prevData,
      status: status,
    }));
  };

  const handleSubmit = async (e) => {
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
      router.push('/product-categories')
    } catch (error) {
      console.error('Error creating category:', error);
      // Handle error or show error message
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <Container maxWidth="xl">
      <Box p={4}>

        {productCategory ? (
          <>
            <Heading marginBottom={2}>Update Product Category</Heading>

            <form onSubmit={handleSubmit}>
              <FormControl marginBottom={2}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl marginBottom={2}>
                <FormLabel>Status</FormLabel>
                <RadioGroup name="status" value={formData.status} onChange={onStatusChange}>
                  <HStack spacing={4}>
                    <Radio value="ACTIVE">Active</Radio>
                    <Radio value="INACTIVE">Inactive</Radio>
                  </HStack>
                </RadioGroup>
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
              <FormControl marginBottom={2} >
                <FormLabel>Description</FormLabel>
                <Textarea
                  type="text"
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
                update
              </Button>
            </form>
          </>
        ) : (
          <Text>No product category found.</Text>
        )}
      </Box>
    </Container>
  );
};

export default ProductCategoryUpdate;
