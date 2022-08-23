import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

function renderWithRouter(component) {
  const historyCustom = createMemoryHistory()
  const returnFromRender = render(
    <Router history={historyCustom}>{component}</Router>
  )
  return { history: historyCustom, ...returnFromRender}
}

export default renderWithRouter;
