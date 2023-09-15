import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/notFound.css';
const NotFound = () => {
  return (
    <div className='generalF'>
<div className='boxNotFound'>
<h1 className='textNotFound'>404 Error </h1>
<p className="zoom-area">Página no encontrada </p>
<section className="error-container">
  <span><span>4</span></span>
  <span>0</span>
  <span><span>4</span></span>
</section>
<div class="link-container">
  <Link to="/" className="more-link">Ir a la página principal</Link>
</div>
</div>

    </div>
  )
}

export default NotFound