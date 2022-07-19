import React from 'react';
import { Axios } from 'axios';



export const setTenant_id = (tenant_id) => {
    localStorage.setItem("tenant_id", tenant_id)

}

export const getTenant_id = () =>{
    const tenant_id = localStorage.getItem("tenant_id");
    return tenant_id
}

