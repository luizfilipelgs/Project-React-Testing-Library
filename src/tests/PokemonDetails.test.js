import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('informações detalhadas do pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(pokemonDetails);

    const pokemonName = screen.getByTestId('pokemon-name');
    const detailsH2 = screen.getByRole('heading', { name: /pikachu details/i, level: 2 });
    const summaryH2 = screen.getByRole('heading', { name: /summary/i, level: 2 });
    const locationH2 = screen.getByRole('heading',
      { name: /Game Locations of Pikachu/i, level: 2 });
    const summaryText = screen.getByText(/This intelligent Pokémon roasts/i);

    expect(pokemonName.innerHTML).toBe('Pikachu');
    expect(detailsH2).toBeInTheDocument();
    expect(summaryH2).toBeInTheDocument();
    expect(locationH2).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
  });
  test('Se existemos mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(pokemonDetails);

    const map1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const map2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    const map = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(map).toHaveLength(2);
    expect(map[0].src).toBe(map1);
    expect(map[1].src).toBe(map2);
  });

  test(' O usuário pode favoritar um pokémon através da página de detalhes:', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const favoriteChecked = screen.getByText(/pokémon favoritado/i);
    expect(favoriteChecked).toBeInTheDocument();
  });
});
