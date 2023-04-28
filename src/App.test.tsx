import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders App component without crashing', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

test('renders PostList component at path /', () => {
  window.history.pushState({}, 'Test page', '/');
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const postListElement = screen.getByText(/Search Title/i);
  expect(postListElement).toBeInTheDocument();
});
