<<<<<<< HEAD
import Cow from "../assets/cow.svg";
import Hands from "../assets/hands.svg";
import Goals from "../assets/goals.svg";

=======
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
const sections_dashboards = [
    {
        "title": "Mis Vaquitas",
        "link":"/dashboard/mis-vaquitas",
<<<<<<< HEAD
        "img": `${Cow}`,
        "onlyMobile": false
    },
    {
        "title": "Hagamos una vaca",
        "img": `${Hands}`,
        "link":"/dashboard/crear-vaca",
=======
        "img": `https://grupo3-vakita.s3.amazonaws.com/assets/misvaquitas.png`,
        "color": "#FFE4E5",
        "texto": "Si eliges esta opción podras ver todas las vaquitas que haz creado con tus amigos :)",

        "onlyMobile": false
    },
    {
        "title": "Nueva vaca",
        "img": `https://grupo3-vakita.s3.amazonaws.com/assets/telefonoDescubre.png`,
        "link":"/dashboard/crear-vaca",
        "color": "#E1DAEC",
        "texto": "Si eliges esta opción podras crear todas las vaquitas que quieras  con tus amigos :)",
>>>>>>> 0669857aea63fd27b3bc84f13b48e135fce438dc
        "onlyMobile": false
    },
    // {        
    //     "title": "Metas",
    //     "img": `${Goals}`,
    //     "onlyMobile": true
    // },
];

export default sections_dashboards