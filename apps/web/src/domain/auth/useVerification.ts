import { useLoginUserMutation, useVerifyUserMutation } from '@/generated';
import { useAuth } from '@/providers/AuthProvider';

export const useVerificationMutation = (email: string, password: string) => {
  const [loginMutation, { loading: loadingLogin }] = useLoginUserMutation();
  const { setToken } = useAuth();
  const [verifyUserMutation, { loading: loadingVerify }] =
    useVerifyUserMutation({});

  const handleVerify = async (token: string) => {
    try {
      await verifyUserMutation({
        variables: {
          input: { verificationToken: token },
        },
      });
      const result = await loginMutation({
        variables: {
          email,
          password,
        },
      });
      if (result.data?.login) {
        localStorage.setItem('token', result.data?.login);
        setToken(result.data?.login);
      }
    } catch (e) {
      throw e;
    }
  };
  return {
    handleVerify,
    loading: loadingLogin || loadingVerify,
  };
};
