import React from 'react';
import "../../styles/newVakitaPage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes } from "@fortawesome/free-solid-svg-icons"

const ShareButton = ({ url }) => {
  const mensajePersonalizado = "🚀 *¡Únete a Vakita y conecta con personas apasionadas como tú!* 🤝 Somos más que una aplicación; somos la manifestación de la frase *'¿Hacemos una vaquita?'*, que desencadena aventuras compartidas, logros y sueños. 💪 Descubre cómo nuestras palabras nos impulsan a lograr cosas increíbles juntos en Vakita. ✨"

  const handleShare = () => {
    const mensajeEncoded = encodeURIComponent(mensajePersonalizado);
    const webWhatsAppUrl = `https://web.whatsapp.com/send?text=${mensajeEncoded}%0A${encodeURIComponent(url)}`;
    window.open(webWhatsAppUrl, '_blank');
  };

  return (
    <button type="button" className='shared' onClick={handleShare}>
       <FontAwesomeIcon icon={faShareNodes}  size="xl" /><p className='textShared'>Invitar</p>
    </button>
  );
};

export default ShareButton;


