// import 'semantic-ui-css/semantic.min.css'
import { Container, Divider,Icon,List, Segment} from 'semantic-ui-react'



const Perfil = () => {
     
    return (
      
      <Container textAlign='center'>

<div  icon>

<h2 ><Icon name='settings' />
Mi Perfil
</h2>

  </div>
  
    <Divider />
    <Container >

    <p>Acá puedes ver tus datos de cuenta</p>

    

    <Segment.Group>
    <List>
    <Segment secondary color='pink'>
    <List.Item icon='user circle' content='nombre y apellido'/>
     <List.Item icon='address card'
      content='DNI'
    />
    <List.Item icon='calendar'
      content='Fecha de nacimiento'
    />
    </Segment>
    <Segment secondary color='pink'>
    <List.Item
      icon='mail'
      content='email'
    />
        </Segment>
  </List>
</Segment.Group>
    </Container>

    </Container>
    );
  };
  
  export default Perfil;

  /* Código para mostrar datos de usuario (Sprint 2)
import {useState} from 'react'

*Agregar consulta antes de return:
  const [user, setUser] = useState([])
useEffect(()=>{
fetch('http://107.22.65.36:8080/api/v1/usuarios{id}')
.then(response => response.json())
.then(json.setUser(json))
}, [])
  

*En return: 
 users.map((user,id)=>{
  return(
<List.Item icon='user circle' content={user.name}/>
<List.Item icon='user circle' content={user.lastname}/>  
<List.Item icon='address card'
      content={user.dni}
    />
    <List.Item icon='calendar'
      content={user.birthdate}
    />
    </Segment>
    <Segment secondary color='pink'>
    <List.Item
      icon='mail'
      content='email'
    />
  )
 })


  */