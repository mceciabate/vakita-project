import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/transactionPage.css';

const TransactionPage = () => {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem('userId');
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    axios.get(`http://107.22.65.36:8080/api/v1/vakita/user/${userId}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error('Error al obtener los datos:', error);
    });
  }, [userId]);

  // Función para agrupar transacciones por userId
  const groupTransactionsByUserId = (transactions) => {
    const groupedTransactions = {};
    transactions.forEach((transaction) => {
      const userId = transaction.userId;
      if (!groupedTransactions[userId]) {
        groupedTransactions[userId] = [];
      }
      groupedTransactions[userId].push(transaction.amount);
    });
    return groupedTransactions;
  };

  // Función para obtener los correos electrónicos de los usuarios que coinciden entre contributors y transactions
  const getEmailsForMatchingUsers = (contributors, transactions) => {
    const matchingEmails = [];
    contributors.forEach((contributor) => {
      const userId = contributor.id;
      if (transactions.some((transaction) => transaction.userId === userId)) {
        matchingEmails.push(contributor.email);
      }
    });
    return matchingEmails;
  };

  return (
    <div className='tranxPage'>
      <div className='containerTranx'>
        <h2 className='h2'>Movimientos de mis vaquitas</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre de vaquita</th>
              <th>Usuario</th>
              <th>Transacciones</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((vakita) => (
              <tr key={vakita.id}>
                <td>{vakita.name}</td>
                <td>
                  {getEmailsForMatchingUsers(vakita.contributors, vakita.transactions).map((email, index) => (
                    <div key={index}>{email}</div>
                  ))}
                </td>
                <td>
                  {Object.keys(groupTransactionsByUserId(vakita.transactions)).map((userId, index) => (
                    <div key={index}>
                      <span>{userId}</span>: <span>{groupTransactionsByUserId(vakita.transactions)[userId].join(', ')}</span>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionPage;


