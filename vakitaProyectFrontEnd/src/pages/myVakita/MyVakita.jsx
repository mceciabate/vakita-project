
import React, { useEffect, useState } from 'react';
import '../../styles/myVakitaPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHandHoldingDollar} from '@fortawesome/free-solid-svg-icons';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import { useUser } from '../../context/UserProvider';


const MyVakita = () => {
 
  const [allMyVakita, setAllMyVakita] = useState([]);
  const {userId} = useUser();

  const token = JSON.parse(localStorage.getItem("token"));

 

      useEffect(() => {
        if (userId !== null) {
          const loadData = async () => {
            await axios.get(`http://107.22.65.36:8080/api/v1/vakita/actives/${userId}`,{
              headers: {
                "Content-type": "application/json",   
                Authorization: `Bearer ${token}`,
              },
            }).then((res) => {
              setAllMyVakita(res.data);
            });
          };
          loadData();
        }
      }, [userId, token]);

  

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

          <div > 
          <button className='save-button' ><FontAwesomeIcon icon={faHandHoldingDollar} /></button>
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

