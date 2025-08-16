import React, {  useContext,useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../context/AppContext';

const Feedback = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
    const { backendUrl, token } = useContext(AppContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) return toast.error(t('feedback.required'));

    try {
         const { data } = await axios.post(
        backendUrl + '/api/feedback',
        { name, email, message  },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(t('feedback.success'));
        setName(''); setEmail(''); setMessage('');
      } else {
        toast.error(t('feedback.error'));
      }
    } catch (err) {
      console.error(err);
      toast.error(t('feedback.error'));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">{t('feedback.title')}</h2>
      <p className="text-center text-sm text-gray-500 mb-6">{t('feedback.subtitle')}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder={t('feedback.name')}
          className="w-full border px-4 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder={t('feedback.email')}
          className="w-full border px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          rows="4"
          placeholder={t('feedback.message')}
          className="w-full border px-4 py-2 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          {t('feedback.submit')}
        </button>
      </form>
    </div>
  );
};

export default Feedback;
