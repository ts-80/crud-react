import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import avatar from '../../assets/avatar.svg'
import arrow from '../../assets/arrow.svg'
import Trash from '../../assets/trash.svg'

import {
  Container, H1,
  Image, ContainerItens,
  Button, User
} from './styles'

const Users = () => {
  // const users = []
  const [users, setUsers] = useState([])
  const history = useHistory()


  // REACT HOOKS => useEffect (efeito colateral)
  // A minha aplicação inicia(pagina carregou o useEffect e chamado)
  // Quando um estado que esta no array de dependencias do usseEffect é alterado ex: users
  //useEffect precisa de dois parametros uma função anonima e um array

  useEffect(() => {
    async function fetchUsers() {
      const { data: newUsers } = await axios.get("http://localhost:3001/users")

      setUsers(newUsers.users)
    }
    fetchUsers()
  }, [])

  async function deleteUser(userId) {
    await axios.delete(`http://localhost:3001/users/${userId}`)
    const newUsers = users.filter(user => user.id !== userId)
    setUsers(newUsers)
  }

  function goBackPage() {
    history.push('/')
  }

  return (<Container>
    <Image alt='LogoImagem' src={avatar} />
    <ContainerItens>
      <H1>Usuários</H1>

      <ul>
        {users.map(user => (
          <User key={user.id}>
            <p>{user.name}</p> <p>{user.age}</p>
            <button onClick={() => deleteUser(user.id)}>
              <img src={Trash} alt='lata-de-lixo' />
            </button>
          </User>
        ))
        }
      </ul>

      <Button onClick={goBackPage}><img alt='seta' src={arrow} />Voltar</Button>
    </ContainerItens>
  </Container>)
}

export default Users