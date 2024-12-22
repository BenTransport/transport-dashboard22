"use server"

import axiosInstance from "@/config/axios";


export async function getUserRegistrationsPerMonth() {
    try {
        const response = await axiosInstance.get('/api/stats/registrations-per-month');
        return { data: response.data.data };
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Fetch user registrations failed';
        return { error: errorMessage };
    }
}



export async function getOffersPerMonth() {
    try {
        const response = await axiosInstance.get('/api/stats/offers-per-month');
        return { data: response.data.data };
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Fetch offers per month failed';
        return { error: errorMessage };
    }
}



export async function getPartnersPerMonth() {
    try {
        const response = await axiosInstance.get('/api/stats/partners-per-month');
        return { data: response.data.data };
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Fetch partners per month failed';
        return { error: errorMessage };
    }
}



export async function getTaskStatusCounts() {
    try {
        const response = await axiosInstance.get('/api/stats/task-status-counts');
        return { data: response.data.data };
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Fetch task status counts failed';
        return { error: errorMessage };
    }
}



export async function getServicesPerTypePerMonth() {
    try {
        const response = await axiosInstance.get('/api/stats/services-per-type-per-month');
        return { data: response.data.data };
    } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Fetch services per type per month failed';
        return { error: errorMessage };
    }
}

