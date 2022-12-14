//rface
import React, { useState } from 'react';

const Frutas = () => {

  const itens = ['maçã', 'laranja', 'kiwi', 'pitaya', 'mirtilo'];

  //let quantidade = 0;
  const [quantidade, setQuantidade] = useState(0);

  let [frutas, setFrutas] = useState(itens);

  let [novaFruta, setNovaFruta] = useState('');


  function handleClickIncrementar(event) {
    //setQuantidade(quantidade + 1);
    setQuantidade((valor) => {
      return valor + 1;
    });
  }

  // const handleClickAdicionar = function () {}
  const handleClickAdicionar = (event) => {
    setFrutas([...frutas, novaFruta]);
  };

  const handleChange = function (event) {
    setNovaFruta(event.target.value);
    console.log('Digitando o nome da fruta');

  };
  

  return (
    <main>
    
      Quantidade: {quantidade}
      <button onClick={handleClickIncrementar}>Incrementar</button>
      <ol>
        {frutas.map((fruta) => {
          return <li>{fruta}</li>;
        })}
      </ol>
      <form>
      <label>Fruta:</label>
      <input type= "text" value={novaFruta} onChange = {handleChange}></input>
      </form>
      
      <button onClick={handleClickAdicionar}>Adicionar</button>
      

    </main>
  );

};

export default Frutas;
