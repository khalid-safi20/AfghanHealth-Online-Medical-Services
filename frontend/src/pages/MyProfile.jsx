import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { useTranslation } from 'react-i18next';

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const { t } = useTranslation();

  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      image && formData.append('image', image);

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return userData ? (
    <div className="min-h-[55vh] bg-[#f9fafb] py-10 px-4 md:px-12">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden flex flex-col lg:flex-row">
        {/* Profile Sidebar */}
        <div className="lg:w-1/3 bg-[#f0f4f8] p-6 flex flex-col items-center text-center">
          <label htmlFor="image" className="relative group cursor-pointer">
            <img
              className="w-32 h-32 rounded-full object-cover shadow-md"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt={t('profile.imageAlt')}
            />
            {isEdit && (
              <>
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full group-hover:flex items-center justify-center hidden">
                  <span className="text-white text-sm">{t('profile.change')}</span>
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </>
            )}
          </label>

          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
              className="mt-4 text-lg font-semibold text-center bg-gray-100 rounded p-1 px-3"
            />
          ) : (
            <h2 className="text-xl font-semibold mt-4">{userData.name}</h2>
          )}
          <p className="text-sm text-gray-500">{userData.email}</p>

          <button
            onClick={() => (isEdit ? updateUserProfileData() : setIsEdit(true))}
            className="mt-6 px-6 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-full transition-all"
          >
            {isEdit ? t('profile.save') : t('profile.edit')}
          </button>
        </div>

        {/* Details Section */}
        <div className="lg:w-2/3 p-6 grid gap-8 text-sm">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-indigo-700 border-b pb-1 mb-4">{t('profile.contactInfo')}</h3>
            <div className="grid grid-cols-[100px_1fr] gap-y-3 text-gray-700">
              <span className="font-medium">{t('profile.phone')}:</span>
              {isEdit ? (
                <input
                  type="text"
                  value={userData.phone}
                  onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="bg-gray-50 border px-3 py-1 rounded w-60"
                />
              ) : (
                <p className="text-gray-600">{userData.phone}</p>
              )}

              <span className="font-medium">{t('profile.address')}:</span>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    className="bg-gray-50 border px-3 py-1 rounded w-60"
                  />
                  <input
                    type="text"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    className="bg-gray-50 border px-3 py-1 rounded w-60"
                  />
                </div>
              ) : (
                <p className="text-gray-600">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold text-indigo-700 border-b pb-1 mb-4">{t('profile.basicInfo')}</h3>
            <div className="grid grid-cols-[100px_1fr] gap-y-3 text-gray-700">
              <span className="font-medium">{t('profile.gender')}:</span>
              {isEdit ? (
                <select
                  value={userData.gender}
                  onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                  className="bg-gray-50 border px-3 py-1 rounded w-40"
                >
                  <option value="Not Selected">{t('profile.notSelected')}</option>
                  <option value="Male">{t('profile.male')}</option>
                  <option value="Female">{t('profile.female')}</option>
                </select>
              ) : (
                <p className="text-gray-600">{t(`profile.${userData.gender.toLowerCase()}`, userData.gender)}</p>
              )}

              <span className="font-medium">{t('profile.birthday')}:</span>
              {isEdit ? (
                <input
                  type="date"
                  value={userData.dob}
                  onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                  className="bg-gray-50 border px-3 py-1 rounded w-40"
                />
              ) : (
                <p className="text-gray-600">{userData.dob}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default MyProfile;
