import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh (basic implementation)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 error and not retried yet
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token');

            if (refreshToken) {
                try {
                    const response = await axios.post(`${API_URL}/token/refresh/`, {
                        refresh: refreshToken
                    });

                    const newAccessToken = response.data.access;
                    localStorage.setItem('access_token', newAccessToken);

                    api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                    return api(originalRequest);
                } catch (refreshError) {
                    // Refresh failed, logout
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

export const authService = {
    login: async (username, password) => {
        const response = await api.post('/token/', { username, password });
        if (response.data.access) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },
    getCurrentUser: () => {
        return api.get('/users/', { params: { my_profile: true } });
    },
    getUsers: async () => {
        return api.get('/users/');
    },
    createUser: async (userData) => {
        return api.post('/users/', userData);
    },
    updateUser: async (userId, userData) => {
        return api.patch(`/users/${userId}/`, userData);
    }
};

export const historyService = {
    getGlobalHistory: async (params) => {
        return api.get('/history/', { params });
    }
};

export const userService = {
    changePassword: async (old_password, new_password) => {
        return api.post('/users/change-password/', { old_password, new_password });
    }
};

export const jobService = {
    uploadJobs: async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return api.post('/jobs/bulk_upload/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    },
    getJobs: async (params) => {
        return api.get('/jobs/', { params });
    },
    submitJob: async (jobId) => {
        return api.post(`/jobs/${jobId}/submit/`);
    },
    acceptJob: async (jobId) => {
        return api.post(`/jobs/${jobId}/accept/`);
    },
    rejectJob: async (jobId, reason) => {
        return api.post(`/jobs/${jobId}/reject/`, { reason });
    },
    postPaymentFull: async (jobId, paymentAmount) => {
        return api.post(`/jobs/${jobId}/post_payment_full/`, { payment_amount: paymentAmount });
    },
    postPaymentPartial: async (jobId, paymentAmount) => {
        return api.post(`/jobs/${jobId}/post_payment_partial/`, { payment_amount: paymentAmount });
    },
    postPaymentDenied: async (jobId, reason) => {
        return api.post(`/jobs/${jobId}/post_payment_denied/`, { reason });
    },
    resubmitClaim: async (jobId, notes) => {
        return api.post(`/jobs/${jobId}/resubmit_claim/`, { notes });
    },
    writeOff: async (jobId, writeOffAmount, reason) => {
        return api.post(`/jobs/${jobId}/write_off/`, { write_off_amount: writeOffAmount, reason });
    },
    closeJob: async (jobId, reason) => {
        return api.post(`/jobs/${jobId}/close_job/`, { reason });
    },
    getStuckJobs: async () => {
        return api.get('/jobs/stuck_jobs/');
    },
    getJobDetail: async (jobId) => {
        return api.get(`/jobs/${jobId}/`);
    },
    hold: async (jobId, reason) => {
        return api.post(`/jobs/${jobId}/hold/`, { reason });
    },
    escalate: async (jobId, reason) => {
        return api.post(`/jobs/${jobId}/escalate/`, { reason });
    }
};

export default api;
