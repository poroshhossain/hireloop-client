import { NewJobFormValues } from "@/type";

export const postJobApi = async(data: NewJobFormValues) => {
    try {
        const response = await fetch('http://localhost:5000/api/v1/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching API data:', error);
        throw error;
    }
}