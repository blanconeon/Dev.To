import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from "./app/store.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>
  
)

/*Not just in a test,  in the real code too. You just never noticed because Provider is always there in the real app — it's set up once in main.jsx and you never have to think about it again. So every time you called useDispatch in a component it silently found the Provider context without you having to do anything.

The test is the first time you ran a component without that context, which is why it became visible.

useDispatch is a hook provided by react-redux. It only works inside a component tree that has a <Provider> somewhere above it. That's the contract — no Provider, no dispatch.*/