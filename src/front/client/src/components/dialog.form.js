import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [update, setUpdate] = useState();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    window.location.href = `/order`;
  };

  const loadCart = () => {
    if (localStorage.getItem('podarok-print-en')) {
      let cartList = [];
      let stored = JSON.parse(localStorage.getItem('podarok-print-en'));
      let pr = 0;
      for (let i = 0; i < stored.cart.cartItems.length; i++) {
        cartList.push(stored.cart.cartItems[i]);
      }
      for (let t = 0; t < cartList.length; t++) {
        console.log(cartList[t].price, cartList[t].quantity, price, cartList[t]);
        console.log(cartList);
        pr += cartList[t].price * cartList[t].quantity;
      }
      setPrice(pr);
      setItems(cartList);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
    loadCart();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const HandleAddQuantity = (item) => {
    let stored = JSON.parse(localStorage.getItem('podarok-print-en'));
    for (let i = 0; i < stored.cart.cartItems.length; i++) {
      if (stored.cart.cartItems[i]._id === `${item._id}`) {
        if (stored.cart.cartItems[i].quantity >= 50) {
          stored.cart.cartItems[i].quantity = 50;
        }
        else {
          stored.cart.cartItems[i].quantity++;
          setPrice(price + Number(stored.cart.cartItems[i].price));
        }
        stored.cart.price = price;
        localStorage.setItem('podarok-print-en', JSON.stringify(stored));
      }
    }
    loadCart();
    setUpdate(item.quantity);
  }

  const HandleRemoveQuantity = (item) => {
    let stored = JSON.parse(localStorage.getItem('podarok-print-en'));
    for (let i = 0; i < stored.cart.cartItems.length; i++) {
      if (stored.cart.cartItems[i]._id === `${item._id}`) {
        if (stored.cart.cartItems[i].quantity <= 1) {
          stored.cart.cartItems[i].quantity = 1;
        }
        else {
          stored.cart.cartItems[i].quantity--;
          setPrice(price - Number(stored.cart.cartItems[i].price));
        }
        stored.cart.price = price;
        localStorage.setItem('podarok-print-en', JSON.stringify(stored));
      }
    }
    loadCart();
    setUpdate(item.quantity);
  }

  const HandleRemoveItem = (item) => {
    let stored = JSON.parse(localStorage.getItem('podarok-print-en'));
    for (let i = 0; i < stored.cart.cartItems.length; i++) {
      if (stored.cart.cartItems[i]._id === `${item._id}`) {
        let t = stored.cart.cartItems[0];
        stored.cart.cartItems[0] = stored.cart.cartItems[i];
        stored.cart.cartItems[i] = t;
        setPrice(price - Number(stored.cart.cartItems[0].quantity * stored.cart.cartItems[0].price));
        stored.cart.cartItems.shift();
        stored.cart.price = price;
        localStorage.setItem('podarok-print-en', JSON.stringify(stored));
      }
    }
    console.log(stored);
    loadCart();
    setUpdate(item.quantity);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Корзина
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" scroll='body' fullWidth={true} maxWidth={'sm'}>
        <DialogTitle id="form-dialog-title">Ваш заказ</DialogTitle>
        <DialogContent>
          {items.map((item, i) => (
            <Grid key={i} item className='contentBlock' style={{ width: '100%', backgroundColor: 'white' }}>
              <Paper className="paper" style={{ display: "flex" }}>
                <li><img src={'/imgs/' + item.picture + '.jpg'} alt={item.name + ' picture'} className="picture" style={{ width: '100px', height: '100px', margin: 'auto' }} /></li>
                <li className="productName" style={{ margin: 'auto' }}>{item.name}</li>
                <li style={{ margin: 'auto' }}><Button onClick={() => { HandleRemoveQuantity(item) }}>-</Button>{item.quantity}<Button onClick={() => { HandleAddQuantity(item) }}>+</Button></li>
                <li className="productPrice" style={{ margin: 'auto' }}>{'₴' + item.price * item.quantity}</li>
                <li style={{ margin: 'auto' }}><Button onClick={() => { HandleRemoveItem(item) }}>X</Button></li>
              </Paper>
            </Grid>
          ))}
          <Typography style={{ float: 'right' }}><b>Сумма {price} грн.</b></Typography>
        </DialogContent>
        <Button onClick={handleSubmit} variant="contained" style={{ width: '100%', backgroundColor: 'green', margin: '10px 0 0' }} color="primary">Оформить</Button>
      </Dialog>
    </div>
  );
}
