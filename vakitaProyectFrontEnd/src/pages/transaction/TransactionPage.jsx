import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/transactionPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const TransactionPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterEmail, setFilterEmail] = useState('');
  const userId = localStorage.getItem('userId');
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    axios
      .get(`http://107.22.65.36:8080/api/v1/vakita/user/${userId}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      });
  }, [userId, token]);

  const formatDisplayDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getEmailForContributor = (contributorId) => {
    const contributor = data.flatMap((vakita) => vakita.contributors).find((contributor) => contributor.id === contributorId);
    return contributor ? contributor.email : '';
  };

  const renderTransactionRows = () => {
    if (loading) {
      return [];
    }

    const groupedData = {};

    data.forEach((vakita) => {
      vakita.transactions.forEach((transaction) => {
        const { userId: contributorId, amount, date } = transaction;
        const contributorEmail = getEmailForContributor(contributorId);
        const key = `${vakita.name}-${contributorEmail}`;

        if (!groupedData[key]) {
          groupedData[key] = {
            vaquitaName: vakita.name,
            contributorEmail: contributorEmail,
            amounts: [],
            dates: [],
          };
        }

        groupedData[key].amounts.push(amount);
        groupedData[key].dates.push(formatDisplayDate(date));
      });
    });

    const filteredRows = Object.values(groupedData).filter((item) => {
      const contributorEmail = item.contributorEmail.toLowerCase();
      return contributorEmail.includes(filterEmail.toLowerCase()) || filterEmail === '';
    });

    return filteredRows;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Movimientos de mis vakitas', 10, 10);

    const transactionRows = renderTransactionRows();

    if (transactionRows && transactionRows.length > 0) {
      const tableData = transactionRows.map((row) => [
        row.vaquitaName || '',
        row.contributorEmail,
        row.amounts.join('\n'),
        row.dates.join('\n'),
      ]);

      doc.autoTable({
        head: [['Nombre de vakita', 'Email', 'Ingreso de dinero', 'Fecha']],
        body: tableData,
        startY: 20,
        margin: { top: 20 },
        pageBreak: 'auto',
        showHead: 'firstPage',
        tableWidth: 'auto',
        theme: 'striped',
      });

      doc.save('movimientos_vakitas.pdf');
    } else {
      doc.text('No hay datos para mostrar', 10, 30);
    }
  };

  return (
    <div className="tranxPage">
     
      {loading ? (
         <div className='noDataText'>
           <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> </div>
        ) : (
          <>
           <h2 className="h2">Movimientos de mis vakitas</h2>
      <div className="containerTranx">
        <div className='containerInput'>
          <input
            className='inputTx'
            type="text"
            placeholder="Filtrar por correo electrónico"
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
          />
          <FontAwesomeIcon className='iconTx' icon={faSort} />
        </div>
        <button className='pdfButton' onClick={generatePDF}>
        <FontAwesomeIcon className='iconDownload' icon={faCloudArrowDown} />
          Descargar reporte 
        </button>
        <table className='tranxTable'>
          <thead>
            <tr>
              <th>Nombre de vakita</th>
              <th>Email</th>
              <th>Ingreso de dinero</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {renderTransactionRows().map((row, index) => (
              <tr key={index}>
                <td>{row.vaquitaName || ''}</td>
                <td>{row.contributorEmail}</td>
                <td>
                  {row.amounts.map((amount, idx) => (
                    <div key={idx}>{amount}</div>
                  ))}
                </td>
                <td>
                  {row.dates.map((date, idx) => (
                    <div key={idx}>{date}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
          </>
        )}

      
    </div>
  );
};

export default TransactionPage;





