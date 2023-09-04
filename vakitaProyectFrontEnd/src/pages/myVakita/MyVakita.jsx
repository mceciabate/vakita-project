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
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState(0);

  const token = JSON.parse(localStorage.getItem("token"));
  const userId = localStorage.getItem("userId");

  const decoded = jwt_decode(token);
  const emailUser = decoded.sub;

  const payVakita = () => {
    Swal.fire({
      title: 'Cargar fondos',
      html:
        '<input id="card-number" class="swal2-input" placeholder="Nro de tarjeta">' +
        '<input id="amount" class="swal2-input" placeholder="Importe a cargar">',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      preConfirm: () => {
        const cardNumber = document.getElementById('card-number').value;
        const amountValue = parseFloat(document.getElementById('amount').value);
        if (!cardNumber || isNaN(amountValue) || amountValue <= 0) {
          Swal.showValidationMessage('Por favor, complete correctamente los campos.');
        }

        setCardNumber(cardNumber);
        setAmount(amountValue);
      },
    }).then(result => {
      if (!result.isDismissed) {
        Swal.fire({
          icon: "success",
          title: "Ingreso de dinero exitoso",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

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
        });
      };
      loadData();
    }
  }, [userId, token]);

  const renderDataMyVakita = () => {
    return allMyVakita?.map((vakita, index) => {
      const totalContributed = vakita.transactions.reduce(
        (total, transaction) => total + transaction.amount,
        0
      );
      const remainingAmount = vakita.totalAmount - totalContributed;
      const totalPercentage = (totalContributed / vakita.totalAmount) * 100;
      const remainingPercentage = 100 - totalPercentage;

      const sortedContributors = [...vakita.contributors];
      const matchingContributorIndex = sortedContributors.findIndex(contributor => contributor.email === emailUser);

      if (matchingContributorIndex !== -1) {
        const matchingContributor = sortedContributors.splice(matchingContributorIndex, 1)[0];
        sortedContributors.unshift(matchingContributor);
      }
   
    
      return (
        <div className="cardMyVakita" key={index}>
          <div >
            <button className='save-button' onClick={() => { payVakita() }} ><FontAwesomeIcon icon={faHandHoldingDollar} /></button>
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


// import { useEffect, useState } from 'react';
// import '../../styles/myVakitaPage.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
// import { Doughnut } from 'react-chartjs-2';
// import 'chart.js/auto';
// import axios from 'axios';
// import Swal from "sweetalert2";
// import jwt_decode from "jwt-decode";

// const MyVakita = () => {
//   const [allMyVakita, setAllMyVakita] = useState([]);
//   const [cardNumber, setCardNumber] = useState("");
//   const [amount, setAmount] = useState(0);

//   const token = JSON.parse(localStorage.getItem("token"));
//   const userId = localStorage.getItem("userId");

//   const decoded = jwt_decode(token);
//   const emailUser = decoded.sub;

//   const payVakita = () => {
//     Swal.fire({
//       title: 'Cargar fondos',
//       html:
//         '<input id="card-number" class="swal2-input" placeholder="Nro de tarjeta">' +
//         '<input id="amount" class="swal2-input" placeholder="Importe a cargar">',
//       showCancelButton: true,
//       confirmButtonText: 'Guardar',
//       preConfirm: () => {
//         const cardNumber = document.getElementById('card-number').value;
//         const amountValue = parseFloat(document.getElementById('amount').value);
//         if (!cardNumber || isNaN(amountValue) || amountValue <= 0) {
//           Swal.showValidationMessage('Por favor, complete correctamente los campos.');
//         }

//         setCardNumber(cardNumber);
//         setAmount(amountValue);
//       },
//     }).then(result => {
//       if (!result.isDismissed) {
//         Swal.fire({
//           icon: "success",
//           title: "Ingreso de dinero exitoso",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     });
//   };

//   useEffect(() => {
//     if (userId !== null) {
//       const loadData = async () => {
//         await axios.get(`http://107.22.65.36:8080/api/v1/vakita/actives/${userId}`, {
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }).then((res) => {
//           setAllMyVakita(res.data);
//         });
//       };
//       loadData();
//     }
//   }, [userId, token]);

//   const renderDataMyVakita = () => {
//     return allMyVakita?.map((vakita, index) => {
//       // Filtrar los contribuyentes que tengan transacciones mayores a 0
//       const contributingContributors = vakita.contributors.filter((contributor) => {
//         return vakita.transactions.some(
//           (transaction) =>
//             transaction.userId === contributor.id && transaction.amount > 0
//         );
//       });

//       // Obtener los emails de los contribuyentes que contribuyeron
//       const contributingContributorsEmails = contributingContributors.map(
//         (contributor) => contributor.email
//       );

//       // Obtener los montos de las transacciones de los contribuyentes que contribuyeron
//       const contributingContributorsAmounts = contributingContributors.map(
//         (contributor) => {
//           // Calcular el monto total de las transacciones del contribuyente
//           const contributorTransactions = vakita.transactions.filter(
//             (transaction) =>
//               transaction.userId === contributor.id && transaction.amount > 0
//           );
//           const contributorTotalAmount = contributorTransactions.reduce(
//             (total, transaction) => total + transaction.amount,
//             0
//           );
//           return contributorTotalAmount;
//         }
//       );

//       // Inicializar el monto total del usuario actual en 0
//       let userTotalContributions = 0;
//       let contributorEmail = ''; // Variable para almacenar el email del contribuyente

//       const matchingContributor = vakita.contributors.find(
//         (contributor) => contributor.email === emailUser
//       );

//       if (matchingContributor) {
//         contributorEmail = matchingContributor.email; // Obtener el email del contribuyente
//         // Buscar transacciones que coincidan con el id del contribuyente
//         userTotalContributions = vakita.transactions.reduce(
//           (total, transaction) => {
//             if (transaction.userId === matchingContributor.id) {
//               return total + transaction.amount;
//             }
//             return total;
//           },
//           0
//         );
//       }

//       const remainingAmount = vakita.totalAmount - userTotalContributions;
//       const totalPercentage = (userTotalContributions / vakita.totalAmount) * 100;
//       const remainingPercentage = 100 - totalPercentage;

//       return (
//         <div className="cardMyVakita" key={index}>
//           <div>
//             <button
//               className="save-button"
//               onClick={() => {
//                 payVakita();
//               }}
//             >
//               <FontAwesomeIcon icon={faHandHoldingDollar} />
//             </button>
//             <div>
//               <h3 className="titleMyVaquita">{vakita.name}</h3>
//             </div>
//             <div>
//               <h3 className="titleMyVaquita">{ "Meta: $" + vakita.totalAmount}</h3>
//             </div>
//           </div>
//           <div className="BoxMembersAndChart">
//             <div className="chartContainer">
//               <Doughnut
//                 data={{
//                   labels: [...contributingContributorsEmails, 'Restante'],
//                   datasets: [
//                     {
//                       data: [
//                         ...contributingContributorsAmounts,
//                         remainingAmount
//                       ],
//                       backgroundColor: [
//                         'rgba(75, 192, 192, 0.6)',
//                         'rgba(255, 99, 132, 0.6)'
//                       ]
//                     }
//                   ]
//                 }}
//                 options={{
//                   responsive: true,
//                   maintainAspectRatio: false,
//                   plugins: {
//                     title: {
//                       display: true,
//                       text: 'Progreso de ahorro'
//                     },
//                     tooltips: {
//                       callbacks: {
//                         label: function (tooltipItem, data) {
//                           const label = data.labels[tooltipItem.index];
//                           const value = data.datasets[0].data[tooltipItem.index];
//                           return `${label}: $${value.toFixed(2)}`;
//                         }
//                       }
//                     }
//                   }
//                 }}
//               />
//             </div>
//             <div className="memebersMyVakita">
//               {vakita.contributors.map((contributor, cIndex) => (
//                 <div
//                   key={cIndex}
//                   className={`usersMyVakita ${
//                     contributor.email === emailUser ? 'highlighted' : ''
//                   }`}
//                 >
//                   <div
//                     className={`userIcon ${
//                       contributor.email === emailUser ? 'youIcon' : ''
//                     }`}
//                   >
//                     <FontAwesomeIcon icon={faUser} />
//                   </div>
//                   <p>{contributor.email === emailUser ? 'Tú' : contributor.email}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       );
//     });
//   };

//   return (
//     <>
//       <div className="pageMyVakita">
//         <h2 className="h2">Mis vaquitas</h2>
//         <h3 className="h3">Activas</h3>
//         <div className="containerPageMyVakita">
//           {renderDataMyVakita()}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyVakita;

