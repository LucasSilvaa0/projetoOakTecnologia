import './App.css';
import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
  
async function listagemProdutos() {
  const {data} = await axios.get('http://localhost:5000/');

  console.log(data)

  return data
}

function App() {
  const [adicionando, setAdicionando] = useState(false);

  function adicionarProduto() {
    setAdicionando(!adicionando);
  }

  function novoProduto() {
    const nome = document.querySelector('input[name="nome"]').value;
    const disponivel = document.querySelector('input[name="disponivel"]').checked;
    const valor = document.querySelector('input[type="number"]').value;
    const descricao = document.querySelector('input[name="descricao"]').value;

    if (nome === '' || valor === '' || descricao === '') {
      alert('Preencha todos os campos!');
      return;
    }

    axios.post('http://localhost:5000/add_product', {
      nome: nome,
      disponivel: disponivel,
      valor: valor,
      descricao: descricao
    }).then((response) => {
      console.log(response);
      alert('Produto adicionado com sucesso!');
      adicionarProduto();
    }).catch((error) => {
      console.log(error);
      alert('Erro ao adicionar produto!');
    });
  }

  const { data, isLoading, isError, error } = useQuery({
    queryFn: listagemProdutos,
    queryKey: ['products'],
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading) {
    return <p>Carregando produtos...</p>;
  }

  if (isError) {
    return <p>Erro ao carregar os produtos: {error.message}</p>;
  }

  const BRreal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  if (adicionando === false) {
    return (
    <div className="container">
      <header>
        <h1>Produtos</h1>
        <button type='button' className="adicionar" onClick={() => adicionarProduto()}>Adicionar novo produto</button>
      </header>
      <br/><br/>
      <table className='tabela'>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Status</th>
            <th>Preço</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {data.map((produto) => (
            <tr key={produto.id}>
              <td>
                <div className="produto-info">
                  <span>{produto.nome}</span>
                </div>
              </td>
              <td>
                {(produto.disponivel===true)?
                (<span className={"status sim"}>
                  Sim
                </span>)
                : (<span className={"status não"}>
                  Não
                </span>)}
              </td>
              <td>{BRreal.format(produto.valor)}</td>
              <td>{produto.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
  }
  
  return (
    <div className="container">
      <header>
        <h1>Formulário de novo produto</h1>
        <button type='button' className="voltar" onClick={() => adicionarProduto()}>
          Voltar para listagem
        </button>
      </header>
      <br/><br/>
      <form>
        <label>
          Nome:<br/>
          <input type="text" name="nome" />
        </label>
        <br/><br/>
        <label>
          <h4>Disponível para compra:</h4>
          <input type="checkbox" name="disponivel" className='disponivel'/>
        </label>
        <br/><br/>
        <label>
          Valor:<br/>
          <input type="number" step="0.01" id="totalAmt" />
        </label>
        <br/><br/>
        <label>
          Descrição:<br/>
          <input type="text" name="descricao" className='descricao'/>
        </label>
        <br/><br/>
        <button type="submit" className="adicionar" onClick={() => novoProduto()}>Adicionar</button>
      </form>
    </div>
    );
}


export default App;
