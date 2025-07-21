import api from "./api";

export const getAllSalesAPI= async()=>{
    const res = await api.get('/sales');
    console.log("SALE:-",res.data)
    return res.data;
}

export const createSaleAPI=async(data)=>{
    const res =await api.post('/sales' , data)
    console.log(res.data)
    return res.data;
}