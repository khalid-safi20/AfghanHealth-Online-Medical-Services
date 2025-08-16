import React from 'react';
import { assets } from '../assets/assets';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import khalidImg from '../assets/AFG Team images/khalidimage5.jpg';
import farooqImg from '../assets/AFG Team images/farooqimage.jpg';
import hamidaImg from '../assets/AFG Team images/hamidaimage2.jpeg';
import supervisorImg from '../assets/AFG Team images/Dr Awais Adnan.jpg'; // Assuming you have a supervisor image

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white text-gray-800 font-sans">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-16 px-6 md:px-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('about.heroTitle')}</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">{t('about.heroSubtitle')}</p>
        <Link to="/doctors">
        <button className="bg-white text-indigo-600 font-medium px-6 py-2 rounded-md shadow-md hover:bg-gray-100 transition">
          {t('about.heroBtn')}
        </button>
        </Link>
      </div>

      {/* Company Introduction */}
      <div className="flex flex-col md:flex-row items-center gap-12 px-6 md:px-20 py-16">
        <img src={assets.about_image} alt="About DocEase" className="w-full md:max-w-md rounded-lg shadow-md border border-gray-200" />
        <div className="flex flex-col gap-5 max-w-2xl text-[16px] text-gray-700">
          <h2 className="text-2xl font-bold text-indigo-700">{t('about.whoTitle')}</h2>
          <p>{t('about.whoPara1')}</p>
          <p>{t('about.whoPara2')}</p>
        </div>
      </div>

      {/* Vision and Values */}
      <div className="bg-indigo-50 py-16 px-6 md:px-20 text-center">
        <h3 className="text-3xl font-bold text-indigo-700 mb-6">{t('about.visionTitle')}</h3>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('about.visionDesc')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 text-left">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold text-indigo-600 mb-2">{t(`about.values.${i}.title`)}</h4>
              <p className="text-gray-600">{t(`about.values.${i}.text`)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 px-6 md:px-20 bg-white">
        <h3 className="text-3xl font-bold text-center text-indigo-700 mb-12">{t('about.whyTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-indigo-100 hover:shadow-xl p-6 rounded-lg text-center">
              <h4 className="text-xl font-semibold text-indigo-600 mb-2">{t(`about.why.${i}.title`)}</h4>
              <p className="text-gray-600">{t(`about.why.${i}.text`)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      {/* <div className="bg-indigo-50 px-6 md:px-20 py-16">
        <h3 className="text-3xl font-bold text-center text-indigo-700 mb-10">{t('about.journeyTitle')}</h3>
        <div className="max-w-3xl mx-auto border-l-4 border-indigo-400 pl-6 space-y-10">
          {[2024, 2025, 2025].map((year) => (
            <div key={year}>
              <h4 className="font-bold text-indigo-600">{t(`about.timeline.${year}.title`)}</h4>
              <p className="text-gray-600">{t(`about.timeline.${year}.desc`)}</p>
            </div>
          ))}
        </div>
      </div> */}

    {/* Timeline */}
<div className="bg-indigo-50 px-6 md:px-20 py-16">
  <h3 className="text-3xl font-bold text-center text-indigo-700 mb-10">{t('about.journeyTitle')}</h3>
  <div className="max-w-3xl mx-auto border-l-4 border-indigo-400 pl-6 space-y-10">
    {['2024', '2025a', '2025b'].map((key) => (
      <div key={key}>
        <h4 className="font-bold text-indigo-600">{t(`about.timeline.${key}.title`)}</h4>
        <p className="text-gray-600">{t(`about.timeline.${key}.desc`)}</p>
      </div>
    ))}
  </div>
</div>

      {/* Team
      <div className="py-16 px-6 md:px-20 bg-white text-center">
        <h3 className="text-3xl font-bold text-indigo-700 mb-12">{t('about.teamTitle')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {[
            { name: 'Khalid Areen', role: t('Lead Developer') },
            { name: 'Farooq Shinwari', role: t('Research Analyst') },
            { name: 'Hamida Momand', role: t('UI/UX Designer') }
          ].map((member, i) => (
            <div key={i}>
              <img src={assets.default_avatar} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-3 shadow" />
              <h4 className="font-semibold text-lg">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div> */}
     
  {/* Team */}
<div className="py-16 px-6 md:px-20 bg-white text-center">
  <h3 className="text-3xl font-bold text-indigo-700 mb-12">{t('about.teamTitle')}</h3>

{/* Supervisor */}
  <div className="mb-16">
    <div className="inline-block">
      <img
        src={supervisorImg || assets.default_avatar}
        alt="Dr. Awais Adnan"
        className="w-80 h-80 rounded-full mx-auto mb-4 shadow-lg  object-center "
      />
      <h4 className="font-semibold text-lg">Dr. Awais Adnan</h4>
      <p className="text-sm text-gray-700">{t('Project Supervisor')}</p>
    </div>
  </div>

  {/* Team Members */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
    {[
      { name: 'Khalid Areen', role: t('Lead Developer'), image: khalidImg },
      { name: 'Farooq Shinwari', role: t('Research Analyst'), image: farooqImg },
      { name: 'Hamida Momand', role: t('UI/UX Designer'), image: hamidaImg }
    ].map((member, i) => (
      <div key={i}>
        <img
          src={member.image || assets.default_avatar}
          alt={member.name}
          className="w-60 h-60 rounded-full mx-auto mb-4 shadow-lg object-cover"
        />
        <h4 className="font-semibold text-lg">{member.name}</h4>
        <p className="text-sm text-gray-600">{member.role}</p>
      </div>
    ))}
  </div>
</div>



      {/* Testimonials */}
      <div className="bg-indigo-50 py-16 px-6 md:px-20 text-center">
        <h3 className="text-3xl font-bold text-indigo-700 mb-12">{t('about.testimonialTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow text-left">
              <p className="text-gray-700 italic">"{t(`about.testimonials.${i}.text`)}"</p>
              <h4 className="mt-4 font-semibold text-indigo-600">— {t(`about.testimonials.${i}.author`)}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center py-16 px-6 md:px-20">
        <h3 className="text-3xl font-bold mb-4">{t('about.ctaTitle')}</h3>
        <p className="text-lg mb-6">{t('about.ctaDesc')}</p>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
          {t('about.ctaBtn')}
        </button>
      </div>
    </section>
  );
};

export default About;
