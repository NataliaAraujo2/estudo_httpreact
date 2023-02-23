import "./App.css";
import { useState, useEffect } from "react";
import { useFetch } from "./hooks/useFetch";

//URL base da API
const url = "http://localhost:3000/customers";

function App() {
  //States lista de clientes
  const [customers, setCustomers] = useState([]);
  const { data: items, httpConfig, loading, error } = useFetch(url);

  //States propriedades dos cliente
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [job, setJob] = useState("");
  const [marital_status, setMarital_status] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip_code, setZip_code] = useState("");
  const [email, setEmail] = useState("");

  // 1 - Reagatando dados
  // useEffect(
  //   () => {
  //     async function fetchData() {
  //       //Chamamos uma resposta/requisição da API
  //       const res = await fetch(url);
  //       //A resposta vem em texto e precisamos transformar em objeto
  //       const data = await res.json();

  //       setCustomers(data);
  //     }
  //     fetchData();
  //   },
  //   [
  //     /*DEPENDÊNCIAS*/
  //   ]
  // );

  //2- Adição de Clientes
  //Fazemos uma função assíncrona para enviar o formulário
  const handleSubmit = async (e) => {
    //Evitamos o comportamento Default do objeto
    e.preventDefault();
    //Criamos o objeto que vai para o backend
    const customer = {
      name,
      cpf,
      rg,
      job,
      marital_status,
      address,
      district,
      city,
      state,
      zip_code,
      email,
    };
    console.log(customer);
    //Chamamos uma resposta/requisição da API
    //  const res = await fetch(url,{
    //   //o method só é usado para algo diferente do GET, exemplo POST
    //   method:"POST",
    //   //informamos o tipo de conteúdo que estamos enviando
    //   headers:{

    //   }
    //  });
    //  //A resposta vem em texto e precisamos transformar em objeto

    httpConfig(customer, "POST");
    setName("");
    setCpf("");
    setRg("");
    setJob("");
    setMarital_status("");
    setAddress("");
    setDistrict("");
    setCity("");
    setState("");
    setZip_code("");
    setEmail("");
  };
  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  };

  return (
    <div className="App">
      <h1>Clientes</h1>
      {loading && <p>Carregando dados ...</p>}
      {error && <p>{error}</p>}
      {!loading && (
        <ul>
          {items &&
            items.map((customer) => (
              <div className="customerList" key={customer.id}>
                <li>
                  <b>Nome:</b> {customer.name}
                </li>
                <li>
                  <b>CPF:</b> {customer.cpf}
                </li>
                <li>
                  <b>RG:</b> {customer.rg}
                </li>
                <li>
                  <b>Profissão:</b> {customer.job}
                </li>
                <li>
                  <b>Estado Civil:</b> {customer.marital_status}
                </li>
                <li>
                  <b>Endereço:</b> {customer.address}
                </li>
                <li>
                  <b>Bairro:</b> {customer.district}
                </li>
                <li>
                  <b>Cidade:</b> {customer.city}
                </li>
                <li>
                  <b>Estado:</b> {customer.state}
                </li>
                <li>
                  <b>CEP:</b> {customer.zip_code}
                </li>
                <li>
                  <b>Enail:</b> {customer.email}
                </li>
                <button
                  className="delete-button"
                  onClick={() => handleRemove(customer.id)}
                >
                  Apagar Cadastro
                </button>
              </div>
            ))}
        </ul>
      )}

      {/* Para imprimir os dados no template fazemos um looping dos dados. */}

      <div className="add-customer">
        <h1 className="add-customer-title">ADICIONAR CLIENTE</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            CPF:
            <input
              type="text"
              name="cpf"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </label>
          <label>
            RG:
            <input
              type="text"
              name="rg"
              id="rg"
              value={rg}
              onChange={(e) => setRg(e.target.value)}
            />
          </label>
          <label>
            Profissão:
            <input
              type="text"
              name="job"
              id="job"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </label>
          <label>
            Estado Civil:
            <input
              type="text"
              name="marital_status"
              id="marital_status"
              value={marital_status}
              onChange={(e) => setMarital_status(e.target.value)}
            />
          </label>
          <label>
            Endereço:
            <input
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <label>
            Bairro:
            <input
              type="text"
              name="district"
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </label>
          <label>
            Cidade:
            <input
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label>
            Estado:
            <input
              type="text"
              name="state"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
          <label>
            CEP:
            <input
              type="text"
              name="zip_code"
              id="zip_code"
              value={zip_code}
              onChange={(e) => setZip_code(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {loading && (
            <input className="bottom" type="submit" disable value="Aguarde" />
          )}
          {!loading && (
            <input className="bottom" type="submit" value="Adicionar Cliente" />
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
