import { IResponse } from 'src/common/interfaces/response.interfaces';

export const responseHandler = ({
  success = true,
  data,
  message,
}: IResponse) => {
  return {
    success,
    message,
    data,
  };
};
