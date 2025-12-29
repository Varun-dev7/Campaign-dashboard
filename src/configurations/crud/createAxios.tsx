import axios from "axios";
import { BASE_URL_API } from "../initUrls";

const createAxios = () => axios.create({
    baseURL: BASE_URL_API,
})


export {createAxios}