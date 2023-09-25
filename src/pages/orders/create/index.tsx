import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";
import {useCallback, useEffect, useState} from "react";
import axiosApi from "../../../app/utiles/axiosApi";
import {DeleteIcon} from "@chakra-ui/icons";

import AutoCompleteComponent from "src/app/components/autoComplete/AutoComplete";

const CreateProductPage = () => {
  const initialFormData = {
    name: '',
    description: '',
    price: '',
    status: "ACTIVE",
    phoneNumber: '',
    products: []
  }

  const [formData, setFormData] = useState(initialFormData);
  const [isSuccess, setIsSuccess] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const onChangeProduct = (ides: string[]) => {
    let sProducts: any[] = []
    ides.map((id: string) => {
      sProducts.push(products.find((p: any) => p._id == id))
    })
    setSelectedProducts(sProducts)
  };
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axiosApi.get(`/products?page=0&pageSize=1000`);
      setProducts(response.data?.datas);
      console.log('products::', response.data?.datas)
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, [setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
      }, 1000 * 6);
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
            <AlertIcon/>
            Product added successfully!
          </Alert>
        )}
        <Heading>Create Order</Heading>
        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={2} spacing={2}>
            <FormControl mt={4}>
              <FormLabel>Customer Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Phone Number</FormLabel>
              <NumberInput
                name="quantity"
                value={formData.phoneNumber}
                onChange={(valueString: any, valueNumber: any) => setFormData({...formData, phoneNumber: valueNumber})}
                min={1}
                isRequired={true}
              >
                <NumberInputField/>
              </NumberInput>
            </FormControl>
          </SimpleGrid>
          <SimpleGrid columns={2} spacing={2}>
            <FormControl mt={4}>
              <FormLabel>Products</FormLabel>
              <AutoCompleteComponent
                products={products}
                onChangeProduct={onChangeProduct}
                placeholder="Search and select"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Total Price</FormLabel>
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
          </SimpleGrid>

          {
            selectedProducts && selectedProducts.map((product: any, index: number) => (
              <SimpleGrid columns={2} spacing={2} key={index}>
                <FormControl mt={4}>
                  <p>{product.name}</p>
                </FormControl>
                <FormControl mt={4}>
                  <HStack maxW='100%'>
                    <p><b>Quantity: </b></p>
                    <NumberInput
                      name="quantity"
                      placeholder="Quantity"
                      value={1}
                      onChange={(valueString: any, valueNumber: any) => setFormData({
                        ...formData,
                        quantity: valueNumber
                      })}
                      min={1}
                      isRequired={true}
                    >
                      <NumberInputField/>
                    </NumberInput>
                  </HStack>
                </FormControl>
                {/*<FormControl mt={4}>*/}
                {/*  <Button rightIcon={<DeleteIcon/>} colorScheme='red' variant='outline'/>*/}
                {/*</FormControl>*/}
              </SimpleGrid>
            ))
          }

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
