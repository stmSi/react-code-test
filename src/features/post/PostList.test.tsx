import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { PostList } from './PostList';

test('renders PostList component without crashing', () => {
  render(
    <Provider store={store}>
      <PostList />
    </Provider>
  );
});


test('renders search input field', () => {
  render(
    <Provider store={store}>
      <PostList />
    </Provider>
  );
  const searchField = screen.getByLabelText(/search title/i);
  expect(searchField).toBeInTheDocument();
});

test('search input field value changes when typing', () => {
  render(
    <Provider store={store}>
      <PostList />
    </Provider>
  );
  const searchField = screen.getByLabelText(/search title/i);
  fireEvent.change(searchField, { target: { value: 'test' } });
  expect(searchField).toHaveValue('test');
});
