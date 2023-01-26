import {useMutation} from 'react-query';
import http from '../index';
import API_ENDPOINTS from '../API_ENDPOINTS';

const sendVerificationEmail = async (to, verificationCode) => {
  try {
    const {data} = await http.post(API_ENDPOINTS.sendVerificationEmail, {
      to,
      verificationCode,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const useVerificationMutation = () => {
  return useMutation(
    props => sendVerificationEmail(props.to, props.verificationCode),
    {
      onSuccess: data => console.log('success', data),
      onError: err => console.log(err),
    },
  );
};

export default useVerificationMutation;
