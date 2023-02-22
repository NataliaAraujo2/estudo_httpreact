import "./App.css";
import { useState, useEffect } from "react";

//URL base da API
const url = "http://localhost:3000/customers";

function App() {
  const [customers, setCustomers] = useState([]);

  // 1 - Reagatando dados
  useEffect(
    () => {
      async function fetchData() {
        //Chamamos uma resposta/requisição da API
        const res = await fetch(url);
        //A resposta vem em texto e precisamos transformar em objeto
        const data = await res.json();

        setCustomers(data);
      }
      fetchData();
    },
    [
      /*DEPENDÊNCIAS*/
    ]
  );

  //2- Adição de Clientes
  

  return (
    <div className="App">
      <h1>Clientes</h1>
      {/* Para imprimir os dados no template fazemos um looping dos dados. */}
      <ul>
        {customers.map((customer) => (
          <div className="customerList">
          <li key={customer.id}><b>Nome:</b> {customer.name}</li>
          <li key={customer.id}><b>CPF:</b> {customer.cpf}</li>
          <li key={customer.id}><b>RG:</b> {customer.rg}</li>
          <li key={customer.id}><b>Profissão:</b> {customer.job}</li>
          <li key={customer.id}><b>Estado Civil:</b> {customer.marital_status}</li>
          <li key={customer.id}><b>Endereço:</b> {customer.address}</li>
          <li key={customer.id}><b>Bairro:</b> {customer.district}</li>
          <li key={customer.id}><b>Cidade:</b> {customer.city}</li>
          <li key={customer.id}><b>Estado:</b> {customer.state}</li>
          <li key={customer.id}><b>CEP:</b> {customer.zip_code}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
