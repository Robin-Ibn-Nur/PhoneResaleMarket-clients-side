import { Toaster } from 'react-hot-toast';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routs';

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
