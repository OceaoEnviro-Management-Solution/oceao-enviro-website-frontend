import { request } from './http';
import { adaptFormError } from './formErrors';

// backend field -> form field (see formFields.queryForm in constants/contact.js)
const QUERY_FIELD_MAP = {
    name: 'fullName',
    mobileNumber: 'phone',
    organisation: 'company',
    source: 'hearAbout',
};

const submitQuery = async (formData) => {
    try {
        return await request('/query/new-query', {
            method: 'POST',
            json: {
                name: formData.fullName,
                email: formData.email,
                mobileNumber: formData.phone,
                organisation: formData.company,
                industry: formData.industry,
                source: formData.hearAbout,
                subject: formData.subject,
                query: formData.query,
            },
        });
    } catch (error) {
        throw adaptFormError(error, QUERY_FIELD_MAP);
    }
};

export { submitQuery };
