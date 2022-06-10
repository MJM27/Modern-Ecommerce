import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
  useAdmin,
  useProductsActions,
  useTypedSelector,
  useUserActions,
} from '../../hooks';
import { ProductInterface, UserEditCredentials } from '../../interfaces';
import FormContainer from '../FormContainer';
import Loader from '../Loader';
import Message from '../Message';

interface ProductsEditProps {
  pageId: string | string[] | undefined;
}

const ProductsEdit: React.FC<ProductsEditProps> = ({ pageId }) => {
  useAdmin();

  const initialProduct = {
    name: '',
    price: 0,
    image: '',
    brand: '',
    category: '',
    numReviews: 0,
    countInStock: 0,
    description: '',
  };

  const { data, loading, error } = useTypedSelector(state => state.product);

  const { fetchProduct, updateProduct } = useProductsActions();

  const [productDetails, setDetails] =
    useState<Partial<ProductInterface>>(initialProduct);

  useEffect(() => {
    fetchProduct(pageId as string);
  }, [fetchProduct, pageId]);

  useEffect(() => {
    if (data) {
      setDetails({
        name: data.name,
        brand: data.brand,
        category: data.category,
        price: data.price,
        countInStock: data.countInStock,
        description: data.description,
        image: data.image,
      });
    }
  }, [data]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateProduct(pageId as string, productDetails);
  };

  return (
    <>
      <Link href="/admin/products" passHref>
        <Button className="btn btn-light my-3">Go Back</Button>
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={onSubmitHandler}>
            <Form.Group controlId="name" className="py-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={productDetails.name}
                onChange={e =>
                  setDetails({ ...productDetails, name: e.target.value })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price" className="py-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={productDetails.price}
                onChange={e =>
                  setDetails({
                    ...productDetails,
                    price: parseInt(e.target.value),
                  })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="py-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={productDetails.image}
                onChange={e =>
                  setDetails({ ...productDetails, image: e.target.value })
                }
              ></Form.Control>
              {/* <Form.File
                id="image-file"
                label="Choose File"
                custom
                // onChange={uploadFileHandler}
              ></Form.File> */}
              {/* {uploading && <Loader />} */}
            </Form.Group>

            <Form.Group controlId="brand" className="py-2">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={productDetails.brand}
                onChange={e =>
                  setDetails({ ...productDetails, brand: e.target.value })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock" className="py-2">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={productDetails.countInStock}
                onChange={e =>
                  setDetails({
                    ...productDetails,
                    countInStock: parseInt(e.target.value),
                  })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="py-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={productDetails.category}
                onChange={e =>
                  setDetails({ ...productDetails, category: e.target.value })
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="py-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={productDetails.description}
                onChange={e =>
                  setDetails({ ...productDetails, description: e.target.value })
                }
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductsEdit;