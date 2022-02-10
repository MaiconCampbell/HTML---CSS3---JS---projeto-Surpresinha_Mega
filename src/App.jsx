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
    
    if(qtd === '') { 
      alert('Informar no campo a quantidade de números: entre 6 e 15')
      setQtd(6);
    }
      const numeros = Array(+qtd)
      .fill(0)
      .reduce(nums => {
        const novoNumero = gerarNumeroNaoContido(nums)
        return [...nums, novoNumero]
      }, [])
      .sort((n1, n2) => n1 - n2)

      return numeros;
  }

  function EnviarForm(event) {
    event.preventDefault();
    setSorteio(gerarNumeros());
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

        <form onSubmit={EnviarForm}>
          <label className='label-form' htmlFor="qtdNumeros">Informar a quantidade de números:</label>
          <input
            name="qtdNumeros"
            id='input'
            type='number'
            placeholder='6 a 15'
            value={qtd}
            comingsoon={qtd ? 1 : 0}
            min={6}
            max={15}
            onChange={e => setQtd(e.target.value)}
          />

          <div className='containerBtns'>
            <input
              className='btn gerarNumero'
              type='submit'
              value='Gerar Número'
            />

            <input
              className='btn limpar'
              type='button'
              onClick={_ => setSorteio([])}
              value="Limpar"
            />
          </div>
        </form>
      </div>
    </div>
    )
}

export default App;
