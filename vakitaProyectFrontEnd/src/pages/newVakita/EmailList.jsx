import React from 'react';
import "../../styles/newVakitaPage.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const EmailList = ({ emails, onRemove }) => {
  return (
    <div className="boxItems">
      <h4>¿Quiénes van a ser los integrantes de esta vaka?</h4>
      <div className="contenedor-miembros">
        {emails.length > 0 && emails.map((member, index) => (
          <div key={index} className='memberAdded'>
            <div className='userIcon'>
              <FontAwesomeIcon icon={faUser}  />
            </div>
            {member}
            <button type="button" className="buttonDeleted" onClick={() => onRemove(index)}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailList;