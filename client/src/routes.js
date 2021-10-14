import React from "react";
import { Switch, Route } from "react-router-dom";
import { MainPage } from "./pages/main";
import { ProductList } from "./pages/productList";
import { ProductAdd } from "./pages/productAdd";
import { Cups } from "./pages/cups";
import { Shirts } from "./pages/t-shirts";
import { Order } from "./pages/order";
import { OrderList } from "./pages/orderList";
import { About } from "./pages/About";
import { PaymentAndDeliver } from "./pages/PaymentAndDeliver";

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={MainPage} />
      <Route path="/cups" component={Cups} />
      <Route path="/t-shirts" component={Shirts} />
      <Route path="/products" component={ProductList} />
      <Route path="/product/new" component={ProductAdd} />
      <Route path="/order" component={Order} />
      <Route path="/orders" component={OrderList} />
      <Route path="/about" component={About} />
      <Route path="/ship&pay" component={PaymentAndDeliver} />
    </Switch>
  );
};
