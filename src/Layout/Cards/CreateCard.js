import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import Breadcrumb from "../Breadcrumb";
import CardForm from "./CardForm";

export default function CreateCard() {
  const blankCreateCard = {
    front: "",
    back: "",
  };
  const [createCardData, setCreateCardData] = useState(blankCreateCard);
  const [currentDeck, setCurrentDeck] = useState({});

  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getDeck() {
      const deckApi = await readDeck(deckId);
      setCurrentDeck(deckApi);
    }
    getDeck();
  }, [deckId]);

  const handleCreateCardSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, {
      front: createCardData.front,
      back: createCardData.back,
    });
    setCreateCardData(blankCreateCard);
  };

  const handleCreateCardChange = (event) => {
    event.preventDefault();
    setCreateCardData({
      ...blankCreateCard,
      ...createCardData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateCardCancel = (event) => {
    event.preventDefault();
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <Breadcrumb
        middleText={currentDeck.name}
        deckId={currentDeck.id}
        finalText={"Add Card"}
      />
      <h1>{currentDeck.name}: Add Card</h1>
      <CardForm
        cardData={createCardData}
        handleChange={handleCreateCardChange}
        handleSubmit={handleCreateCardSubmit}
        handleCancel={handleCreateCardCancel}
      />
    </div>
  );
}
