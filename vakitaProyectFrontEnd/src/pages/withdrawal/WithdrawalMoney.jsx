import { useEffect, useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import Swal from 'sweetalert2';

import '../../styles/withdrawalPage.css';
import { ErrorSpan } from '../../components/Register/Register.styled';

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


  const formik = useFormik({
    initialValues: {
      amount: 0,
      cbu: "",
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .required("Campo requerido")
        .min(0.1, "Monto a retirar debe ser mayor a 0")
        .max(
          accountBalance,
          "Se puede retirar hasta el total del saldo disponible"
        ),
      cbu: Yup.number()
        .required("Campo requerido")
        .test(
          "len",
          "CBU debe tener 22 números",
          (val) => val.toString().length === 22
        ),
    }),
  });


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
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.amount && formik.errors.amount && (
                  <ErrorSpan>{formik.errors.amount}</ErrorSpan>
                )}
              </fieldset>

              <fieldset>
                <label htmlFor="cbu">CBU de la cuenta</label>
                <input
                  type="number"
                  name="cbu"
                  id="cbu"
                  value={formik.values.cbu}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.cbu && formik.errors.cbu && (
                  <ErrorSpan>{formik.errors.cbu}</ErrorSpan>
                )}
              </fieldset>

              <fieldset>
                <label htmlFor="accountType">¿Es una cuenta corriente?</label>
                <label>
                  <input
                    type="radio"
                    value={true}
                    // value={}
                    // onChange={}
                    // onBlur={}
                  />
                  Sí
                </label>

                <label>
                  <input
                    type="radio"
                    value={false}
                    // value={}
                    // onChange={}
                    // onBlur={}
                  />
                  No
                </label>
              </fieldset>

              <button type="submit">Retirar dinero</button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default WithdrawalMoney;



