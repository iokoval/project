import React, { useState, useEffect } from 'react';
import '../App.css';
import api from '../api';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Button, FormControl, InputLabel, Select } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import $ from 'jquery';

const defaultValues = {
    name: "",
    surname: "",
    email: "",
    city: "",
    shipping: "",
    socType: "",
    socValue: "",
    paid: false,
    sent: false,
    products: "",
    price: "",
};

export function Order() {
    const [formValues, setFormValues] = useState(defaultValues);
    const [items, setItems] = useState([]);
    const [price, setPrice] = useState(0);
    const [shippingAddress, setShippingAddress] = useState();
    const [update, setUpdate] = useState();

    let addresses = ["1", 2];

    async function loadMap() {
        $(function () {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://api.novaposhta.ua/v2.0/json/",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",

                },
                "processData": false,
                "data": "{\r\n\"257efb66873e2c130a5ae6af8bce89a6\": \"\",\r\n \"modelName\": \"AddressGeneral\",\r\n \"calledMethod\": \"getWarehouses\",\r\n \"methodProperties\": {\r\n \"Language\": \"ru\",\r\n \"Limit\": 5\r\n}\r\n}"
                // "data": "{\r\n\"257efb66873e2c130a5ae6af8bce89a6\": \"\",\r\n \"modelName\": \"AddressGeneral\",\r\n \"calledMethod\": \"getWarehouses\",\r\n \"methodProperties\": {\r\n \"CityName\": \"васильевка\",\r\n \"Limit\": 5\r\n }\r\n}"
            }

            $.ajax(settings).done(function (response) {
                console.log(response.data);
                addresses = response.data;
                setUpdate(Math.random());
            });
        });
    }

    async function loadCart() {
        if (localStorage.getItem('podarok-print-en')) {
            let cartList = [];
            let stored = JSON.parse(localStorage.getItem('podarok-print-en'));
            let pr = 0;
            for (let i = 0; i < stored.cart.cartItems.length; i++) {
                cartList.push(stored.cart.cartItems[i]);
            }
            for (let t = 0; t < cartList.length; t++) {
                pr += cartList[t].price * cartList[t].quantity;
            }
            setPrice(pr);
            setItems(cartList);
            console.log(items)
            for (let j = 0; j < items.length; j++) {
                setFormValues({ ...formValues, products: items[j]._id })
            }
        }
        console.log(formValues)
        await loadMap();
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
            price: price,
            products: items,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formValues);
        await api.insertOrder(formValues).then(
            localStorage.removeItem('podarok-print-en')
        );
    }

    const handleChange = (event) => {
        setShippingAddress(event.target.value);
    };


    useEffect(() => {
        loadCart();
    }, []);

    return (
        <div style={{ backgroundColor: 'whitesmoke' }}>
            <form onSubmit={handleSubmit} method="POST">
                {items.map((item) => (
                    <Grid item className='contentBlock' style={{ margin: 'auto', width: '500px', backgroundColor: 'whitesmoke' }}>
                        <Paper className="paper" style={{ display: "flex", backgroundColor: 'whitesmoke' }}>
                            <li><img src={'/imgs/' + item.picture + '.jpg'} alt={item.name + ' picture'} className="picture" style={{ width: '100px', height: '100px', margin: 'auto' }} /></li>
                            <li className="productName" style={{ margin: 'auto' }}>{item.name}</li>
                            <li style={{ margin: 'auto' }}>{item.quantity}</li>
                            <li className="productPrice" style={{ margin: 'auto' }}>{'₴' + item.price * item.quantity}</li>
                        </Paper>
                    </Grid>
                ))}
                <Grid container alignItems="center" justify="center" direction="column" style={{ backgroundColor: 'whitesmoke' }}>
                    <Grid item>
                        <TextField
                            id="name-input"
                            name="name"
                            label="Имя"
                            type="text"
                            value={formValues.name}
                            onChange={handleInputChange}
                            required={true}
                            fullWidth={true}
                            style={{ width: '300px' }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="surname-input"
                            name="surname"
                            label="Фамилия"
                            type="text"
                            value={formValues.surname}
                            onChange={handleInputChange}
                            required={true}
                            style={{ width: '300px' }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="city-input"
                            name="city"
                            label="Город"
                            type="text"
                            value={formValues.city}
                            onChange={handleInputChange}
                            required={true}
                            style={{ width: '300px' }}
                        />
                    </Grid>
                    <Grid item>{formValues.city ?
                        <FormControl style={{ width: '300px' }}>
                            <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                            <Select
                                native
                                value={shippingAddress}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                {addresses.map((address) => (
                                    <option value={address}>{address}</option>
                                ))}
                            </Select>
                        </FormControl>
                        : null}
                    </Grid>
                    <Grid item>
                        <TextField
                            id="email-input"
                            name="email"
                            label="Email"
                            type="email"
                            value={formValues.email}
                            onChange={handleInputChange}
                            required={true}
                            style={{ width: '300px' }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="price-input"
                            name="price"
                            type="number"
                            hidden={true}
                            value={formValues.price}
                            required={true}
                            disabled={true}
                            style={{ width: '300px' }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="products-input"
                            name="products"
                            type="text"
                            hidden={true}
                            value={formValues.products}
                            required={true}
                            disabled={true}
                            style={{ width: '300px' }}
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" style={{ width: '300px', backgroundColor: 'green', margin: '10px 0' }} color="primary">Оформить</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}