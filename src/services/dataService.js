// dataservice.js
import axios from 'axios';

const API_URL = 'https://localhost:7217/api';

export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/Authentication/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/Authentication/login`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const createTask = async (task) => {
    try {
        const response = await axios.post(`${API_URL}/Task`, task);
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

export const putTask = async (task) => {
    try {
        const response = await axios.put(`${API_URL}/Task/${task.id}`, task);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

export const removeTask = async (task) => {
    try {
        const response = await axios.delete(`${API_URL}/Task/${task.id}`);
        return response;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

export const getTasks = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/Task`);
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};