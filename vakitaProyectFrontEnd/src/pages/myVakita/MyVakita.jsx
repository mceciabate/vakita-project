// import React, { useEffect, useState } from 'react';
// import { VakitaContext } from '../../context/VakitaProvider';
// import { useContext } from 'react';
// import '../../styles/myVakitaPage.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser} from '@fortawesome/free-solid-svg-icons';
// import chart from "../../assets/chart.png"
// import axios from 'axios';

// const MyVakita = () => {
//   const { dataVakita } = useContext(VakitaContext);
//   const [allMyVakita, setAllMyVakita]=useState([])

//   useEffect(() => {
//     const loadData = async () => {
//       await axios.get("http://localhost:8080/api/v1/vakita/user/8").then((res) => {
        
       
//         console.log(res.data);
//         setAllMyVakita(res.data)
//       });
//     };
//     loadData();
//   }, []);
  

//   const renderDataMyVakita = () => {
//     return allMyVakita?.map((vakita, index) => (
//       <div className="cardMyVakita" key={index}>
//         <div>
//           <div>
//             <h3 className='titleMyVaquita'>{vakita.name}</h3>
//           </div>
//           <div>
//           <h3 className="titleMyVaquita" >{ "Meta de ahorro: $"+ vakita.totalAmount}</h3>
//           </div>
//         </div>
//         <div className='BoxMembersAndChart'>
//           <div><img  src={chart} alt="chart"/></div>
//           <div className='memebersMyVakita'>
           
//     {vakita.contributors.map((contributor, index) => (
//       <div key={index}>
//       <div  className='usersMyVakita'>
      
//       <div className='userIcon'>
//       <FontAwesomeIcon icon={faUser} />
//     </div> 
//     <p>{contributor.email}</p>
//     </div>
//     </div>
//     ))} 
//   </div>
//         </div>
//       </div>
//     ));
//   };

//   return (
//     <>
//     <div className='pageMyVakita'>
//       <h2 className='h2'>Mis vaquitas</h2>
//       <h3 className='h3'>Activas</h3>
//       <div className="containerPageMyVakita">
//         {renderDataMyVakita()}
//       </div>
//       </div>
      
//     </>
//   );
// };

// export default MyVakita;

import React, { useEffect, useState } from 'react';
import { VakitaContext } from '../../context/VakitaProvider';
import { useContext } from 'react';
import '../../styles/myVakitaPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

const MyVakita = () => {
  const { dataVakita } = useContext(VakitaContext);
  const [allMyVakita, setAllMyVakita] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      await axios.get("http://localhost:8080/api/v1/vakita/contributors/8").then((res) => {
        console.log(res.data);
        setAllMyVakita(res.data);
      });
    };
    loadData();
  }, []);

  const renderDataMyVakita = () => {
    return allMyVakita?.map((vakita, index) => {
      // const totalContributed = vakita.contributors.reduce(
      //   (total, contributor) => total + contributor.amount,
      //   0
      // );
      // const remainingAmount = vakita.totalAmount - totalContributed;
      // const totalPercentage = (totalContributed / vakita.totalAmount) * 100;
      // const remainingPercentage = 100 - totalPercentage;
   
      const totalContributed = vakita.cumulativeAmount;
      const remainingAmount = vakita.totalAmount - totalContributed;
      const totalPercentage = (totalContributed / vakita.totalAmount) * 100;
      const remainingPercentage = 100 - totalPercentage;
      return (
        <div className="cardMyVakita" key={index}>
          <div>
            <div>
              <h3 className='titleMyVaquita'>{vakita.name}</h3>
            </div>
            <div>
              <h3 className="titleMyVaquita">{ "Meta: $" + vakita.totalAmount}</h3>
            </div>
          </div>
          <div className='BoxMembersAndChart'>
            <div className='chartContainer'>
              <Doughnut
                data={{
                  labels: ['Contribuido', 'Restante'],
                  datasets: [
                    {
                      // data: [totalPercentage, remainingPercentage],
                      data: [totalPercentage, remainingPercentage],
                      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Progreso de ahorro',
                    },
                  },
                }}

              />
            </div>
            <div className='memebersMyVakita'>
              {vakita.contributors.map((contributor, index) => (
                <div key={index}>
                  <div className='usersMyVakita'>
                    <div className='userIcon'>
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    <p>{contributor.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className='pageMyVakita'>
        <h2 className='h2'>Mis vaquitas</h2>
        <h3 className='h3'>Activas</h3>
        <div className="containerPageMyVakita">
          {renderDataMyVakita()}
        </div>
      </div>
    </>
  );
};

export default MyVakita;

