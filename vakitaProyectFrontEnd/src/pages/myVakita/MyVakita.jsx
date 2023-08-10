import React from 'react';
import { VakitaContext } from '../../context/VakitaProvider';
import { useContext } from 'react';
import '../../styles/myVakitaPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import chart from "../../assets/chart.png"

const MyVakita = () => {
  const { dataVakita } = useContext(VakitaContext);

  const renderDataMyVakita = () => {
    return dataVakita.map((vakita, index) => (
      <div className="cardMyVakita" key={index}>
        <div>
          <div>
            <h3 className='titleMyVaquita'>{vakita.name}</h3>
          </div>
          <div>
          <h3 className="titleMyVaquita" >{ "Meta de ahorro: $"+ vakita.amount}</h3>
          </div>
        </div>
        <div className='BoxMembersAndChart'>
          <div><img  src={chart} alt="chart"/></div>
          <div className='memebersMyVakita'>
    {vakita.emails.map((email, index) => (
      <div key={index}>
      <div  className='usersMyVakita'>
      
      <div className='userIcon'>
      <FontAwesomeIcon icon={faUser} />
    </div> 
    <p>{email}</p>
    </div>
    </div>
    ))}
  </div>
        </div>
      </div>
    ));
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
