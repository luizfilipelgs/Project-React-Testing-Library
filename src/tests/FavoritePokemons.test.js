import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemons from '../pages/FavoritePokemons';

describe('Verifica o componente <FavoritePokemons.js />', () => {
  test('exibida "No favorite pokemon found" caso não tenha pokémons favoritos;', () => {
    renderWithRouter(<FavoritePokemons />);
    const NO_FAVORITE_TEXT = /No favorite pokemon found/i;

    const paragraph = screen.getByText(NO_FAVORITE_TEXT);

    expect(paragraph).toBeInTheDocument();
  });

  test('testa se a página contém um heading h2 com o texto: Favorite pokémons;', () => {
    renderWithRouter(<FavoritePokemons />);

    const favoriteH2 = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2 });
    expect(favoriteH2).toBeInTheDocument();
  });

  test('Teste se são exibidos todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/4');
    const favoriteCheck4 = screen.getByRole('checkbox');
    userEvent.click(favoriteCheck4);

    history.push('/pokemons/151');
    const favoriteCheck151 = screen.getByRole('checkbox');
    userEvent.click(favoriteCheck151);

    history.push('/favorites');

    const numFavorits = screen.getAllByTestId('pokemon-name');
    expect(numFavorits.length).toBe(2);
  });
});
