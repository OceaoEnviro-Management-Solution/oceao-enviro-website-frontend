const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const submitQuery = async (formData) => {
    try {
        const response = await fetch(
            `${BASE_URL}/query/new-query`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        name: formData.fullName,
                        email: formData.email,
                        mobileNumber: formData.phone,
                        organisation: formData.company,
                        industry: formData.industry,
                        source: formData.hearAbout,
                        subject: formData.subject,
                        query: formData.query,
                    }
                ),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong!");
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export { submitQuery };
