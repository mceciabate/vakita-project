import Cow from "../assets/misvaquitas.png";
import Hands from "../assets/telefonoDescubre.png";
import Goals from "../assets/goals.svg";

const sections_dashboards = [
    {
        "title": "Mis Vaquitas",
        "link":"/dashboard/mis-vaquitas",
        "img": `${Cow}`,
        "color": "#FFE4E5",
        "texto": "Si eliges esta opción podras ver todas las vaquitas que haz creado con tus amigos :)",

        "onlyMobile": false
    },
    {
        "title": "Nueva vaca",
        "img": `${Hands}`,
        "link":"/dashboard/crear-vaca",
        "color": "#E1DAEC",
        "texto": "Si eliges esta opción podras crear todas las vaquitas que quieras  con tus amigos :)",
        "onlyMobile": false
    },
    // {        
    //     "title": "Metas",
    //     "img": `${Goals}`,
    //     "onlyMobile": true
    // },
];

export default sections_dashboards