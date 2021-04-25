import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, TextField, Container } from '@material-ui/core';
import api from '../api'

export function ProductAdd() {

  let emptyProduct = {
    type: '',
    name: '',
    picture: 'pic',
    price: 0
  };

  const [product, setProduct] = useState(emptyProduct);

  function handleChange(event) {
    let { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    })
  }

  function handleSubmit() {
    api.insertProduct(product);
  }

  return <div>
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField label="type" type="text" name="type" id="Type" value={product.type || ''}
          onChange={handleChange} />
        <TextField label="name" type="text" name="name" id="Name" value={product.name || ''}
          onChange={handleChange} />
        <TextField label="picture" type="text" name="picture" id="Picture" value={product.picture || ''}
          onChange={handleChange} />
        <TextField label="price" type="number" name="price" id="Price" value={product.price || 0}
          onChange={handleChange} />
        <Button color="primary" type="submit">Save</Button>{' '}
        <Button color="secondary" tag={Link} to="/products">Cancel</Button>
      </form>
    </Container>
  </div>
}
// }

export default withRouter(ProductAdd);