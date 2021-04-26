import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, ButtonGroup, Container, TextField } from '@material-ui/core';
import api from '../api'

let rows = [
]
const columns = [
    { field: 'type', headerName: 'type', width: 150 },
    { field: 'name', headerName: 'name', width: 150 },
    { field: 'picture', headerName: 'picture', width: 150 },
    { field: 'price', headerName: 'price', width: 150 },
];

export function ProductList(props) {
    const [selection, setSelection] = useState([]);
    const [products, setProducts] = useState([0]);
    const [edit, setEdit] = useState([]);

    const changeProduct = async () => {
        await api.getProductById(selection).then(prod => {
            setEdit(prod.data);
        })

    }
    // TODO: update products
    const EditProduct = async () => {
        await api.updateProductById(edit._id, edit);
        load();
    }

    const handleInputChange = async (event) => {
        const { name, value } = event.target;
        setEdit({
            ...edit,
            [name]: value,
        })
    };

    const DeleteProduct = async () => {
        if (window.confirm(`Do you want to delete the product ${selection} permanently`)) {
            await api.deleteProductById(selection);
            load();
        }
    }

    const AddProduct = () => {
        window.location.href = `/product/new`;
    }

    async function load() {
        rows = [];
        await api.getAllProducts().then(products => {
            products.data.map(product => (rows.push({ id: product._id, type: product.type, name: product.name, picture: product.picture, price: product.price })));
            setProducts(products.data);
        });
    }

    useEffect(() => {
        async function load() {
            rows = [];
            await api.getAllProducts().then(products => {
                products.data.map(product => (rows.push({ id: product._id, type: product.type, name: product.name, picture: product.picture, price: product.price })));
                setProducts(products.data);
            });
        }
        load();
    }, []);
    return (
        <div style={{ height: 700, width: '100%', display: 'flex', backgroundColor: 'white' }}>
            <DataGrid id={rows._id} rows={rows} columns={columns} pageSize={10} checkboxSelection
                onSelectionModelChange={(newSelection) => {
                    setSelection(newSelection.selectionModel);
                }} selectionModel={selection} />
            <div style={{ width: '30%' }}>
                <ButtonGroup>
                    <Button variant="contained" color="primary" onClick={changeProduct}>Edit Data</Button>
                    <Button variant="contained" color="secondary" onClick={DeleteProduct}>Delete Data</Button>
                    <Button variant="contained" color="primary" onClick={AddProduct}>Add Data</Button>
                </ButtonGroup>
                <Container style={{ width: '200px' }}>
                    <form onSubmit={EditProduct} method="PUT">
                        <TextField onChange={handleInputChange} label="_id" type="text" name="_id" id="_id" value={edit._id || ''} disabled={true} />
                        <TextField onChange={handleInputChange} label="type" type="text" name="type" id="type" value={edit.type || ''} />
                        <TextField onChange={handleInputChange} label="name" type="text" name="name" id="name" value={edit.name || ''} />
                        <TextField onChange={handleInputChange} label="picture" type="text" name="picture" id="picture" value={edit.picture || ''} />
                        <TextField onChange={handleInputChange} label="price" type="text" name="price" id="price" value={edit.price || 0} />
                        <Button color="primary" type="submit">Save</Button>{' '}
                    </form>
                </Container>
            </div>
        </div >
    );
}