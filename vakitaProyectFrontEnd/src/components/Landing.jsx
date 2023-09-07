import React from "react";
import "../styles/landing.css"
import UsuarioImg1 from "../assets/usuario1.png";
import UsuarioImg2 from "../assets/usuario2.png";
import UsuarioImg3 from "../assets/usuario3.png";
import ImagenEquipo from "../assets/equipo.png";
import ImagenTelefonoMoneda from "../assets//telefonoDescubre.png";
import ImagenTelefonoServicio from "../assets/telefonoServicio.png";



function LandingComponent() {


  return (


    <div className="landing">

      <div className="propaganda">

        <h1 className="Titulo-propaganda">VAKITA</h1>
        <p className="Texto-propaganda">¡Hacer una vaquita con tus amigos nunca habia sido tan fácil!</p>
      </div>



      <div className="contenedor-quienesSomos">

        <div className="info-quienesSomos">

          <h1 className="titulo-infoQuienes">Quiénes somos</h1>
          <p className="texto-infoQuienes">En el corazón mismo de América Latina late una pasión innegable por la comunidad. Por eso, en Vakita nos definimos por nuestra voluntad de ayudar, compartir y unir fuerzas para lograr algo más grande que nosotros mismos. Frases como "¿Hacemos una vaquita?" han marcado el comienzo de innumerables aventuras compartidas, de objetivos cumplidos y de sueños que se han convertido en realidad. En honor a todos aquellos que creen en el poder de proponer, en la fuerza de la unión, nace la web-app VAKITA.</p>
        </div>

        <img className="imagen-equipo" src={ImagenEquipo} alt="logo" />

      </div >



      <div className="contenedor-descubreVakita">
        <img className="imagen-telefonoMoneda" src={ImagenTelefonoMoneda} alt="logo" />

        <div className="info-descubreVakita">

          <h1 className="titulo-infoDescubre">Descubre Vakita</h1>
          <p className="texto-infoDescubre">Vakita no es solo una aplicación, es el eco digital de nuestra conexión humana única. Es la transformación de las palabras que nos unen en la fuerza que nos impulsa a lograr grandes cosas juntos.</p>
        </div>

      </div >


      <div className="contenedor-comoFunciona">
        <h1 className="titulo-Funciona">Cómo Funciona</h1>


        <div className="cardsContainer-comoFunciona">

          <div className="cards-comoFunciona">
            <h3 className="titulo-comoFunciona">Crea tu propia Vakita</h3>
            <p className="texto-comoFunciona"> Primero, define tu objetivo de financiamiento. Comparte por qué es importante para ti y define el monto que requieres para hacerlo realidad</p>
          </div>

          <div className="cards-comoFunciona">
            <h3 className="titulo-comoFunciona">Invita a colaboradores</h3>
            <p className="texto-comoFunciona"> Invita a amigos, familiares y colegas a unirse a tu Vakita, y ellos podrán aportar desde su cuenta al registrarse en nuestra web. </p>
          </div>

          <div className="cards-comoFunciona">
            <h3 className="titulo-comoFunciona">Alcanza tu meta</h3>
            <p className="texto-comoFunciona"> Celebra cada paso hacia tu objetivo junto con una comunidad que comparte tu visión y al llegar al objetivo podrás retirar tu dinero y lograr cumplir tu proyecto.</p>
          </div>
        </div>

      </div >


      <div className="contenedor-serviciosOfrecidos">


        <div className="serviciosOfrecidos" >

          <h1 className="titulo-serviciosOfrecidos">Servicios que Ofrecemos</h1>

          <div className="info-serviciosOfrecidos">
            <p className="texto-serviciosOfrecidos">🤝 Plataforma Intuitiva: Nuestra aplicación fácil de usar te permite crear y gestionar tu Vakita en pocos pasos. No se requieren conocimientos técnicos. </p>
          </div>

          <div className="info-serviciosOfrecidos">
            <p className="texto-serviciosOfrecidos">🌎 Conexiones con otros: Vakita te une con personas apasionadas como tú. A través de nuestra plataforma colabora con individuos que comparten tus intereses.</p>
          </div>

          <div className="info-serviciosOfrecidos2">
            <p className="texto-serviciosOfrecidos">📊 Seguimiento Transparente: Mantén un registro de cada contribución y observa cómo tu objetivo se acerca. La transparencia es la base de nuestra plataforma.</p>
          </div>

        </div>

        <img className="imagen-telefono" src={ImagenTelefonoServicio} alt="logo" />


      </div>























      <div className="contenedor-comentarios-usuaio">

        <div className="card-usuario">
          <div className="informacion-usuario">
            <img className="imagen-usuario" src={UsuarioImg1} alt="logo" />


            <div className="nombre-usario">
              <h1>PEPITO</h1>
              <h3 className="user" >VAKITA USER</h3>

            </div>


          </div>

          <div className="comentario-usuario">

            <h3>"Vakita hizo posible que mi proyecto de voluntariado se convirtiera en realidad. Mis amigos y yo recaudamos fondos para suministros escolares en una comunidad remota.”</h3>
          </div>


        </div>


        <div className="card-usuario">
          <div className="informacion-usuario">
            <img className="imagen-usuario" src={UsuarioImg2} alt="logo" />


            <div className="nombre-usario">
              <h1>JUANA</h1>
              <h3 className="user">VAKITA USER</h3>

            </div>


          </div>

          <div className="comentario-usuario">

            <h3>"La app Vakita me ha conectado con personas increíbles que comparten mi amor por el arte urbano. Juntos, organizamos una exposición que jamás olvidaremos."</h3>
          </div>


        </div>



        <div className="card-usuario">
          <div className="informacion-usuario">
            <img className="imagen-usuario" src={UsuarioImg3} alt="logo" />


            <div className="nombre-usario">
              <h1>LA MIAU</h1>
              <h3 className="user">VAKITA USER</h3>

            </div>


          </div>

          <div className="comentario-usuario">

            <h3>"VAKITA me ha conectado con personas que comparten mi ambición de emprender. Creamos un fondo colaborativo que aceleró el lanzamiento de mi negocio." </h3>
          </div>


        </div>


      </div>






















      <div className="for-all">
        <div className="for-all__text">
          <h2 className="for-all__text--h2">Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;</h2>

        </div>
        <div className="for-all__text-2">
          <h2 className="for-all__text--h2">Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;Ahorro colaborativo &nbsp;• &nbsp;Impulsa tus sueños &nbsp;• &nbsp;Rápido • &nbsp;Sencillo &nbsp;• &nbsp;</h2>

        </div>

      </div>








    </div >






  );
}

export default LandingComponent;
