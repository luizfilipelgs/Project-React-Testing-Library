import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica o funcionamento de App.js', () => {
  test('Se existe os links de navegação: home, about e favorite pokémons:', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeInTheDocument();

    const favorite = screen.getByRole('link', { name: /Favorite/i });
    expect(favorite).toBeInTheDocument();
  });

  test('Verifica direcionamento ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica direcionamento ao clicar no link about', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/i });
    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  test('Verifica direcionamento ao clicar no link favorite', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /Favorite/i });
    userEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Ao entrar em uma URL desconhecida é redirecionada para not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/VQV!');
    const notFound = screen.getByRole('heading', { name: /not found/i, level: 2 });
    expect(notFound).toBeInTheDocument();
  });
});
