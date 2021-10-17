import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:4000/api",
})
// products
export const insertProduct = payload => api.post('/product', payload);
export const getAllProducts = () => api.get('/products');
export const updateProductById = (id, payload) => api.put(`/products/`, payload);
export const deleteProductById = id => api.delete(`/product/${id}`);
export const getProductById = id => api.get(`/product/${id}`);
// order
export const insertOrder = payload => api.post('/order', payload);
export const getAllOrders = () => api.get('/orders');
export const updateOrderById = (id, payload) => api.put(`/order/${id}`, payload);
export const deleteOrderById = id => api.delete(`/order/${id}`);
export const getOrderById = id => api.get(`/order/${id}`);

const apis = {
    insertProduct,
    getAllProducts,
    updateProductById,
    deleteProductById,
    getProductById,
    insertOrder,
    getAllOrders,
    updateOrderById,
    deleteOrderById,
    getOrderById,
}

export default apis;
