import React from 'react'
import Axios from 'axios'


// export const apiConstant = "https://api.kredi.com.tr";
export const apiConstant = "http://localhost:9372";

const masterUrl = apiConstant+"/api/";
export const apiUrl = apiConstant+"/StaticF";

export const GetWithToken = async (url) => {

    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + localStorage.getItem("ultumtoken")
        }
    }
    try {
         return Axios.get(masterUrl + url, headers)
    } catch (error) {
        alert("hata oluştu n/ " +error)

    }

}
export const PostWithToken = async (url,data) => {

    const headers =
    {
        headers: {
            'Content-Type': 'application/Json',
            Authorization: 'Bearer ' + localStorage.getItem("ultumtoken")
        }
    }
    try {

        return Axios.post(masterUrl + url,data, headers)
    } catch (error) {
       alert("hata oluştu n/ " +error)
   }
}