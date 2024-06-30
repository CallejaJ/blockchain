const API_URL = 'http://localhost:3000';

export const getBlocks = async () => {
    const response = await fetch(`${API_URL}/blocks`);
    return response.json();
};

export const addBlock = async (data) => {
    const response = await fetch(`${API_URL}/addBlock`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    });
    return response.json();
};
