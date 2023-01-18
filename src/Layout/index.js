import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Homepage from "./Homepage";
import CreateDeck from "./Decks/CreateDeck";
import ViewDeck from "./Decks/ViewDeck";
import EditDeck from "./Decks/EditDeck";
import CardList from "./Cards/CardList";
import CreateCard from "./Cards/CreateCard";
import EditCard from "./Cards/EditCard";

export default function Routing() {
  const [deck, setDeck] = useState({ cards: [] });

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck deck={deck} setDeck={setDeck} />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <CardList />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <CreateCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}
