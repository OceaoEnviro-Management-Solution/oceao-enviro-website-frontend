const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  const response = await fetch(
    `${BASE_URL}/feedback/new-feedback`,
    {
      method: "POST",
      body: formDataObj
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
};

export { submitFeedback };