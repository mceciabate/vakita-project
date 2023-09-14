import React from 'react';

import '../../styles/cardCredit.css';
import {faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SavedCardsTable({ savedCards, onDeleteCard }) {
  if (savedCards.length === 0) {
    return <p>Aún no has asociado una forma de pago.</p>;
  }

  return (
  <>
    <div className="saved-cards">
      <h3 className='Titulo-savedCards'>Medio de pago asociado</h3>
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Nombre de tarjeta</th>
            <th>Ultimos 4 números</th>
            <th>Vencimiento</th>
            <th>CVC</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {savedCards?.map((card, index) => (
            <tr key={index}>
              <td>{card.alias}</td>
              <td>{card.cardNumber}</td>
              <td>{card.expirationDate}</td>
              <td>***</td>
              <td>
                <button className="buttonDeletedC" onClick={() => onDeleteCard(card.creditCardId)}> <FontAwesomeIcon icon={faTrashCan} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>
  );
}

export default SavedCardsTable;


