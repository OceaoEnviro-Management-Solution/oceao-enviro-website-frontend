import { request } from './http';
import { adaptFormError } from './formErrors';

// backend field -> form field (FeedbackContext form state)
const FEEDBACK_FIELD_MAP = {
  mobileNumber: 'phone',
};

const submitFeedback = async (formData) => {
  const formDataObj = new FormData();
  formDataObj.append("type", formData.type);
  formDataObj.append("name", formData.name);
  formDataObj.append("email", formData.email);
  if (formData.phone) {
    formDataObj.append("mobileNumber", formData.phone);
  }
  formDataObj.append("subject", formData.subject);
  formDataObj.append("message", formData.message);
  if (formData.attachment) {
    formDataObj.append("attachment", formData.attachment);
  }

  try {
    return await request('/feedback/new-feedback', {
      method: 'POST',
      formData: formDataObj,
    });
  } catch (error) {
    throw adaptFormError(error, FEEDBACK_FIELD_MAP);
  }
};

export { submitFeedback };
