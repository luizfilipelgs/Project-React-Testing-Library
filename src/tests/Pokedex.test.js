import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica o componente  <Pokedex.js />', () => {
  test('A página deve conter h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const headingPokedex = screen.getByRole('heading', {
      name: /Encountered pokémons/i, level: 2 });
    expect(headingPokedex).toBeInTheDocument();
  });
  test('O botão All precisa estar sempre visível.', () => {
    renderWithRouter(<App />);
    const BtnAll = screen.getByRole('button', { name: /all/i });
    expect(BtnAll).toBeInTheDocument();
  });
  test('É exibido o próximo pokémon da lista ao clicar em "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const btnNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/ });
    expect(btnNextPokemon).toBeInTheDocument();

    const pokemonsList = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans',
      'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

    pokemonsList.forEach((pokemon) => {
      const pokemonCheck = screen.getByText(pokemon);
      expect(pokemonCheck).toBeInTheDocument();
      userEvent.click(btnNextPokemon);
    });
  });

  describe('Se a Pokédex tem os botões de filtro:', () => {
    test('Deve existir apenas um botão de filtragem para cada tipo de pokémon', () => {
      renderWithRouter(<App />);

      const btnFiltros = ['Electric', 'Fire', 'Bug',
        'Poison', 'Psychic', 'Normal', 'Dragon'];
      btnFiltros.forEach((btn) => {
        const btnVerify = screen.getAllByRole('button', { name: btn });
        screen.getAllByTestId('pokemon-type-button');
        expect(btnVerify.length).toBe(1);
      });
    });

    test('ao clicar no btn de filtro, apenas os daquele tipo devem ser mostrados', () => {
      renderWithRouter(<App />);
      const btnPsychic = screen.getByRole('button', { name: 'Psychic' });
      userEvent.click(btnPsychic);
      const textTypePok1 = screen.getByTestId('pokemon-type');
      const namePok1 = screen.getByTestId('pokemon-name');
      expect(textTypePok1).toHaveTextContent('Psychic');
      expect(namePok1).toHaveTextContent('Alakazam');
      const btnNext = screen.getByRole('button', { name: 'Próximo pokémon' });
      userEvent.click(btnNext);
      const textTypePok2 = screen.getByTestId('pokemon-type');
      const namePok2 = screen.getByTestId('pokemon-name');
      expect(textTypePok2).toHaveTextContent('Psychic');
      expect(namePok2).toHaveTextContent('Mew');
    });
  });

  describe('Se a Pokédex contém um botão para resetar o filtro:', () => {
    test('O texto do botão deve ser All', () => {
      renderWithRouter(<App />);
      const btnAll = screen.getByRole('button', { name: /All/i });
      userEvent.click(btnAll);
      expect(btnAll).toBeInTheDocument();
    });
  });
});
