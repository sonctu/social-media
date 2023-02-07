import { IUploadImageResponse } from './../types/upload';
import http from '~/utils/instance';

const url = '/v1/upload';

const uploadApi = {
  uploadImage: (formData: FormData) =>
    http.post<IUploadImageResponse>(`${url}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};

export default uploadApi;