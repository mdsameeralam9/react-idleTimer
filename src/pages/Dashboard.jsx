import { useEffect, useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userIdel, setUserIdel] = useState(20);
  const navigate = useNavigate()

  useEffect(() => {
    const id = setTimeout(() => {
     if(userIdel > 0){
      setUserIdel(p => p-1)
     } else{
        navigate('/')
     }
    }, 1000);

    return () => {
      clearTimeout(id)
    }

  }, [userIdel])

  return (
    <div className='flex w-full justify-center items-center flex-col gap h-screen'>
       <h2>User LoggedIn Successfully</h2>
       <p>Login at: {new Date().toLocaleString()}</p>
       <p>Idel since: {`${userIdel} second`}</p>
    </div>
  )
}

export default Dashboard