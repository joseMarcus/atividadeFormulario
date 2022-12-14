import React, { useEffect, useState } from 'react';

const Contador = () => {
  const [nome, setNome] = useState('');

  const [countTime, setCountTime] = useState(0);

  const contador = () => {
    setTimeout(() => {
      setCountTime(countTime + 1);
    }, 1000);
  };

  useEffect(contador, [countTime, nome]);

  const handleChange = (event) => {
    const nomeChange = event.target.value;
    setNome(nomeChange);
    console.log(nomeChange);
  };

  useEffect(() => {
    console.log('Entrou no useEffect!');
    document.title = nome;
    setNome(nome);
  }, [nome]);

  return (
    <React.Fragment>
      <h1>{countTime}</h1>
      <form>
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" value={nome} onChange={handleChange} />
      </form>
    </React.Fragment>
  );
};

export default Contador;