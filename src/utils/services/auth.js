import React from 'react';
import { Axios } from 'axios';



export const setTenant_id = (tenant_id) => {
    localStorage.setItem("tenant_id", JSON.stringify(tenant_id))

}

export const getTenant_id = () =>{
    const tenant_id = localStorage.getItem("tenant_id");
    return JSON.parse(tenant_id);
}



export const setAcessToken = (access_token) => {
    localStorage.setItem("access_token", JSON.stringify(access_token))

}

export const getAcessToken = () =>{
    const access_token = localStorage.getItem("access_token");
    return JSON.parse(access_token);
}
