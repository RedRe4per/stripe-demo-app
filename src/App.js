import './App.css';
import Header from './components/Header';
import ShoppingCart from './components/ShoppingCart';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Header />
      <ShoppingCart />
      <ToastContainer
        style={{ fontSize: "16px" }}
        theme="dark"
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
