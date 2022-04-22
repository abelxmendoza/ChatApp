import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Home from './Home'
import { getAuth, signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { provider } from './firebase'


const App = () => {
  
  const [user, setUser] = useState(null)
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, userSession => {
      if(userSession) {
        setUser({
          name: userSession.displayName,
          email: userSession.email,
          avatar: userSession.photoURL,

        })

      }
      else {
        setUser(null)
      }
    })

  }, [auth])

  const handleUserLogin = async () => {
    const login = await signInWithPopup(auth, provider)

    setUser({
      name: login.user.displayName,
      email: login.user.email,
      avatar: login.user.photoURL,

    })

  }
  
  return ( 
    <Wrapper>
      {user ? (
        <Home user = {user} setUser={setUser} />
      ) :(
          <SignInContainer>
            <Title>Sign In to Continue</Title>
            <SignInButton onClick = {handleUserLogin}>
              Log In with Google
            </SignInButton>
          </SignInContainer>

      )}
    </Wrapper>
  )
  
}

export default App

const Wrapper = styled.div`
  background-color: #282a37;
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
 

`

const SignInContainer = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;

`
const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
`


const SignInButton = styled.div`
  background-color: #1c91f4;
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  font-weight: 700;

  &:hover {
    cursor: pointer;

  }

`