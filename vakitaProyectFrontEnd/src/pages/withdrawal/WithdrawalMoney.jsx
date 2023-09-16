import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import axios from 'axios';
import '../../styles/withdrawalPage.css';

const WithdrawalMoney = () => {
  const userId = localStorage.getItem('userId');
  const [accountBalance, setAccountBalance] = useState(0);

  useEffect(() => {
    axios
      .get(`http://107.22.65.36:8080/api/v1/usuarios/${userId}`)
      .then((response) => {

        const user = response.data;
        setAccountBalance(user.account_balance);
      })
      .catch((error) => {
        console.error('Error al obtener el saldo del usuario:', error);
      });
  }, [userId]);

  const formatCurrency = (value) => {
    return value.toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <>
      <div className="cointainerW">
        <section className="sectionInfoBalance">
          <div className="boxW">
            <div className="boxTextW">
              <div>
                <p className="text1W">Saldo disponible</p>
              </div>
              <div>
                <p className="text2W">
                  {formatCurrency(accountBalance)} <span>pesos</span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3>Retirar dinero</h3>

            <form>
              <fieldset>
                <label htmlFor="amount">Monto a retirar</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  // value={}
                  // onChange={}
                  // onBlur={}
                />
              </fieldset>

              <fieldset>
                <label htmlFor="acountType">¿Es una cuenta corriente?</label>
                <label htmlFor="acountType">
                  <input
                    type="radio"
                    name="acountType"
                    id="acountType"
                    value={true}
                    // value={}
                    // onChange={}
                    // onBlur={}
                  />
                  Sí
                </label>

                <label htmlFor="acountType">
                  <input
                    type="radio"
                    name="acountType"
                    id="acountType"
                    value={false}
                    // value={}
                    // onChange={}
                    // onBlur={}
                  />
                  No
                </label>
              </fieldset>

              <button type='submit'>Retirar dinero</button>

            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default WithdrawalMoney;



