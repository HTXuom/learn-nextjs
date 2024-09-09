// lib/api.ts
export const fetchProductById = async (id: string) => {
    try {
        const response = await fetch(`https://66b485189f9169621ea34bb0.mockapi.io/products/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch product:', error);
        return null;
    }
};
