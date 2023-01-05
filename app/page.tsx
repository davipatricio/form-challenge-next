'use client';

import { MouseEvent, ChangeEvent, useState } from 'react'
import './globals.css'

/*
* CHALLENGE progresso do formulário
* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.
* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar
* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero
Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...
Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.
Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.
Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.
Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

interface FormData {
  fullName: string;
  email: string;
  civilStatus: string;
  genre: string;
}

const defaultData = {
  fullName: '',
  email: '',
  civilStatus: '',
  genre: ''
} as FormData;

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const calculateProgress = (data: FormData) => {
  const formElements = Object.keys(data).length; 
  let progress = 0;

  for (const baseKey in data) {
    const key = baseKey as keyof FormData;

    switch (key) {
      case 'email':
        if (emailRegex.test(data[key])) progress++;
        break;
      case 'fullName':
        if (data[key].split(' ').length > 1) progress++;
        break;
      default:
        if (data[key]) progress++;
        break;
    }
  }

  // return the percentage of filled fields (25% per field)
  return (progress * 100) / formElements;
}

export default function Home() {
  const [data, setData] = useState<FormData>(defaultData)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData((prev) => {
      return {
        ...prev,
        // Obtém o nome do campo e o valor digitado
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setData(defaultData)
    alert('Formulário enviado com sucesso!')
  }

  return (
    <div>
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        <div className="bar-container">
          <div className="bar" style={{ width: `${calculateProgress(data)}%` }}></div>
        </div>

        <div className='form-group'>
          <label htmlFor=''>Nome Completo</label>
          <input name='fullName' value={data.fullName} onChange={handleChange} />
        </div>

        <div className='form-group'>
          <label htmlFor=''>E-mail</label>
          <input name='email' value={data.email} onChange={handleChange} />
        </div>

        <div className='form-group'>
          <label htmlFor=''>Estado Civil</label>
          <select name='civilStatus' value={data.civilStatus} onChange={handleChange}>
            <option value=''>- selecione...</option>
            <option value='solteiro'>Solteiro</option>
            <option value='casado'>Casado</option>
            <option value='divorciado'>Divorciado</option>
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor=''>Gênero</label>
          <div className='radios-container'>
            <span>
              <input type='radio' name='genre' value='masculino' onChange={handleChange} checked={data.genre === 'masculino'} /> Masculino
            </span>
            <span>
              <input type='radio' name='genre' value='feminino' onChange={handleChange} checked={data.genre === 'feminino'} /> Feminino
            </span>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={calculateProgress(data) !== 100}>Enviar Formulário</button>
      </main>
    </div>
  )
}
