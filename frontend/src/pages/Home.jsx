import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'

const Home = () => {
  const { t } = useTranslation();

const symptoms = t('homes.symptoms', { returnObjects: true });
const specialties = [
  { title: 'Quick Consultation', image: '5.png' },
  { title: 'Psychiatrist', image: '6.png' },
  { title: 'Gynecologist', image: '7.png' },
  { title: 'Dermatologist', image: '8.png' },
  { title: 'Urologist', image: '9.png' },
  { title: 'Show more', image: '21.png' },
];
const testimonials = t('homes.testimonials', { returnObjects: true });

const Steps_Section=[
        {
          icon: '22.png',
          title: 'Search',
          desc: 'Explore our diverse range of healthcare professionals by specialty, location, or other preferences.',
        },
        {
          icon: '23.png',
          title: 'Select',
          desc: 'Choose the doctor that best fits your needs by reviewing their profiles, expertise, and patient reviews',
        },
        {
          icon: '24.png',
          title: 'Book',
          desc: 'Pick a convenient date and time from the available slots for an in-clinic or virtual appointment.',
        },
      ]
const blogs = t('homes.blogs', { returnObjects: true });
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
    <div className="relative px-6 py-12 overflow-hidden bg-white md:px-20">
  <div className="flex flex-col-reverse items-center justify-between mx-auto lg:flex-row max-w-7xl">
    {/* Left - Text and Search */}
    <div className="w-full lg:w-1/2">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 font-bold text-blue-700 bg-blue-100 rounded-full">
          G
        </div>
        <div>
           <p className="font-semibold text-gray-800">{t('home.welcome')}</p>
                <p className="text-sm text-gray-500">{t('home.difficulty')}</p>
        </div>
      </div>

      <h1 className="text-4xl font-bold leading-snug md:text-5xl">
         {t('home.hero1')} <span className="text-blue-600">{t('home.heroHighlight')}</span> {t('home.hero2')}
      </h1>

      {/* Search Bar */}
      <div className="flex items-center max-w-xl gap-3 p-4 mt-6 bg-white rounded-full shadow-md">
        <select className="w-32 text-sm text-gray-600 bg-transparent border-none outline-none">
          <option>{t('home.selectCity')}</option>
          <option value="Kabul">Kabul</option>
           <option value="Jalalabad">Jalalabad</option>
           <option value="Herat">Herat</option>
           <option value="Mazar-i-Sharif">Mazar-i-Sharif</option>
           <option value="Kandahar">Kandahar</option>
           <option value="Khost">Khost</option>
           <option value="Kunduz">Kunduz</option>
           <option value="Kunar">Kunar</option>
           <option value="Hilmand">Hilmand</option>
        </select>
        <FaMapMarkerAlt className="text-blue-600" />
        <input
          type="text"
           placeholder={t('home.searchPlaceholder')}
          className="flex-1 text-sm border-none outline-none"
        />
        <FaSearch className="text-blue-600 cursor-pointer" />
      </div>
    </div>

    {/* Right - Doctor Image */}
    <div className="relative z-10 flex justify-end w-full mb-10 lg:w-1/2 lg:mb-0">
      <img
        src="36.png" 
        alt="Doctor"
        className="w-[320px] h-auto object-contain"
      />
    </div>
  </div>

  {/* Optional Background Shape */}
  <div className="absolute right-0 top-0 w-[50%] h-full bg-sky-500 rounded-l-full z-0 hidden lg:block"></div>
</div>




      {/* Categories */}
   <div className="grid grid-cols-3 gap-4 px-6 mt-6 md:grid-cols-6 md:px-20">
  {specialties.map(({ title, image }) => (
    <Link
      key={title}
      to={`/doctors?speciality=${encodeURIComponent(title)}`}
      className="block px-2 py-6 text-center transition bg-white rounded-lg shadow hover:shadow-md"
    >
      <div className="mx-auto mb-3 w-14 h-14">
        <img src={image} alt={t(`specialities.${title}`, title)} className="object-contain w-full h-full" />
      </div>
      <p className="text-sm font-semibold">{t(`specialities.${title}`, title)}</p>
    </Link>
  ))}
</div>

      {/* Services Grid */}
     <div className="grid grid-cols-2 gap-6 px-6 mt-10 md:grid-cols-4 md:px-20">
  {[
    {
      key: 'onlineNow',
      image: '1.png',
      bgColor: 'bg-[#fef3e7]'
    },
    {
      key: 'inClinic',
      image: '2.png',
      bgColor: 'bg-[#eaf0fc]'
    },
    {
      key: 'onlineConsult',
      image: '3.png',
      bgColor: 'bg-[#d9f0fb]'
    },
    {
      key: 'sickNote',
      image: '4.png',
      bgColor: 'bg-[#dbfdfc]'
    }
  ].map((item) => (
    <div
      key={item.key}
      className={`rounded-2xl overflow-hidden shadow-md transition duration-300 hover:shadow-lg`}
    >
      <div className={`h-60 p-6 flex items-center justify-center ${item.bgColor}`}>
        <img src={item.image} alt={t(`homes.services.${item.key}.title`)} className="object-contain max-h-32" />
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-sm font-semibold text-gray-800">{t(`homes.services.${item.key}.title`)}</h3>
        <p className="mt-1 text-xs text-gray-500">{t(`homes.services.${item.key}.desc`)}</p>
      </div>
    </div>
  ))}
</div>

      {/* Mental Health Promo */}
       <div className="px-6 py-10 mt-16 text-center text-white bg-cyan-500 md:px-20">
        <h2 className="text-2xl font-bold">{t('homes.mentalTitle')}</h2>
        <p className="max-w-2xl mx-auto mt-4 text-sm">{t('homes.mentalDesc')}</p>
        <Link to="/doctors">
        <button className="px-6 py-2 mt-6 font-semibold bg-white rounded text-cyan-500">
        {t('homes.bookNow')}
        </button>
      </Link>
      </div>

      <section className="px-6 py-10 md:px-20">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">{t('homes.symptomTitle')}</h2>
          <h3 className="text-2xl font-semibold text-gray-800">{t('homes.symptomSubtitle')}</h3>
          <p className="max-w-2xl mx-auto mt-4 text-gray-600">{t('homes.symptomDesc')}</p>
        </div>
      </section>
      <div className="grid grid-cols-1 gap-4 px-6 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:px-20">
        {symptoms.map((symptom, index) => (
          <div
            key={index}
            className="bg-blue-100 p-5 rounded-[30px] shadow hover:shadow-lg transition duration-300 flex flex-col gap-2 h-full"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-blue-800 rounded-full">
              <img src={symptom.icon} alt={symptom.title} className="object-contain w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-black">{symptom.title}</h4>
            <p className="text-sm text-gray-800">{symptom.desc}</p>
          </div>
        ))}
      </div>
      <section className="px-6 py-10 md:px-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t('homes.blogsTitle')}</h2>
          <a href="/blogs" className="text-sm text-gray-600 hover:text-blue-600">{t('homes.viewAll')}</a>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {blogs.map((blog, i) => (
            <div key={i} className="overflow-hidden bg-white rounded shadow">
              <div className="w-full overflow-hidden aspect-video">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover object-[center_10%]"
                />
              </div>
              <p className="py-2 font-semibold text-center">{blog.title}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Testimonials Section */}
     <section className="bg-[#88c6f0] py-10 px-6 md:px-20">
        <h2 className="mb-8 text-2xl font-bold text-center text-white md:text-3xl">{t('homes.testimonialsTitle')}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((user, i) => (
            <div key={i} className="flex items-start gap-4 p-6 bg-white shadow-md rounded-xl">
              <img src={user.image} alt={user.name} className="object-cover w-12 h-12 rounded-full" />
              <div>
                <h4 className="mb-1 text-base font-bold">{user.name}</h4>
                <div className="flex items-center mb-1 text-sm text-yellow-500">
                  {'★★★★★'.split('').map((star, j) => <span key={j}>{star}</span>)}
                </div>
                <p className="text-sm text-gray-700">
                  {user.review.slice(0, 100)}...
                  <a href="#" className="ml-1 text-blue-500">{t('homes.readMore')}</a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Booking Steps */}
      <div className="px-6 py-16 bg-white md:px-20">
   <h2 className="mb-12 text-3xl font-bold text-center">{t('home.stepsTitle')}</h2>
  <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
    {/* Phone Image */}
    <div className="flex justify-center w-full lg:w-1/2">
      <img src={"37.png"} alt="Mobile App" className="w-full max-w-xs" />
    </div>

    {/* Steps Section */}
    
    <div className="w-full space-y-8 lg:w-1/2">
      {Steps_Section.map((step, i) => (
        <div key={i} className="flex items-start gap-4">
      <div className="p-3 bg-blue-100 rounded-full">
        <img src={step.icon} alt={t(`homes.steps.${i}.title`)} className="w-6 h-6" />
      </div>
      <div>
        <h4 className="mb-1 text-lg font-bold">{t(`homes.steps.${i}.title`)}</h4>
        <p className="text-sm text-gray-600">{t(`homes.steps.${i}.desc`)}</p>
      </div>
    </div>
      ))}
      <Link to="/doctors">
      <button className="px-6 py-2 mt-6 font-semibold text-white transition bg-blue-600 rounded hover:bg-blue-700">
       {t('home.findDoctor')}
      </button>
      </Link>
    </div>
  </div>
</div>
    </div>
  );
};

export default Home;