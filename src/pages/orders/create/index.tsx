import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  HStack,
  useRadioGroup,
  NumberInput,
  NumberInputField, AlertIcon, Alert,
} from "@chakra-ui/react";
import {useState} from "react";

import RadioCard from "../../../app/components/radioCard/RadioCard";
import axiosApi from "../../../app/utiles/axiosApi"; // Import axios or your preferred HTTP client

const CreateProductPage = () => {
  const initialFormData = {
    name: '',
    description: '',
    price: 1,
    status: "ACTIVE",
    quantity: 1,
    sku: '',
    serialNumber: '',
    imageUrl: '',
    categoryId: '64ebd95f355b39e2e2d95d53',
  }

  const [formData, setFormData] = useState(initialFormData);
  const [isSuccess, setIsSuccess] = useState(false);

  const onChangeCategory = (value: any) => {
    setFormData({...formData, ['categoryId']: value});
  }

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const categories: any[] = [
    {
      id: '64ebda78355b39e2e2d95d57',
      name: 'Watch'
    },
    {
      id: '64ebd95f355b39e2e2d95d53',
      name: 'SunGlass'
    }
  ]

  const {getRootProps, getRadioProps} = useRadioGroup({
    name: 'categoryId',
    defaultValue: formData.categoryId,
    onChange: onChangeCategory,
  })

  const group = getRootProps()

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axiosApi.post("/products", formData); // Replace with your API endpoint
      console.log("Product created:", response.data);
      setIsSuccess(true);
      setFormData(initialFormData); // Reset the form

      // Hide the success notification after 1 second (1000 milliseconds)
      setTimeout(() => {
        setIsSuccess(false);
      }, 1000*6);
      // Handle success, e.g., show a success message, reset the form, or redirect
    } catch (error: any) {
      console.error("Error creating product:", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <Container maxW='container.lg'>
      <Box p={4}>
        {isSuccess && (
          <Alert status="success" mt={4} mb={4}>
            <AlertIcon />
            Product added successfully!
          </Alert>
        )}
        <Heading>Add Product</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mt={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormControl>

          <SimpleGrid columns={2} spacing={2}>
            <FormControl mt={4}>
              <FormLabel>Quantity</FormLabel>
              <NumberInput
                name="quantity"
                value={formData.quantity}
                onChange={(valueString: any, valueNumber: any) => setFormData({...formData, quantity: valueNumber})}
                min={1}
                isRequired={true}
              >
                <NumberInputField/>
              </NumberInput>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <NumberInput
                name="price"
                value={formData.price}
                onChange={(valueString: any, valueNumber: any) => setFormData({...formData, price: valueNumber})}
                min={1}
                step={0.01}
                precision={2}
                isRequired={true}
              >
                <NumberInputField/>
              </NumberInput>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>SKU</FormLabel>
              <Input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>SL</FormLabel>
              <Input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                required
              />
            </FormControl>
          </SimpleGrid>

          <FormControl mt={4} display='none'>
            <FormLabel>Images</FormLabel>
            <Input type='file'
                   name='imageUrl'
                   placeholder='Upload image'
                   value={formData.imageUrl}
                   onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Category</FormLabel>
            <HStack {...group}>
              {categories.map((category: any) => {
                const radio = getRadioProps({value: category.id})
                return (
                  <RadioCard key={category.id} {...radio}>
                    {category.name}
                  </RadioCard>
                )
              })}
            </HStack>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" mt={4}>
            Add Product
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateProductPage;
