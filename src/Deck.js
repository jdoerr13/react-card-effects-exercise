import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css'; 

function Deck() {
  const baseURL = 'https://deckofcardsapi.com/api/deck';
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    async function fetchNewDeck() {//create new function to encapsulate the async logic
      try {
        const response = await axios.get(`${baseURL}/new/shuffle/`);
        setDeckId(response.data.deck_id);
      } catch (error) {
        console.error("Error fetching new deck:", error);
      }
    }
    fetchNewDeck();
  }, []);


  
  const drawCard = async () => {
    if (deckId && cards.length < 52) {
      try {
        const response = await axios.get(`${baseURL}/${deckId}/draw/`);
        const data = response.data;

        if (data.cards && data.cards.length > 0) {
          const newCard = {
            ...data.cards[0],
            rotation: Math.random() * 90 - 45  // Store the rotation angle here
          };
          setCards(currentCards => [...currentCards, newCard]);
        } else {
          alert("Error: no cards remaining!");
        }
      } catch (error) {
        console.error("Error drawing a card:", error);
      }
    } else {
      alert("Error: no cards remaining!");
    }
  };

  const shuffleDeck = async () => {
    if (!deckId) return;

    setIsShuffling(true);

    try {
      await axios.get(`${baseURL}/${deckId}/shuffle/`);
      setCards([]);
    } catch (error) {
      console.error("Error shuffling the deck:", error);
    } finally {
      setIsShuffling(false);
    }
  };

  return (
    <div>
      <div className="Deck">
      <button onClick={drawCard} disabled={!deckId}>GIMME A CARD!</button>
      </div>
      <div className="card-area">
        {cards.map((card, index) => (
        <Card 
          key={index} 
          image={card.image} 
          value={card.value} 
          suit={card.suit} 
          rotation={card.rotation}
          />
        ))}
      </div>
      <div className="Deck2">
      <button  onClick={shuffleDeck} disabled={isShuffling}>SHUFFLE DECK</button>
      </div>
    </div>
  );
}

export default Deck;
