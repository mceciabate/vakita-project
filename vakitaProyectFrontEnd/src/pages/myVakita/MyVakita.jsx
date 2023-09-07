import { useEffect, useState } from 'react';
import '../../styles/myVakitaPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";


const MyVakita = () => {
  const [allMyVakita, setAllMyVakita] = useState([]);
  const [cardAliases, setCardAliases] = useState([]);
  const [chartData, setChartData] = useState([]);

  const token = JSON.parse(localStorage.getItem("token"));
  const userId = localStorage.getItem("userId");

  const decoded = jwt_decode(token);
  const emailUser = decoded.sub;



  useEffect(() => {
    if (userId !== null) {
      const loadCardAliases = async () => {
        try {
          const response = await axios.get(`http://107.22.65.36:8080/api/v1/payment/personal/${userId}`, {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,

            },
          });
      
          const aliases = response.data.map(card => card.alias);
      
          setCardAliases(aliases);
        } catch (error) {
        
          console.error("Error fetching card aliases:", error);
        }
      };
      loadCardAliases();
    }
  }, [userId, token]);

  useEffect(() => {
    if (userId !== null) {
      const loadData = async () => {
        await axios.get(`http://107.22.65.36:8080/api/v1/vakita/actives/${userId}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          setAllMyVakita(res.data);
          const initialChartData = res.data.map((vakita) => {
            const totalContributed = vakita.transactions.reduce(
              (total, transaction) => total + transaction.amount,
              0
            );
            const remainingAmount = vakita.totalAmount - totalContributed;
    
            return {
              totalContributed,
              remainingAmount,
            };
          });
    
          setChartData(initialChartData);
        });
      };
      loadData();
    }
  }, [userId, token]);

  const updateChartData = (index, newData) => {
    setChartData((prevChartData) => {
      const updatedChartData = [...prevChartData];
      updatedChartData[index] = newData;
      return updatedChartData;
    });
  };

  const payVakita = async (vakitaId, index) => {
    try {
      const { value: formValues, isDismissed } = await Swal.fire({
        title: 'Cargar fondos',
        html:
          '<select id="card-number" class="swal2-input">' +
          cardAliases.map((alias, index) => `<option value="${alias}" key="${index}">${alias}</option>`).join('') +
          '</select>' +
          '<input id="amount" class="swal2-input" placeholder="Importe a cargar">',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        preConfirm: () => {
          const cardNumber = document.getElementById('card-number').value;
          const amount = parseFloat(document.getElementById('amount').value);
          if (!cardNumber || isNaN(amount) || amount <= 0) {
            Swal.showValidationMessage('Por favor, complete correctamente los campos.');
            return false;
          }
    
          return { cardNumber, amount };
        },
      });
    
      if (isDismissed) {
        return;
      }
    
      const { cardNumber, amount } = formValues;
    
      const response = await fetch(
        `http://107.22.65.36:8080/api/v1/vakita/deposit?amount=${amount}&vakitaId=${vakitaId}&userId=${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
      if (response.status === 200) {
        const updatedTotalContributed = chartData[index]?.totalContributed + amount || amount;
        const updatedRemainingAmount = chartData[index]?.remainingAmount - amount || 0;
        updateChartData(index, {
          totalContributed: updatedTotalContributed,
          remainingAmount: updatedRemainingAmount,
        });
    
        Swal.fire({
          icon: 'success',
          title: 'Ingreso de dinero exitoso',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al ingresar dinero en la vakita',
        });
      }
    } catch (error) {
      console.error('Error fetching vakita information:', error);
    }
  };

  const renderDataMyVakita = () => {
    return allMyVakita?.map((vakita, index) => {
      const totalContributed = chartData[index]?.totalContributed || 0;
      const remainingAmount = chartData[index]?.remainingAmount || vakita.totalAmount;

      const sortedContributors = [...vakita.contributors];
      const matchingContributorIndex = sortedContributors.findIndex(contributor => contributor.email === emailUser);

      if (matchingContributorIndex !== -1) {
        const matchingContributor = sortedContributors.splice(matchingContributorIndex, 1)[0];
        sortedContributors.unshift(matchingContributor);
      }

      return (
        <div className="cardMyVakita" key={index}>
          <div>
            <button className='save-button' onClick={() => { payVakita(vakita.id, index) }} ><FontAwesomeIcon icon={faHandHoldingDollar} /></button>
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
                      data: [totalContributed, remainingAmount],
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
              {sortedContributors.map((contributor, cIndex) => (
                <div
                  key={cIndex}
                  className={`usersMyVakita ${
                    contributor.email === emailUser ? 'highlighted' : ''
                  }`}
                >
                  <div className={`userIcon ${contributor.email === emailUser ? 'youIcon' : ''}`}>
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <p>{contributor.email === emailUser ? 'Tú' : contributor.email}</p>
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





