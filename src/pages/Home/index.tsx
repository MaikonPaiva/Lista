import React,{useState, useEffect} from 'react'
import './styles.css'
import { Card, CardProps } from '../../components/Card'

type ProfileResponse = {
  name: string;
  avatar_url: string;
}
type User = {
  name:string;
  avatar:string;
}

export function Home() {
  const[studentName, setStudentName] = useState('')
  const [studets, setStudents] = useState<CardProps[]>([])
  const [user, setUser] = useState<User>({} as User)

  function handleAddStudent(){
    const newStudent = {
      name:studentName,
      time:new Date().toLocaleTimeString("pt-br",{

        hour: '2-digit',
        minute:'2-digit',
        second: '2-digit',

      })
    }
    setStudents(prevState =>[...prevState,newStudent])
  }
 
useEffect(() => {
fetch('https://api.github.com/users/MaikonPaiva')
.then(response => response.json() ) 
.then(data => {
 setUser ({
  name: data.name,
  avatar: data.avatar_url,
 } as User  )
})
},[])
  return (
  <div className="container">
  <img src="./public/imagem.png" alt="" id="imagem"></img>
 
    
   <header>
    <h1>Lista de Presença</h1>
    <div>
    <strong>{user.name}</strong>
    <img src={user.avatar} alt="Foto de perfil" />
    </div>
    
    </header>

   <input 
   type="text"
   placeholder="Digite o nome..."
   onChange={e => setStudentName(e.target.value)}/>

   <button type="button" onClick={handleAddStudent}>
    Adicionar
    </button>


  {
    studets.map(student => (
    <Card 
      key={student.time}
      name={student.name} 
      time={student.time}
      
      />))
    
    }

  </div>
  
  )
}

