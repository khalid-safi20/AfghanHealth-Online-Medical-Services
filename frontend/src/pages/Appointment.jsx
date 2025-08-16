import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const Appointment = () => {
  const { t } = useTranslation();
  const { docId } = useParams();
  const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day =>
    t(`days.${day}`, day)
  );

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const navigate = useNavigate();

  // Fetch doctor info from context or API
  const fetchDocInfo = async () => {
    let foundDoctor = doctors.find(doc => doc._id === docId);
    if (!foundDoctor) {
      try {
        const { data } = await axios.get(`${backendUrl}/api/doctor/${docId}`);
        if (data.success) {
          foundDoctor = data.doctor;
        }
      } catch (err) {
        console.error('Error fetching doctor:', err);
      }
    }
    setDocInfo(foundDoctor || null);
  };

  // Get available slots for 7 days
  const getAvailableSlots = () => {
    if (!docInfo) return;
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      const bookedSlots = docInfo.slots_booked?.[`${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`] || [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });

        if (!bookedSlots.includes(formattedTime)) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => [...prev, timeSlots]);
    }
  };

  // Book appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warning(t('appointment.loginToBook', 'Please login to book an appointment'));
      return navigate('/login');
    }

    if (!slotTime) {
      toast.error(t('appointment.selectSlotWarning', 'Please select a time slot'));
      return;
    }

    const selectedDate = docSlots[slotIndex]?.find(slot => slot.time === slotTime)?.datetime;
    if (!selectedDate) {
      toast.error('Invalid slot selection');
      return;
    }

    const slotDate = `${selectedDate.getDate()}_${selectedDate.getMonth() + 1}_${selectedDate.getFullYear()}`;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  if (!docInfo) return <p className="mt-10 text-center">Loading doctor information...</p>;

  return (
    <div>
      {/* Doctor Info */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div>
          <img
            className="bg-[#F5EFFF] w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt={docInfo.name}
          />
        </div>
        <div className="flex-1 border border-[#7E60BF] rounded-lg p-8 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {docInfo.name} <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="py-0.5 px-2 border border-[#7E60BF] text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
              {t('appointment.about', 'About')} <img className="w-3" src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">{docInfo.about}</p>
          </div>
          <p className="mt-4 font-medium text-gray-600">
            {t('appointment.fee', 'Fee')}:
            <span className="text-gray-800"> {docInfo.fees} AFN ؋</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]">
        <p>{t('appointment.bookingSlots', 'Booking Slots')}</p>
        <div className="flex items-center w-full gap-3 mt-4 overflow-x-scroll">
          {docSlots.map((slots, index) => (
            <div
              key={index}
              onClick={() => {
                setSlotIndex(index);
                setSlotTime('');
              }}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                slotIndex === index ? 'bg-primary text-white' : 'border border-[#7E60BF]'
              }`}
            >
              {slots.length > 0 ? (
                <>
                  <p>{daysOfWeek[slots[0].datetime.getDay()]}</p>
                  <p>{slots[0].datetime.getDate()}</p>
                </>
              ) : (
                <p className="text-xs text-red-500">No slots</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center w-full gap-3 mt-4 overflow-x-scroll">
          {docSlots[slotIndex]?.length > 0 ? (
            docSlots[slotIndex].map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? 'bg-primary text-white'
                    : 'text-[#949494] border border-[#7E60BF]'
                }`}
              >
                {item.time.toLowerCase()}
              </p>
            ))
          ) : (
            <p className="text-sm text-red-500">No slots available for this day</p>
          )}
        </div>

        <button
          onClick={bookAppointment}
          className="px-20 py-3 my-6 text-sm font-light text-white rounded-full bg-primary"
        >
          {t('appointment.bookNow', 'Book Now')}
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  );
};

export default Appointment;
