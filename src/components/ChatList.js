import React from 'react'
import styled from 'styled-components'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
//import Home from './Home'



const ChatList = ({

    conversationData,
    currentConversation,
    setCurrentConversation

}) => {

    console.log(conversationData)

    const AddNewChat = async () => {


        //Adds new chat to Chatlist and Database 
        await addDoc(collection(db, 'messages'), {
            name: "New Chat",
            avatar: `https://avatars.dicebear.com/api/identicon/${Math.random()}.svg`,
            lastMessage: '',
            lastUpdated: serverTimestamp(),
        })

    }

  return <Wrapper>
      <Title>Chats</Title>
      <Subtitle>Latest Conversations</Subtitle>
      <Conversations>
            {conversationData.map((conversation, index) => (

                <ConversationCard 
                
                    key = {index}
                
                    style={{

                        backgroundColor: 
                            currentConversation.id === conversation.id
                                ? '#1d90f4'
                                : '#2d3436',

                    }}

                    onClick = {() => setCurrentConversation(conversation)}
                
                >
                    <Avatar>
                        <img src ={conversation.avatar} alt = {conversation.name} />
                    </Avatar>
                    <ConversationInfo>
                        <Name>{conversation.name}</Name>
                        <LastMessage>{conversation.lastMessage}</LastMessage>
                    </ConversationInfo>
                </ConversationCard>

            ))}

                <AddNewConversation onClick={AddNewChat}>
                    <Avatar>
                        <i className='fas fa-plus' />
                    </Avatar>
                    <ConversationInfo>
                        <Name>New Chat</Name>
                    </ConversationInfo>
                </AddNewConversation>

      </Conversations>
  </Wrapper>
  
}

export default ChatList

const Wrapper = styled.div`

    width: 300px;
    height: calc(100vh - 100px);
    padding: 50px 32px;
    `

const Title = styled.div`

    font-size: 48px;
    font-weight: 700;
    margin-bottom: 60px;
`

const Subtitle = styled.div`

    color: #767789;
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 40px;

`

const Conversations = styled.div``

const ConversationCard = styled.div`

    display: flex;
    margin: 12px --12px;
    padding: 12px;
    border-radius: 12px;

    &:hover {

        background-color: #184773 !important;
        cursor: pointer;
    }

`

const ConversationInfo = styled.div``

const Avatar = styled.div`

    width: 60px;
    margin-right: 12px;
    display: grid;
    place-items: center;

    & > img {

        width: 80%;
        border-radius: 50%;
        object-fit: contain;
    }
  

`

const Name = styled.div`

    font-size: 24px;
    font-weight: 700;
`

const LastMessage = styled.div`

    font-weight: 500;
`

const AddNewConversation = styled.div`

    display: flex;
    margin: 12px --12px;
    padding: 12px;
    border-radius: 12px;

    & div,
    i {
        color: #757688
    }

    &:hover {
        background-color: #184773 !important;
        cursor: pointer;

        & div, i{
            color: #eee;
        }
    }

`