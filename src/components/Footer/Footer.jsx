import { RiCopyrightLine } from 'react-icons/ri';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer-main_container'>
      <span className='footer-text'>
        Epimodoro - All Rights Reserved 2024
        <RiCopyrightLine />
      </span>
    </footer>
  );
};

export default Footer;
