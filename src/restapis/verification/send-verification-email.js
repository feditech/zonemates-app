import {useMutation} from 'react-query';
import http from '../index';
import API_ENDPOINTS from '../API_ENDPOINTS';
import {showToast} from '../../components/Toast';

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
      onSuccess: data =>
        showToast('success', 'Sent Verification Code', 'Check your inbox'),

      onError: err => showToast('error', 'Error', err),
    },
  );
};

export default useVerificationMutation;
