import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import {
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="pt-12 text-sm text-gray-700 bg-white">
      <div className="grid grid-cols-1 gap-8 px-6 md:grid-cols-5 md:px-20">
        {/* Logo & Description */}
        <div className="md:col-span-1">
          <img src={"31.png"} alt="Logo" className="w-20 mb-3 h-28" />
          <p>{t("footer.empower")}</p>
          <p className="mt-1">{t("footer.supportPrompt")}</p>
          {/* <p className="mt-1 font-medium text-blue-600">{t("footer.email")}</p> */}
  <a href="mailto:khalidareen8@gmail.com" className="mt-1 font-medium text-blue-600 hover:underline" >
    khalidareen8@gmail.com
  </a>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-2 font-semibold text-black">
            {t("footer.services")}
          </h3>
          <ul className="space-y-1">
            <li>{t("services.Hydrafacial")}</li>
            <li>{t("services.Angiography")}</li>
            <li>{t("services.Gastroscopy")}</li>
            <li>{t("services.Epilepsy")}</li>
            <li>{t("services.BehavioralTherapy")}</li>
            <li className="font-medium text-blue-600">{t("footer.viewAll")}</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="mb-2 font-semibold text-black">
            {t("footer.company")}
          </h3>
          <ul className="space-y-1">
            <li>{t("company.SickNote")}</li>
            <li>{t("company.Ambulance")}</li>
            <li>{t("navbar.aboutUs")}</li>
            <li>{t("company.ContactUs")}</li>
            <li>{t("company.Blogs")}</li>
            <li>{t("company.FAQs")}</li>
            <li>{t("company.PrivacyPolicy")}</li>
            <li>{t("company.Terms")}</li>
          </ul>
        </div>

        {/* Major Cities */}
        <div>
          <h3 className="mb-2 font-semibold text-black">
            {t("footer.cities")}
          </h3>
          <ul className="space-y-1">
            {[
              "Kabul",
              "Jalalabad",
              "Herat",
              "Mazar-i-Sharif",
              "Kandahar",
              "Khost",
              "Kunduz",
              "Kunar",
              "Hilamand",
            ].map((city) => (
              <li key={city}>{t(`cities.${city}`, city)}</li>
            ))}
            <li className="font-medium text-blue-600">{t("footer.viewAll")}</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-2 font-semibold text-black">
            {t("footer.newsletter")}
          </h3>
          <p className="mb-1">{t("footer.emailLabel")}</p>
          <input
            type="email"
            placeholder={t("footer.enterEmail")}
            className="w-full px-3 py-2 mb-2 border rounded"
          />
          <button className="w-full px-4 py-2 text-white bg-blue-600 rounded">
            {t("footer.subscribe")}
          </button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col items-center justify-between gap-3 px-6 py-4 mt-8 text-sm text-gray-700 border-t md:px-20 md:flex-row">
        {/* <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-600" />
          <span>{t("footer.address")}</span>
        </div> */}
       
<div className="flex items-center gap-2">
  <FaMapMarkerAlt className="text-blue-600" />
  <a
    href="https://www.google.com/maps/search/?api=1&query=2601+GPO+Jalalabad+Nangarhar+Afghanistan"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-800 hover:underline"
  >
    Jalalabad, Nangarhar, Afghanistan
  </a>
</div>



        <div className="flex items-center gap-4">
          {/* Email */}
          <FaEnvelope className="text-blue-600" />
          <a
            href="mailto:khalidareen8@gmail.com"
            className="text-gray-800 hover:underline"
          >
            khalidareen8@gmail.com
          </a>

          {/* Phone */}
          <FaPhoneAlt className="text-blue-600" />
          <span>{t("footer.phone")}</span>
        </div>

        {/* Social media */}

        <div className="flex items-center gap-4 mt-2 text-lg md:mt-0">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/khalid-safi-2k02?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BfjEG8zNFQpqm22nwSBmuDQ%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn className="text-blue-800 transition-transform hover:scale-110" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/khalid-safi20"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-gray-800 transition-transform hover:scale-110" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/khalid_areen/profilecard/?igsh=MTBlNWM4cnRtcm5jYw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-pink-600 transition-transform hover:scale-110" />
          </a>

          {/* Facebook (you didn’t provide a link, keep placeholder or remove) */}
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="text-blue-600 transition-transform hover:scale-110" />
          </a>

          {/* YouTube (placeholder for now) */}
          <a
            href="https://youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="text-red-600 transition-transform hover:scale-110" />
          </a>

          {/* WhatsApp (placeholder for now) */}
          <a
            href="https://wa.me/yourNumber"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="text-green-500 transition-transform hover:scale-110" />
          </a>

          {/* TikTok (placeholder for now) */}
          {/* <a
            href="https://tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok className="text-black transition-transform hover:scale-110" />
          </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
