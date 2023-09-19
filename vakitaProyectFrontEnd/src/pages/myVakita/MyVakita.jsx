import { useEffect, useState } from 'react';
import '../../styles/myVakitaPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAngleRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';


const MyVakita = () => {
  const [allMyVakita, setAllMyVakita] = useState([]);
  const [cardAliases, setCardAliases] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [inactiveVakitaElements, setInactiveVakitaElements] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [inactivePage, setInactivePage] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const token = JSON.parse(localStorage.getItem('token'));
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const decoded = jwt_decode(token);
  const emailUser = decoded.sub;

  // Cantidad de elementos por página
  const perPage = 2;

  // Función para manejar el cambio de página
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleInactivePageChange = ({ selected }) => {
    setInactivePage(selected);
  };

  const loadInactiveVakitas = async () => {
    try {
      const response = await axios.get(`http://107.22.65.36:8080/api/v1/vakita/inactives/${userId}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // Filtrar las vakitas inactivas (isActive = false)
      const inactiveVakitas = response.data;
      setInactiveVakitaElements(inactiveVakitas)

      // Renderizar las vakitas inactivas utilizando la función renderInactiveVakitas
      const elements = renderInactiveVakitas(inactiveVakitas);

      // Actualizar el estado con los elementos renderizados
      // setInactiveVakitaElements(elements);
    } catch (error) {
      console.error('Error fetching inactive vakitas:', error);
    }
  };

  useEffect(() => {
    if (userId !== null) {
      const loadCardAliases = async () => {
        try {
          const response = await axios.get(`http://107.22.65.36:8080/api/v1/payment/personal/${userId}`, {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          const aliases = response.data.map((card) => card.alias);

          setCardAliases(aliases);
        } catch (error) {
          console.error('Error fetching card aliases:', error);
        }
      };
      loadCardAliases();
    }
  }, [userId, token]);

 



  useEffect(() => {
    if (userId !== null) {
      const loadData = async () => {
        try {
          setLoading(true); // Indicar que el componente se está cargando
          const response = await axios.get(`http://107.22.65.36:8080/api/v1/vakita/actives/${userId}`, {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          setAllMyVakita(response.data);
          const initialChartData = response.data.map((vakita) => {
            // Calcula el totalContributed sumando las transacciones y el cumulativeAmount
            const totalContributed = vakita.transactions.reduce(
              (total, transaction) => total + transaction.amount,
              0
            ) + vakita.cumulativeAmount; // se suma el cumulativeAmount

            const remainingAmount = vakita.totalAmount - totalContributed;

            return {
              totalContributed,
              remainingAmount,
            };
          });

          setChartData(initialChartData);
          
          setLoading(false); // Indicar que la carga ha finalizado
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false); // Asegurarse de que la carga termine en caso de error
        }
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
      const vakita = allMyVakita[index];
      const totalContributed = chartData[index]?.totalContributed || 0;
      const remainingAmount = chartData[index]?.remainingAmount || vakita.totalAmount;

      if (totalContributed >= vakita.totalAmount || vakita.totalAmount === vakita.cumulativeAmount) {
        Swal.fire({
          icon: 'warning',
          title: 'Se llegó a la meta de ahorro',
          text: 'No se puede cargar más dinero en esta vakita.',
        });
        return;
      }

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

          if (amount > remainingAmount) {
            Swal.showValidationMessage('El importe supera la meta de ahorro.');
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

  const renderDataMyVakita = (vakitas) => {
    
    return vakitas?.map((vakita, index) => {
    
      const totalContributed = chartData[index]?.totalContributed || 0;
      const remainingAmount = chartData[index]?.remainingAmount || vakita.totalAmount;
      const isActive = vakita.isActive; 
     
  
     
      
      const shouldRender =
        index >= currentPage * perPage && index < (currentPage + 1) * perPage;
  
      if (!shouldRender) {
        return null; 
      }
      
      
      const sortedContributors = [...vakita.contributors];
      const matchingContributorIndex = sortedContributors.findIndex(
        (contributor) => contributor.email === emailUser
      );
      
      if (matchingContributorIndex !== -1) {
        const matchingContributor = sortedContributors.splice(
          matchingContributorIndex,
          1
        )[0];
        sortedContributors.unshift(matchingContributor);
      }
  
      const backgroundColor = isActive
        ? totalContributed >= vakita.totalAmount
          ? ['rgba(75, 192, 192, 0.6)', 'rgba(75, 192, 192, 0.6)']
          : ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)']
        : 'rgba(0, 0, 0, 0.6)'; 
  
        const chartDataValues =
        totalContributed >= vakita.totalAmount
          ? [vakita.totalAmount, 0]
          : [totalContributed, remainingAmount];
      return (
        <div
          className={`cardMyVakita ${!isActive ? 'inactiveCard' : ''}`}
          key={index}
        >
          <div>
          
            <div>
              <h3 className='titleMyVaquita'>{vakita.name}</h3>
              
            </div>
            
            <div>
              <h3 className='titleMyVaquita'>{`Meta: $${vakita.totalAmount}`}</h3>
            </div>
            <div className='buttons'>
            <button
              className={`save-button ${!isActive ? 'disabled' : ''}`}
              onClick={() => {
                isActive && payVakita(vakita.id, index);
              }}
            >
            💰 Depositar 
            </button>
            <button
            className="withdraw"
            onClick={() => {
              if (isActive) {
                Swal.fire({
                  title: '¿Retirar el total del monto actual de la vakita?',
                  text: 'La vakita pasará a inactiva',
                  showCancelButton: true,
                  confirmButtonText: 'Si',
                  cancelButtonText: 'No',
                }).then((result) => {
                  if (result.isConfirmed) {
                    
                    axios
                      .put(`http://107.22.65.36:8080/api/v1/vakita/inactive/${vakita.id}`, null, {
                        headers: {
                          'Content-type': 'application/json',
                          Authorization: `Bearer ${token}`,
                        },
                      })
                      .then((response) => {
                     
                        return axios.patch(`http://107.22.65.36:8080/api/v1/vakita/drain/${vakita.id}`, null, {
                          headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${token}`,
                          },
                        });
                      })
                      .then((response) => {
                        Swal.fire({
                          title: 'Se realizó correctamente el retiro de dinero',
                          text: 'Sera redireccionado a la página de "Extracción de dinero" para visualizar el saldo de la cuenta',
                          icon: 'success',
                        }).then(() => {
                          navigate('/dashboard/extraer-dinero');
                        });
                      })
                      .catch((error) => {
                      
                        Swal.fire('Error', 'Hubo un error al realizar el retiro de dinero', 'error');
                      });
                  }
                });
              }
            }}
          >
            💰 Retirar
          </button>
            </div>
          </div>
          <div className='BoxMembersAndChart'>
            <div className='chartContainer'>
              <Doughnut
                data={{
                  labels: ['Contribuido', 'Restante'],
                  datasets: [
                    {
                      data: chartDataValues,
                      backgroundColor: backgroundColor,
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
                  <div
                    className={`userIconT ${
                      contributor.email === emailUser ? 'youIcon' : ''
                    }`}
                  >
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
  const renderInactiveVakitas = (vakitas) => {
    return vakitas?.map((vakita, index) => {
      const totalContributed = chartData[index]?.totalContributed || 0;
      const remainingAmount = chartData[index]?.remainingAmount || vakita.totalAmount;
      const isActive = vakita.isActive; 

   
      if (!Array.isArray(vakita.contributors)) {
       
        return null; 
      }

      
      const shouldRender =
        index >= inactivePage * perPage && index < (inactivePage + 1) * perPage;

      if (!shouldRender) {
        return null; 
      }

      const sortedContributors = [...vakita.contributors];
      const matchingContributorIndex = sortedContributors.findIndex(
        (contributor) => contributor.email === emailUser
      );

      if (matchingContributorIndex !== -1) {
        const matchingContributor = sortedContributors.splice(
          matchingContributorIndex,
          1
        )[0];
        sortedContributors.unshift(matchingContributor);
      }

      const backgroundColor = isActive
        ? totalContributed >= vakita.totalAmount
          ? ['rgba(75, 192, 192, 0.6)', 'rgba(75, 192, 192, 0.6)']
          : ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)']
        : 'rgba(0, 0, 0, 0.6)'; 

      const chartDataValues =
        totalContributed >= vakita.totalAmount
          ? [vakita.totalAmount, 0]
          : [totalContributed, remainingAmount];

      return (
        <div
          className={`cardMyVakita ${!isActive ? 'inactiveCard' : ''}`}
          key={index}
        >
          <div>
          
           
            <div>
              <h3 className='titleMyVaquita'>{vakita.name}</h3>
            </div>
            <div>
              <h3 className='titleMyVaquita'>{`Meta: $${vakita.totalAmount}`}</h3>
            </div>
          </div>
          <div className='BoxMembersAndChart'>
            <div className='chartContainer'>
              <Doughnut
                data={{
                  
                  datasets: [
                    {
                      data: [1,1],
                      backgroundColor: backgroundColor,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Vakita inactiva',
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
                    contributor.email === emailUser ? 'highlightedI' : ''
                  }`}
                >
                  <div
                    className={`userIconT ${
                      contributor.email === emailUser ? 'youIconI' : ''
                    }`}
                  >
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

  useEffect(() => {
    if (userId !== null && inactiveVakitaElements.length === 0) {
      loadInactiveVakitas();
    }
  }, [userId, token, inactiveVakitaElements]);
  
  
  return (
    <>
    <div className='pageMyVakita'>

      {loading ? (
        <div className='noDataText'>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> </div>
      ) : allMyVakita.length === 0 && inactiveVakitaElements.length === 0 ? (
        <div className='noDataText'>No sos integrante de alguna vakita</div>
      ) :(
        <div className='pageMyVakita'>
          <h2 className='h2V'>Mis vakitas</h2>
          <h3 className='h3'>Activas</h3>
          <div>
            {allMyVakita.length > perPage && (
              <div className='boxPagination'>
                <ReactPaginate
                  previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
                  nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                  breakLabel={'...'}
                  breakClassName={'break-me'}
                  pageCount={Math.ceil(allMyVakita.length / perPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChange}
                  containerClassName={'pagination'}
                  subContainerClassName={'pages pagination'}
                  activeClassName={'active'}
                />
              </div>
            )}
            <div className='containerPageMyVakita'>
              {renderDataMyVakita(allMyVakita)}
            </div>
          </div>
          {inactiveVakitaElements.length > 0 ? (
            <>
              <h3 className='h3'>Inactivas</h3>
              <div>
              {inactiveVakitaElements.length > perPage && (
<div className='boxPagination'>
  <ReactPaginate
    previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
    nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
    breakLabel={'...'}
    breakClassName={'break-me'}
    pageCount={Math.ceil(inactiveVakitaElements.length / perPage)}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={handleInactivePageChange}
    containerClassName={'pagination'}
    subContainerClassName={'pages pagination'}
    activeClassName={'active'}
  />
</div>
)}
                <div className='containerPageMyVakita'>
            
                  {renderInactiveVakitas(inactiveVakitaElements)}
                </div>
              </div>
            </>
          ) : null}
        </div>
      )}
     
    </div>
    </>
  );
};

export default MyVakita;


