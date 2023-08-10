import Cow from "../assets/cow.svg";
import Hands from "../assets/hands.svg";
import Goals from "../assets/goals.svg";

const sections_dashboards = [
    {
        "title": "Mis Vaquitas",
        "link":"/menu/mis-vaquitas",
        "img": `${Cow}`,
        "onlyMobile": false
    },
    {
        "title": "Hagamos una vaca",
        "img": `${Hands}`,
        "link":"/menu/crear-vaca",
        "onlyMobile": false
    },
    // {        
    //     "title": "Metas",
    //     "img": `${Goals}`,
    //     "onlyMobile": true
    // },
];

export default sections_dashboards