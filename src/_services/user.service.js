import { authHeader } from "../_helpers";
import axios from "axios";
import { params } from "../_helpers";
export const userService = {
  getUser,
  updateUser,
  getBalance,
  transfer,
  getcountries
};

function getUser() {
  const header = { "headers":authHeader()}
  return axios.get(`${params.APIURL}/user`,header).then( res => res.data)
}

function updateUser(data) {
  const header = {
    "headers":authHeader(),
        'Content-Type': 'multipart/form-data'
    }
    return axios.post(`${params.APIURL}/edituser`, data, header).then( res => res.data)
}

function getBalance() {
    const header= {
        "headers": authHeader()
    }
    return axios.get(`${params.APIURL}/balance`, header).then(res =>  res.data)
}

function transfer(data) {
    const header = {
        "headers": authHeader()
    }
    return axios.post(`${params.APIURL}/transfer`, data, header).then( res => res.data)
}

function getcountries() {
    return axios.get(params.COUNTRYURL).then(res => res.data)
}
