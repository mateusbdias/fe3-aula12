import { Formik } from "formik";
import InputMask from "react-input-mask";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./styles.css";

const MySwal = withReactContent(Swal);

function scaleIMC(imc){
  if(imc > 18.5 && imc <= 24.9){
    return "NORMAL";
  } else if(imc > 24.9 && imc <= 29.9){
    return "SOBREPESO";
  } else {
    return "OBESIDADE";
  }
}

function App() {
  return (
    <div className="App">
      <Formik
        initialValues={{ 
          nome:"", email:"",
          nascimento:"", telefone:"",
          cpf:"", peso:"", altura:"",
        }}
        validate={
          (values) => {

            const errors = {};

            if(!values.nome){
              errors.nome = "Campo obrigatório";
            }

            if(!values.email){
              errors.email = "Campo obrigatório";
            } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
              errors.email = "Email inválido";
            }

            if(!values.nascimento){
              errors.nascimento = "Campo obrigatório";
            }

            if(!values.telefone){
              errors.telefone = "Campo obrigatório";
            } else if(!/\([0-9]{2}\) (?:9[0-9]{1}|[1-5]{1})[0-9]{3}-[0-9]{4}/.test(values.telefone)){
              errors.telefone = "Telefone inválido";
            }

            if(!values.cpf){
              errors.cpf = "Campo obrigatório";
            } else if(!/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(values.cpf)){
              errors.cpf = "CPF inválido";
            }

            if(!values.peso){
              errors.peso = "Campo obrigatório";
            } else if(!/^\d+(?:\.\d+)?$/.test(values.peso)){
              errors.peso = "Peso inválido";
            }

            if(!values.altura){
              errors.altura = "Campo obrigatório";
            } else if(!/^\d+(?:\.\d+)?$/.test(values.altura)){
              errors.altura = "Altura inválida";
            }

            return errors;
          }
        }
        onSubmit={(values) => MySwal.fire({
          title: "Meu Formulário",
          footer: `${values.nome}`,
          didOpen: () => {
            MySwal.clickConfirm()
          }
        }).then(() => {
          return MySwal.fire(<p>{values.nome}</p>)
        })}
      >
        {({ values, handleSubmit, errors, handleChange, resetForm }) => (
          <form onSubmit={handleSubmit}>
            <div className="header-form">
              <h1>Cadastro de Pacientes</h1>

              <div className="container-buttons">
                <button type="submit">Salvar</button>
                <button onClick={resetForm}>Limpar Campos</button>
              </div>
            </div>

            <label>
              <span>Nome</span>
              <input autoComplete="off"
                type="text" value={values.nome} 
                name="nome" onChange={handleChange} 
              />
              <span>{errors.nome}</span>
            </label>

            <label>
              <span>Email</span>
              <input autoComplete="off"
                type="email" value={values.email} 
                name="email" onChange={handleChange}
              />
              <span>{errors.email}</span>
            </label>

            <label>
              <span>Data de Nascimento</span>
              <input autoComplete="off"
                type="date" value={values.nascimento} 
                name="nascimento" onChange={handleChange}
              />
              <span>{errors.nascimento}</span>
            </label>

            <label>
              <span>Telefone</span>
              <InputMask mask="(99) 99999-9999" 
                autoComplete="off"
                onChange={handleChange} 
                value={values.telefone}
                name="telefone" 
              />
              <span>{errors.telefone}</span>
            </label>

            <label>
              <span>CPF</span>
              <InputMask mask="999.999.999-99" 
                autoComplete="off"
                onChange={handleChange} 
                value={values.cpf}
                name="cpf" 
              />
              <span>{errors.cpf}</span>
            </label>

            <label>
              <span>Peso</span>
              <input autoComplete="off"
                type="text" value={values.peso} 
                name="peso" onChange={handleChange}
              />
              <span>{errors.peso}</span>
            </label>

            <label>
              <span>Altura</span>
              <input autoComplete="off"
                type="text" value={values.altura} 
                name="altura" onChange={handleChange}
              />
              <span>{errors.altura}</span>
            </label>

            {values.peso && values.altura ? (
              <>
                <h1>IMC = {(values.peso / (values.altura * values.altura)).toFixed(2)}</h1>
                <h3>{scaleIMC(values.peso / (values.altura * values.altura))}</h3>
              </>
            ) : (
              <h1>----</h1>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
}

export default App;
