import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/withdrawalPage.css';

const WithdrawalMoney = () => {
  const userId = localStorage.getItem('userId');
  const [accountBalance, setAccountBalance] = useState(0);

  useEffect(() => {
    // Realizar la solicitud GET para obtener el saldo del usuario
    axios
      .get(`http://107.22.65.36:8080/api/v1/usuarios/${userId}`)
      .then((response) => {
        // Obtener el saldo del usuario desde la respuesta
        const user = response.data;
        setAccountBalance(user.account_balance);
      })
      .catch((error) => {
        console.error('Error al obtener el saldo del usuario:', error);
      });
  }, [userId]);

  return (
    <>
      <div className='cointainerW'>
        <div className='boxW'>
          <div className='boxTextW'>
            <div>
            <p className='text1W'>Saldo disponible</p>
            </div>
            <div>
             <p className='text2W'>
             $ {accountBalance.toFixed(2)}  <span>pesos</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WithdrawalMoney;