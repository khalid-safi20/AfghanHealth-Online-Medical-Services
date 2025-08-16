import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { doctors as staticDoctors } from '../assets/assets';
import { useNavigate, useParams } from 'react-router-dom';
import { FiUser, FiHeart, FiSmile, FiActivity, FiTarget, FiFilter } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const Doctors = () => {
  const { t } = useTranslation();
  const { speciality } = useParams();
  const [filteredDocs, setFilteredDocs] = useState([]);
  const navigate = useNavigate();
  const { doctors: contextDoctors } = useContext(AppContext);

  const specialities = [
    { label: 'General Physician', icon: <FiUser /> },
    { label: 'Gynecologist', icon: <FiHeart /> },
    { label: 'Dermatologist', icon: <FiSmile /> },
    { label: 'Pediatricians', icon: <FiActivity /> },
    { label: 'Neurologist', icon: <FiTarget /> },
    { label: 'Gastroenterologist', icon: <FiUser /> },
  ];

  // Helper to normalize availability:
  // - Respect doc.available or doc.isAvailable if present
  // - Otherwise, alternate true/false so there is a mix
  const applyAvailabilityFallback = (list) =>
    list.map((doc, i) => {
      const explicit =
        typeof doc.available === 'boolean'
          ? doc.available
          : typeof doc.isAvailable === 'boolean'
          ? doc.isAvailable
          : null;

      return {
        ...doc,
        available: explicit !== null ? explicit : i % 2 === 0, // alternate if missing
      };
    });

  useEffect(() => {
    // Merge static + dynamic doctors
    const baseList = [
      ...staticDoctors,
      ...(Array.isArray(contextDoctors) ? contextDoctors : []),
    ];

    const normalized = applyAvailabilityFallback(baseList);

    if (speciality) {
      const matches = normalized.filter(
        (doc) =>
          doc.speciality &&
          doc.speciality.toLowerCase() === speciality.toLowerCase()
      );

      // If no match, show all
      setFilteredDocs(matches.length > 0 ? applyAvailabilityFallback(matches) : normalized);
    } else {
      setFilteredDocs(normalized);
    }
  }, [speciality, contextDoctors]);

  return (
    <div className="bg-[#f5f9fc] min-h-screen py-12 px-6 md:px-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-sky-700">{t('doctors.findTitle')}</h1>
        <p className="mt-2 text-sm text-gray-500">{t('doctors.findSubtitle')}</p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-10 lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-64">
          <div className="sticky p-4 bg-white shadow-md top-20 rounded-xl">
            <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-gray-700">
              <FiFilter /> {t('doctors.specialties')}
            </h3>
            <div className="flex flex-col space-y-2">
              {specialities.map(({ label, icon }, index) => {
                const isActive =
                  speciality?.toLowerCase() === label.toLowerCase();
                return (
                  <button
                    key={index}
                    onClick={() =>
                      isActive ? navigate('/doctors') : navigate(`/doctors/${label}`)
                    }
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-sky-100 text-sky-700 border border-sky-400'
                        : 'bg-gray-50 text-gray-600 hover:bg-sky-50'
                    }`}
                  >
                    <span className="text-lg">{icon}</span>
                    {t(`specialities.${label}`, label)}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Cards */}
        <main className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredDocs.map((doc, idx) => (
            <div
              key={doc._id ?? idx}
              onClick={() => {
                navigate(`/appointment/${doc._id}`);
                window.scrollTo(0, 0);
              }}
              className="transition transform bg-white shadow-md cursor-pointer rounded-xl hover:shadow-lg hover:-translate-y-1"
            >
              <img
                src={doc.image || '/default-avatar.png'}
                alt={doc.name}
                className="object-cover w-full h-44 rounded-t-xl"
              />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2 text-sm">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      doc.available ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                  <span className={doc.available ? 'text-green-600' : 'text-gray-500'}>
                    {doc.available ? t('doctors.available') : t('doctors.notAvailable')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-sky-800">{doc.name}</h3>
                <p className="text-sm text-gray-600">{doc.speciality}</p>

                <button className="w-full py-2 mt-4 text-sm font-medium text-white transition rounded bg-sky-600 hover:bg-sky-700">
                  {t('doctors.bookNow')}
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Doctors;
