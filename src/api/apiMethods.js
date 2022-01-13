import axios from 'axios';

const basePath = "/api/board"

export const getBoard = () => {
    return axios.get(basePath);
}

export const createBoard = (data) => {
    return axios.post(basePath, data);
}

export const updateStatus = (data) => {
    return axios.put(`${basePath}/status`, data);
}

export const updateSpeed = (data) => {
    return axios.put(`${basePath}/speed`, data);
}