import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components
const ChatbotContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 600px;
  border: 2px solid #007bff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 1.5em;
`;

const ChatWindow = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: #f1f1f1;
`;

const UserInput = styled.div`
  display: flex;
  border-top: 1px solid #ddd;
`;

const InputField = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  font-size: 1em;
  outline: none;
`;

const SendButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 1em;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.div`
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  background-color: ${props => (props.isUser ? '#007bff' : '#e0e0e0')};
  color: ${props => (props.isUser ? 'white' : 'black')};
  align-self: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
  max-width: 80%;
`;

// Chatbot component
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, isUser: true }];
      setMessages(newMessages);
      setInput('');

      // Simulate bot response
      setTimeout(() => {
        const botResponse = getBotResponse(input);
        setMessages([...newMessages, { text: botResponse, isUser: false }]);
      }, 1000);
    }
  };

  const getBotResponse = (message) => {
    // Add your custom Q&A logic here
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes('entertainment')) {
      return "In the Entertainment category, you can get a one-month free trial by subscribing to Netflix.";
    } else if (lowerCaseMessage.includes('food')) {
      return "In the Food and Drink category, you can get a free burger with any purchase over $5 at McDonald's or enjoy a complimentary small frosty with any combo meal at Wendy's.";
    } else if (lowerCaseMessage.includes('music')) {
      return "In the Music category, you can sign up for Spotify Premium and get the first three months free.";
    } else {
      return "Sorry, I don't have information on that.";
    }
  };

  return (
    <ChatbotContainer>
      <ChatHeader>Chatbot</ChatHeader>
      <ChatWindow>
        {messages.map((msg, index) => (
          <Message key={index} isUser={msg.isUser}>
            {msg.text}
          </Message>
        ))}
      </ChatWindow>
      <UserInput>
        <InputField
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <SendButton onClick={handleSend}>Send</SendButton>
      </UserInput>
    </ChatbotContainer>
  );
};

export default Chatbot;