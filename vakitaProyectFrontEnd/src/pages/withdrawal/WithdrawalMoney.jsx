import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

import "../../styles/withdrawalPage.css";
import { ErrorSpan } from "../../components/Register/Register.styled";
import SectionDashboard from "../../components/SectionDashboard/SectionDashboard";

const WithdrawalMoney = () => {
  const userId = localStorage.getItem("userId");
  const [accountBalance, setAccountBalance] = useState(0);

  useEffect(() => {
    axios
      .get(`http://107.22.65.36:8080/api/v1/usuarios/${userId}`)
      .then((response) => {
        const user = response.data;
        setAccountBalance(user.account_balance);
      })
      .catch((error) => {
        console.error("Error al obtener el saldo del usuario:", error);
      });
  }, [userId]);

  const formatCurrency = (value) => {
    return value.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
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
      cbu: Yup.string()
        .required("Campo requerido")
        .test(
          "len",
          "CBU debe tener 22 números",
          (val) => val.toString().length === 22
        ),
    }),

    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `http://107.22.65.36:8080/api/v1/usuarios/balance?userId=${parseInt(
            userId
          )}&amount=${values.amount}`
        );

        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Retiro exitoso",
            text:
              "El dinero ha sido enviado a la cuenta " + values.cbu.toString(),
          });

          axios
            .get(`http://107.22.65.36:8080/api/v1/usuarios/${userId}`)
            .then((response) => {
              const user = response.data;
              setAccountBalance(user.account_balance);
            })
            .catch((error) => {
              console.error("Error al obtener el saldo del usuario:", error);
            });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error en el retiro",
            text: "Lo sentimos, no se pudo retirar el dinero :(",
          });
        }

        formik.resetForm();
      } catch (error) {
        console.error("An error occurred while sending the request", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo más tarde.",
        });
      }
    },
  });

  return (
    <>
    <div className="boxWM">
    <div className="bannerBoxW">
    <SectionDashboard
          texto={"Puedes retirar tu dinero ingresando tu CBU"}
          color={"#FFE4E5"}
          link={""}
          key={"key"}
          img={
            "https://cdn3d.iconscout.com/3d/premium/thumb/money-bag-3980372-3297249.png"
          }
          title={"Retira tu dinero fácilmente"}
          displayMobile={false}
        />
    </div>
      <div className="cointainerW">
        <section className="sectionInfoBalance">
          <div className="boxW">
            <div className="boxTextW">
              <div>
                <p className="text1W">Saldo disponible</p>
              </div>
              <div>
                <p className="text2W">{formatCurrency(accountBalance)}</p>
              </div>
            </div>
          </div>

          <div className="formExtraction">
            <h3>Retirar dinero</h3>

            <form className="formWithInputs" onSubmit={formik.handleSubmit}>
              <fieldset className="sectionInput">
                <label className="labelStyle" htmlFor="amount">
                  Monto a retirar
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="inputStyle"
                />
                {formik.touched.amount && formik.errors.amount && (
                  <ErrorSpan>{formik.errors.amount}</ErrorSpan>
                )}
              </fieldset>

              <fieldset className="sectionInput">
                <label className="labelStyle" htmlFor="cbu">
                  CBU de la cuenta
                </label>
                <input
                  type="text"
                  name="cbu"
                  id="cbu"
                  value={formik.values.cbu}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="inputStyle"
                />
                {formik.touched.cbu && formik.errors.cbu && (
                  <ErrorSpan>{formik.errors.cbu}</ErrorSpan>
                )}
              </fieldset>

              <button type="submit" className="buttonExtract">
                Retirar dinero
              </button>
            </form>
          </div>
        </section>
        {/* <SectionDashboard
          texto={"Puedes retirar tu dinero ingresando tu CBU"}
          color={"#FFE4E5"}
          link={""}
          key={"key"}
          img={
            "https://cdn3d.iconscout.com/3d/premium/thumb/money-bag-3980372-3297249.png"
          }
          title={"Retira tu dinero fácilmente"}
          displayMobile={false}
        /> */}
      </div>
      </div>
    </>
  );
};

export default WithdrawalMoney;



