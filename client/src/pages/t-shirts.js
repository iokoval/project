import React, { useState, useEffect } from "react";
import "../App.css";
import api from "../api";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addCartAction } from "../store/cartReducer";

export function Shirts() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function load() {
      await api.getAllProducts().then((products) => {
        setProducts(
          products.data.filter((product) => product.type === "t-shirt")
        );
      });
    }
    load();
  }, []);

  const handleBuy = (product) => {
    if (localStorage.getItem("podarok-print-en")) {
      let stored = JSON.parse(localStorage.getItem("podarok-print-en"));
      stored.cart.cartItems.push({
        _id: `${product._id}`,
        type: `${product.type}`,
        name: `${product.name}`,
        picture: `${product.picture}`,
        quantity: 1,
        price: `${product.price}`,
      });
      localStorage.setItem("podarok-print-en", JSON.stringify(stored));
      dispatch(addCartAction(1));
    } else {
      let string = {
        cart: {
          cartItems: [
            {
              _id: `${product._id}`,
              type: `${product.type}`,
              name: `${product.name}`,
              picture: `${product.picture}`,
              quantity: 1,
              price: product.price,
            },
          ],
          price: 0,
        },
      };
      localStorage.setItem("podarok-print-en", JSON.stringify(string));
      dispatch(addCartAction(1));
    }
  };

  return (
    <Grid
      container
      className="contentWrapper"
      spacing={1}
      style={{ width: "70%", margin: "auto" }}
    >
      {products.map((product, i) => (
        <Grid
          item
          justify="center"
          key={i}
          alignItems="center"
          xs={2.5}
          className="contentBlock"
          style={{ margin: "10px 10px" }}
        >
          <Paper className="paper">
            <li>
              <img
                src={"/imgs/" + product.picture + ".jpg"}
                alt={product.name + " picture"}
                className="picture"
              />
            </li>
            <li className="productName">{product.name}</li>
            <li className="productPrice">{"₴" + product.price}</li>
            <li className="productBuy">
              <Button
                variant="contained"
                tag={Link}
                to="/order"
                onClick={() => {
                  handleBuy(product);
                }}
              >
                Купить
              </Button>
            </li>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
