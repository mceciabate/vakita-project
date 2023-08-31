import React from "react";
import "../styles/landing.css"
import UsuarioImg1 from "../assets/usuario1.png";
import UsuarioImg2 from "../assets/usuario2.png";
import UsuarioImg3 from "../assets/usuario3.png";


function LandingComponent() {


  return (


    <div className="landing">

      <div className="propaganda">

        <h1 className="Titulo-propaganda">VAKITA</h1>
        <p className="Texto-propaganda">¡Hacer una vaquita con tus amigos nunca habia sido tan fácil!</p>
      </div>



      <div className="contenedor-cards">

        <div className="cards">

          <div className="cards-text">
            <p>¡Logra lo imposible juntos! Ahorra en equipo para hacer realidad eventos y proyectos increíbles.</p>
          </div>

          <div className="cards-text">
            <p>¡Adiós a contar monedas con amigos! Ahora, tendrás tu propia vaca virtual para ahorrar juntos, ¡todo en el mundo digital! 🐮💻</p>
          </div>

          <div className="cards-text">
            <p>¡Únete y sé parte de una comunidad unida! Colabora, apoya y vive una experiencia social enriquecedora con nuestra plataforma.</p>
          </div>

        </div >

        <div className="imagen-cash" />

      </div >


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

            <h3>¡Ya no se me pierde la plata! Es la mejor app del mundo :D</h3>
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

            <h3>Amo todo de esta aplicacion, su colores y su funcionalidad :3 </h3>
          </div>


        </div>



        <div className="card-usuario">
          <div className="informacion-usuario">
            <img className="imagen-usuario" src={UsuarioImg3} alt="logo" />


            <div className="nombre-usario">
              <h1>JUANA</h1>
              <h3 className="user">VAKITA USER</h3>

            </div>


          </div>

          <div className="comentario-usuario">

            <h3>Salir con mis amigos ahora es lo mas facil de mundo!! </h3>
          </div>


        </div>


      </div>






















      <div className="for-all">
        <div className="for-all__text">
          <h2 className="for-all__text--h2">Sin filas &nbsp;• &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Rápido • &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Sin filas &nbsp;• &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Rápido • &nbsp; Siempre en tu teléfono &nbsp; • &nbsp;Sin filas &nbsp;• &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Rápido • &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Sin filas &nbsp;• &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Rápido • &nbsp; Siempre en tu teléfono &nbsp;• &nbsp; Sin filas &nbsp;• &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Rápido • &nbsp;SSiempre en tu teléfono &nbsp;• &nbsp;Sin filas &nbsp;• &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Rápido • &nbsp; Siempre en tu teléfono &nbsp; • &nbsp;Sin filas &nbsp;• &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Rápido • &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Sin filas &nbsp;• &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Rápido • &nbsp; Siempre en tu teléfono &nbsp;</h2>

        </div>
        <div className="for-all__text-2">
          <h2 className="for-all__text--h2">Sin filas &nbsp;• &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Rápido • &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Sin filas &nbsp;• &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Rápido • &nbsp; Siempre en tu teléfono &nbsp; • &nbsp;Sin filas &nbsp;• &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Rápido • &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Sin filas &nbsp;• &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Rápido • &nbsp; Siempre en tu teléfono &nbsp;• &nbsp; Sin filas &nbsp;• &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Rápido • &nbsp;SSiempre en tu teléfono &nbsp;• &nbsp;Sin filas &nbsp;• &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Rápido • &nbsp; Siempre en tu teléfono &nbsp; • &nbsp;Sin filas &nbsp;• &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Rápido • &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Sin filas &nbsp;• &nbsp;Siempre en tu teléfono &nbsp;• &nbsp;Rápido • &nbsp; Siempre en tu teléfono &nbsp;</h2>

        </div>

      </div>








    </div >






  );
}

export default LandingComponent;
