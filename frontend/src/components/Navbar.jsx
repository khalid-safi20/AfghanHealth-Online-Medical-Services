import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { BsChevronDown } from 'react-icons/bs';
import { FaPhoneAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { t, i18n } = useTranslation();

  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/login');
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      if (!isDropdownHovered) {
        setHoveredMenu(null);
      }
    }, 200);
  };

  return (
    <div className="bg-white shadow border-b sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 md:px-20 py-4">
        <img src={'31.png'} onClick={() => navigate('/login')} className="h-28 cursor-pointer" alt="Afghanistan appointment" />

        {/* Nav Items */}
        <ul className="hidden md:flex items-center gap-6 font-medium text-gray-800 text-[15px]">
        
          {/* Remaining Links */}
          <NavLink to="/"><li className="hover:text-primary">{t('navbar.home')}</li></NavLink>
          <NavLink to="/about"><li className="hover:text-primary">{t('navbar.aboutUs')}</li></NavLink>
          <NavLink to="/ask-ai"><li className="hover:text-primary">{t('navbar.askAI')}</li></NavLink>
          <NavLink to="/doctors"><li className="hover:text-primary">{t('navbar.doctors')}</li></NavLink>
          <NavLink to="/feedback"><li className="hover:text-primary">{t('navbar.feedback')}</li></NavLink>
        </ul>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">
          {token && userData ? (
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <img className="w-8 h-8 rounded-full object-cover" src={userData.image} alt="" />
                <img className="w-2.5" src={assets.dropdown_icon} alt="dropdown" />
              </div>
              {showProfileDropdown && (
                <div className="absolute top-full right-0 mt-3 bg-white border rounded shadow-lg z-50 w-48 p-4 text-sm text-gray-600 font-medium">
                  <p onClick={() => { navigate('/my-profile'); setShowProfileDropdown(false); }} className="hover:text-black cursor-pointer">{t('navbar.myProfile')}</p>
                  <p onClick={() => { navigate('/my-appointments'); setShowProfileDropdown(false); }} className="hover:text-black cursor-pointer mt-2">{t('navbar.myAppointments')}</p>
                  <p onClick={() => { logout(); setShowProfileDropdown(false); }} className="hover:text-black cursor-pointer mt-2">{t('navbar.logout')}</p>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate('/login');
              }} 
              className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm px-5 py-2 rounded hidden md:block"
            >
              {t('navbar.login')}
            </button>
          )}
          
          {/* Language Switcher */}
          <div className="hidden md:flex items-center gap-2 text-sm">
  <label className="flex items-center cursor-pointer">
    <span className="mr-2 text-gray-600">EN</span>
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={(e) => i18n.changeLanguage(e.target.checked ? 'af' : 'en')}
        checked={i18n.language === 'af'}
      />
      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
      <div className="w-5 h-5 bg-white rounded-full shadow absolute top-0.5 left-0.5 peer-checked:translate-x-5 transition-transform"></div>
    </div>
    <span className="ml-2 text-gray-600">AF</span>
  </label>
</div>


          <button
            className="bg-green-700 hover:bg-green-800 text-white p-2 rounded hidden md:flex items-center justify-center"
            onClick={() => setShowContactPopup(true)}
          >
            <FaPhoneAlt size={14} />
          </button>
          <img onClick={() => setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="menu" />
        </div>
      </div>

      {/* Contact Popup */}
      {showContactPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
              onClick={() => setShowContactPopup(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">{t('navbar.contactInfo')}</h2>
            <div className="mb-3 flex items-center justify-between">
              <span className="font-medium">{'Doctors'}</span>
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1 rounded text-sm">042-32380002</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">{'Patients'}</span>
              <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1 rounded text-sm">042-32380001</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
