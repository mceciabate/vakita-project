import React from 'react';

import '../../styles/cardCredit.css';
import {faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SavedCardsTable({ savedCards, onDeleteCard }) {
  if (savedCards.length === 0) {
    return <p>Aún no has asociado una forma de pago.</p>;
  }

  return (
    <div className="saved-cards">
      <h3>Medio de pago asociado</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre de tarjeta</th>
            <th>Numero de tarjeta</th>
            <th>Vencimiento</th>
            <th>CVC</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {savedCards.map((card, index) => (
            <tr key={index}>
              <td>{card.name}</td>
              <td>{card.number}</td>
              <td>{card.expiry}</td>
              <td>{card.cvc}</td>
              <td>
                <button className="buttonDeletedC" onClick={() => onDeleteCard(index)}> <FontAwesomeIcon icon={faTrashCan} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SavedCardsTable;


