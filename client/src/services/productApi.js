import api from "./api"

export const getAllProductsAPI = async () => {
    const res = await api.get('/product/allproduct');
    
    return res.data;
}

export const createProductAPI = async (formdata) => {
    const res = await api.post('/product', formdata);
    return res.data;
}

export const updateProductAPI=async(id ,data )=>{
    const res = await api.patch(`/product/updateproduct/${id}` , data)
    console.log(res.data);
    return res.data;
}

export const deleteProductAPI = async (id) => {
    const res = await api.delete(`/product/deleteproduct/${id}`);
    return res.data;
}