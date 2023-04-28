import './App.css';
import {PostList} from './features/post/PostList';
import {Container} from '@mui/system';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {PostDetails} from './features/post/PostDetails';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PostList />
  },
  {
    path: "/post/:id",
    element: <PostDetails />
  }
]);

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <header className="App-header">
          <RouterProvider router={router} />
        </header>
      </Container>
    </div>
  );
}

export default App;
