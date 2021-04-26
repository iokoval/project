import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { MainPage } from './pages/main';
import { ProductList } from './pages/productList';
import { ProductAdd } from './pages/productAdd';
import { Cups } from './pages/cups';
import { Shirts } from './pages/t-shirts';
import { Order } from './pages/order';
import { OrderList } from './pages/orderList';

export const useRoutes = () => {

    return (
        <Switch>
            <Route path="/" exact={true} component={MainPage} />
            <Route path="/cups" exact={true} component={Cups} />
            <Route path="/t-shirts" exact={true} component={Shirts} />
            <Route path="/products" exact={true} component={ProductList} />
            <Route path="/product/new" exact={true} component={ProductAdd} />
            <Route path="/order" exact={true} component={Order} />
            <Route path="/orders" exact={true} component={OrderList} />
        </Switch>
    )
}