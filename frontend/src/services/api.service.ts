import api from '../utils/axios';

export const getTranscriptions = async () => {
  try {
    const response = await api
      .get(`/transcriptions`)
      .then(response => response)
      .catch(error => error.response);
    return response.data as ResponseType;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
