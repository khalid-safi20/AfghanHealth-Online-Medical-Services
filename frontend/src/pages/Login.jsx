import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);
  const { t } = useTranslation();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {
      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } else {
      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/google-login`, {
        token: credentialResponse.credential,
      });

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success(t('login.googleSuccess'));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error(t('login.googleError'));
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold">{state === 'Sign Up' ? t('login.createAccount') : t('login.login')}</p>
          <p>{t('login.please')} {state === 'Sign Up' ? t('login.signUp') : t('login.logIn')} {t('login.toBook')}</p>
          {state === 'Sign Up' && (
            <div className="w-full ">
              <p>{t('login.fullName')}</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border border-[#DADADA] rounded w-full p-2 mt-1"
                type="text"
                required
              />
            </div>
          )}
          <div className="w-full ">
            <p>{t('login.email')}</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="email"
              required
            />
          </div>
          <div className="w-full ">
            <p>{t('login.password')}</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="password"
              required
            />
          </div>
          <button className="bg-primary text-white w-full py-2 my-2 rounded-md text-base">
            {state === 'Sign Up' ? t('login.createAccount') : t('login.login')}
          </button>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => toast.error(t('login.googleError'))}
            theme="outline"
            size="large"
          />
          {state === 'Sign Up' ? (
            <p>
              {t('login.alreadyAccount')}{' '}
              <span onClick={() => setState('Login')} className="text-primary underline cursor-pointer">
                {t('login.loginHere')}
              </span>
            </p>
          ) : (
            <p>
              {t('login.newAccount')}{' '}
              <span onClick={() => setState('Sign Up')} className="text-primary underline cursor-pointer">
                {t('login.clickHere')}
              </span>
            </p>
          )}
        </div>
      </form>
    </GoogleOAuthProvider>
  );
};

export default Login;
