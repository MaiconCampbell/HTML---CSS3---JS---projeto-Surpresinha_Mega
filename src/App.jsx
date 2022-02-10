import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [qtd, setQtd] =  useState(6);
  const numSorteio = Array(qtd || 6);
  const [sorteio, setSorteio] = useState(numSorteio);

  function gerarNumeroNaoContido(gerador) {
    // Math.random() * (max - min) + min
    const numAleatorio = parseInt(Math.random() * (61 - 1)) + 1;

    return gerador.includes(numAleatorio) ?
      gerarNumeroNaoContido(gerador)
    :
      numAleatorio
  }

  function gerarNumeros() {
    setSorteio([])

    const numeros = Array(+qtd)
    .fill(0)
    .reduce(nums => {
      const novoNumero = gerarNumeroNaoContido(nums)
      return [...nums, novoNumero]
    }, [])
    .sort((n1, n2) => n1 - n2)

    return numeros;
  }

  return (
    <div className='container'>
      <div className='container-sorteio'>
        <h1>Mega sena - surpresinha</h1>

        <div className='resultado'>
          {
            sorteio.length >= 6 ?
              sorteio.map((item, i) => {
                return (
                  <div className='numeroSorteado' key={i}>
                    <strong className='numero'>{item}</strong>
                  </div>
                )
              })
            :
              undefined
          }
        </div>

        <form action="#">
            <label className='label-form' htmlFor="qtdNumeros">Informar a quantidade de números:</label>
            <input
              name="qtdNumeros"
              id='input'
              type='number'
              value={qtd}
              min={6}
              max={15}
              onChange={e => setQtd(e.target.value)}
            />
        </form>

        <div className='containerBtns'>
            <button
              className='btn gerarNumero'
              onClick={() => {setSorteio(gerarNumeros())}}>
                Gerar Número
            </button>

            <button
            className='btn limpar'
            onClick={_ => setSorteio([])}>
              Limpar
            </button>
        </div>
      </div>
    </div>
    )
}

export default App;
