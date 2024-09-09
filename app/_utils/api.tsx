import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://66b485189f9169621ea34bb0.mockapi.io';


const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});



interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface SignInResponse {
    user: User;
    jwt: string;
}


export const signIn = async (email: string, password: string): Promise<SignInResponse> => {
    try {
        const response: AxiosResponse<SignInResponse> = await axiosClient.post('/login', { email, password });
        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error signing in:', error);
        throw error;
    }
};

export const getOrderHistory = async (userId: string) => {
    const response = await fetch(`/api/orders?userId=${userId}`);
    const data = await response.json();
    return data;
};

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    // Các thuộc tính khác của sản phẩm
}
interface Category {
    id: string;
    name: string;
}



export const getUsers = async (): Promise<User[]> => {
    try {
        const response: AxiosResponse<User[]> = await axiosClient.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
export const updateUserProfile = async (formData: FormData) => {
    const response = await fetch('/api/update-profile', {
        method: 'POST',
        body: formData,
    });
    return response;
};


export const fetchUserProfile = async (userId: string): Promise<User> => {
    try {
        const response: AxiosResponse<User> = await axiosClient.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user profile.');
    }
};
export const registerUser = async (username: string, email: string, password: string): Promise<User> => {
    try {
        const response: AxiosResponse<User> = await axiosClient.post('/users', {
            name: username,
            email,
            password,
            avatar: 'https://loremflickr.com/640/480/abstract',
        });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Phương thức lấy danh sách các slider
const getSliders = async () => {
    try {
        const response = await axiosClient.get('/sliders');
        return response.data;
    } catch (error) {
        console.error('Error fetching sliders:', error);
        throw error;
    }
};

// Phương thức thêm sản phẩm vào giỏ hàng
const addToCart = async (data: any, jwt: string) => {
    try {
        const response = await axiosClient.post('/user-cart', data, {
            headers: { Authorization: `Bearer ${jwt}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};

// Phương thức lấy các mặt hàng trong giỏ hàng
const getCartItems = async (userId: string, jwt: string) => {
    try {
        const response = await axiosClient.get(`/user-carts?filters[userId][$eq]=${userId}&populate=*`, {
            headers: { Authorization: `Bearer ${jwt}` }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
};

// Phương thức lấy danh mục
const getCategory = async (): Promise<Category[]> => {
    try {
        const response = await axiosClient.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Phương thức cập nhật thông tin người dùng
// const updateUserProfile = async (userData: any) => {
//     try {
//         const response = await axiosClient.post('/api/updateProfile', userData);
//         return response.data;
//     } catch (error) {
//         console.error('Error updating user profile:', error);
//         throw error;
//     }
// };

// Phương thức tải ảnh lên
const uploadImage = async (imageFile: File) => {
    try {
        const formData = new FormData();
        formData.append('file', imageFile);

        const response = await axiosClient.post('/api/uploadImage', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

// Phương thức lấy thông tin người dùng
const getUser = async (userId: string): Promise<User> => {
    try {
        const response: AxiosResponse<User> = await axiosClient.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};



// Tự động đăng nhập sau khi đăng ký
export const registerAndSignIn = async (username: string, email: string, password: string) => {
    try {
        await registerUser(username, email, password);
        const loginResponse = await signIn(email, password);
        sessionStorage.setItem('user', JSON.stringify(loginResponse.user));
        sessionStorage.setItem('jwt', loginResponse.jwt);
    } catch (error) {
        console.error('Registration or login failed:', error);
        throw error;
    }
};



// Lấy thông tin sản phẩm theo ID
export const getProduct = async (id: string): Promise<Product> => {
    try {
        const response: AxiosResponse<Product> = await axiosClient.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting product:', error);
        throw error;
    }
};

// Lấy danh sách tất cả sản phẩm
export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const response: AxiosResponse<Product[]> = await axiosClient.get('/products');
        return response.data;
    } catch (error) {
        console.error('Error getting all products:', error);
        throw error;
    }
};

// Tìm kiếm sản phẩm theo tên
export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
    try {
        const response: AxiosResponse<Product[]> = await axiosClient.get(`/products?search=${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
};

// Thêm sản phẩm mới
export const addProduct = async (productData: Product): Promise<Product> => {
    try {
        const response: AxiosResponse<Product> = await axiosClient.post('/products', productData);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

// Cập nhật sản phẩm
export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
    try {
        const response: AxiosResponse<Product> = await axiosClient.put(`/products/${id}`, productData);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Xóa sản phẩm
export const deleteProduct = async (id: string): Promise<void> => {
    try {
        await axiosClient.delete(`/products/${id}`);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};


export default {
    getProduct,
    getAllProducts,
    searchProducts,
    getSliders,
    registerUser,
    signIn,
    addToCart,
    getCartItems,
    getCategory,
    updateUserProfile,
    uploadImage,
    getUser,
    getUsers,
    fetchUserProfile
};
