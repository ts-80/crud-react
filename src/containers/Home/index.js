import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import People from '../../assets/people.svg'
import arrow from '../../assets/arrow.svg'

import H1 from '../../components/Title'

import {
  Container,
  Image, ContainerItens,
  InputLabel, Input,
  Button
} from './styles'


const App = () => {
  // const users = []
  const [users, setUsers] = useState([])
  const inputName = useRef()
  const inputAge = useRef()

  const history = useHistory()
  // REACT HOOKS => FERRAMENTAS AUXILIARES

  // UM STADO NO REACT É IMUTAVEL


  async function addNewUser() {
    const { data: newUser } = await axios.post("http://localhost:3001/users", {
      name: inputName.current.value,
      age: inputAge.current.value
    })

    setUsers([...users, newUser.user])
    history.push("/usuarios")

  }

  // REACT HOOKS => useEffect (efeito colateral)
  // A minha aplicação inicia(pagina carregou o useEffect e chamado)
  // Quando um estado que esta no array de dependencias do usseEffect é alterado ex: users
  //useEffect precisa de dois parametros uma função anonima e um array



  return (<Container>
    <Image alt='LogoImagem' src={People} />
    <ContainerItens>
      <H1>Olá</H1>

      <InputLabel>Nome</InputLabel>
      <Input ref={inputName} placeholder='Nome' />

      <InputLabel>Idade</InputLabel>
      <Input ref={inputAge} placeholder='Idade' />

      <Button onClick={addNewUser}>Cadastrar<img alt='seta' src={arrow} /></Button>

    </ContainerItens>
  </Container>)
}

export default App