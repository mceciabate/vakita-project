import React from 'react';
import "../../styles/newVakitaPage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes } from "@fortawesome/free-solid-svg-icons"

const ShareButton = ({ url }) => {
  const handleShare = () => {
    const webWhatsAppUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(url)}`;
    window.open(webWhatsAppUrl, '_blank');
  };

  return (
    <button  className='shared' onClick={handleShare}>
       <FontAwesomeIcon icon={faShareNodes}  size="xl" /><p className='textShared'>Invitar</p>
    </button>
  );
};

export default ShareButton;

