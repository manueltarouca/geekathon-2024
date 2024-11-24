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

export const getTranscription = async (transId: string) => {
  try {
    const response = await api
      .get(`/transcriptions/${transId}`)
      .then(response => response)
      .catch(error => error.response);
    return response.data as ResponseType;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTranscription = async (transId: string, data: any) => {
  try {
    const response = await api
      .post(`/transcriptions/${transId}`, data)
      .then(response => response)
      .catch(error => error.response);
    return response.data as ResponseType;
  } catch (error) {
    console.error(error);
    throw error;
  }
}