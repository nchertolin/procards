import React from 'react';
import CardList from './CardList';

export default function Content({ title, decks }) {
  return (
    <>
      <h1>{title}</h1>
      <CardList data={decks} />
    </>
  )
}
