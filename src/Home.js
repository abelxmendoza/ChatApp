import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import ChatList from './components/ChatList';
import ChatView from './components/ChatView';
import { db } from './firebase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import './App.css';
import './App.js';



function Home({user, setUser}) {
    const [conversationData, setConversationData] = useState([])
    const [currentConversation, setCurrentConversation] = useState('')


        //Downloads every conversation in database
        useEffect(() => {
            const q = query(collection(db,'messages'), orderBy('lastUpdated', 'desc'))

            const unsubscribe = onSnapshot(q, snapshot => {
                const conversations = []

                // eslint-disable-next-line array-callback-return
                snapshot.docs.map(doc => {
                    conversations.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                })

                console.log(conversations)

                setConversationData(conversations)
            })

            return () => unsubscribe()
        }, [])

  return (
    <Wrapper>
      <Sidebar user = {user} setUser={setUser} />
      <ChatList 
        conversationData = {conversationData}
        setCurrentConversation = {setCurrentConversation}
        currentConversation = {currentConversation}
        />
      <Main>
        <ChatView currentConversation = {currentConversation} user = {user} />
      </Main>
    </Wrapper>
  );
}

export default Home


const Wrapper = styled.div`  

background-color: #282a37;
min-height: 100vh;
max-height: 100vh;
min-width: 100vw;
max-width: 100vw;

display: flex;
flex-direction: row;
`

  const Main = styled.div`
  
    flex: 1;
    display: flex;
    justify-content: center;
  
  `