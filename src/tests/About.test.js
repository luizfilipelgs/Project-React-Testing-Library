import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Verifica se a página contém as informações sobre a Pokédex;', () => {
  test('testa se a página contém um heading h2 com o texto About Pokédex;', () => {
    renderWithRouter(<About />);
    const aboutH2 = screen.getByRole('heading', { name: /About/i, level: 2 });
    expect(aboutH2).toBeInTheDocument();
  });

  test('testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const PARAGRAPH_ONE = /This application simulates a Pokédex, a digital encyclopedia/i;
    const PARAGRAPH_TWO = /One can filter Pokémons by type/i;

    const oneP = screen.getByText(PARAGRAPH_ONE);
    const twoP = screen.getByText(PARAGRAPH_TWO);

    expect(oneP).toBeInTheDocument();
    expect(twoP).toBeInTheDocument();
  });

  test('se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const linkImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const imgAbout = screen.getByRole('img');

    expect(imgAbout).toBeInTheDocument();
    expect(imgAbout.src).toContain(linkImg);
  });
});
