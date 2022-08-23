import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('verifica o componente  <Pokemon.js />', () => {
  test('verifica as informações dos pokemons (name, type, peso e etc)', () => {
    renderWithRouter(<App />);

    const numberIndexMax = 8;

    for (let index = 0; index <= numberIndexMax; index += 1) {
      const dataPokemon = pokemons[index];
      const { name, type, averageWeight, image } = dataPokemon;
      const { value, measurementUnit } = averageWeight;

      const pokemonName = screen.getByTestId('pokemon-name');
      const pokemonType = screen.getByTestId('pokemon-type');
      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const pokemonImg = screen.getByRole('img', { alt: name });

      expect(pokemonName.innerHTML).toBe(name);
      expect(pokemonType.innerHTML).toBe(type);
      expect(pokemonWeight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
      expect(pokemonImg).toBeInTheDocument();
      expect(pokemonImg.src).toEqual(image);
      expect(pokemonImg.alt).toBe(`${name} sprite`);

      const btnNext = screen.getByRole('button', { name: 'Próximo pokémon' });
      userEvent.click(btnNext);
    }
  });

  test('verifica se Pokédex contém um link de navegação para exibir detalhes )', () => {
    renderWithRouter(<App />);
    const numberIndexMax = 8;

    for (let index = 0; index <= numberIndexMax; index += 1) {
      const dataPokemon = pokemons[index];
      const { id } = dataPokemon;
      const link = `/pokemons/${id}`;

      const linkDetails = screen.getByRole('link', { name: 'More details' });
      expect(linkDetails).toHaveAttribute('href', link);

      const btnNext = screen.getByRole('button', { name: 'Próximo pokémon' });
      userEvent.click(btnNext);
    }
  });

  test('se ao clicar no link de navegação do pokémon, é feito o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);
    /* const { location: { pathname } } = history;  why */
    const link = '/pokemons/25';
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);
    /* expect(pathname).toBe(link); */
    expect(history.location.pathname).toBe(link);
  });

  test('se existe um ícone de estrela nos pokémons favoritados:', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');
    const favoriteCheck4 = screen.getByRole('checkbox');
    userEvent.click(favoriteCheck4);
    const iconFavorite = screen.getByAltText(/is marked as favorite/i);
    expect(iconFavorite).toBeInTheDocument();
    const srcFav = '/star-icon.svg';
    expect(iconFavorite.src).toContain(srcFav);
    expect(iconFavorite.alt).toBe('Pikachu is marked as favorite');
  });
});
