import './footer.css';
import GooglePlayLogo from "../assets/icons/apps/googleplay.png";
import AppStoreLogo from "../assets/icons/apps/applestore.png";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { FaInstagram } from "react-icons/fa6";

const Footer = () => (
  <footer className="footer">
    <div className="footer__content">
      <div className="footer__col">
        <h3>Verified Health Care</h3>
        <p className='footer__description'>
          Your trusted health companion, connecting you with verified,
          background-checked doctors for quality care.
        </p>
        <div className="footerDownloadSection">
          <img src={GooglePlayLogo}at="GooglePlayLogo"/>
          <img src={AppStoreLogo}altt="AppStoreLogo" />
        </div>
      </div>

      <div className="footer__col">
        <h4>Explore</h4>
        <ul>
          <li><a href="/doctors">Our Doctors</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </div>

      <div className="footer__col">
        <h4>Support</h4>
        <ul>
          <li><a href="/faq">FAQs</a></li>
          <li><a href="/help-center">Help Center</a></li>
          <li><a href="/contact">Contact Us</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </div>

      <div className="footer__col">
        <h4>Connect</h4>
        <div className="footer__social">
          <a href="https://www.facebook.com/"><FaFacebookF /></a>
          <a href="https://in.linkedin.com/"><FaLinkedinIn /></a>
          <a href="https://in.linkedin.com/"><IoLogoTwitter /></a>
          <a href="https://www.instagram.com/"><FaInstagram /></a>
        </div>
        <p>Email: <a href="mailto:support@vhc.health">support@vhc.health</a></p>
        <p>Phone: <a href="tel:+919876543210">+91 98765 43210</a></p>
      </div>
    </div>

    <div className="footer__bottom">
      <p className='footerCopyright'>&copy; {new Date().getFullYear()} Hiscope Enterprises. All rights reserved.</p>
      <div className="footer__legal">
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
      </div>
    </div>
  </footer>
);

export default Footer;
