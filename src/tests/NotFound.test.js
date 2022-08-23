import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('verifica o componente  <NotFound.js />', () => {
  test('A página deve conter um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const headingNotFound = screen.getByRole('heading', {
      name: /page requested not found/i, level: 2 });
    expect(headingNotFound).toBeInTheDocument();
  });
  test('verifica se a pagina mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    renderWithRouter(<NotFound />);
    const linkImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgNotFound = screen.getByRole('img', { name: /pikachu crying/i });
    expect(imgNotFound.src).toContain(linkImg);
  });
});
