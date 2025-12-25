import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './routes/App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


// Import CSS in your main index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login.jsx'
import Signup from './Signup.jsx'
import Faq from './Faq.jsx'
import About from './About.jsx'
import Quizlist from './Quizlist.jsx'
import Osquiz from './Osquiz.jsx'
import Home from '../Home.jsx'
import DBquiz from './DBquiz.jsx'
import HTML from './HTML.jsx'
import CSS from './CSS.jsx'
import { Provider } from 'react-redux'
import store from './store/store.jsx'; 
import QuizRules from './Quizrules.jsx'
import Customquiz from './Customquiz.jsx'
import Custom from './Custom.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

const route = createBrowserRouter([{path:"/",element:<App/>,
  children:[
      {path:"/",element:<Home/>},
    {path:"home",element:<Home/>},
     { path: 'Login', element: <Login /> }, 
    {path:"Signup",element:<Signup/>},
    {path:"Faq",element:<Faq/>},
    {path:"About",element:<About/>},
    {element:<ProtectedRoute/>,
    children:[{path:"Quizlist",element:<Quizlist/>},
       {path:"osquiz",element:<Osquiz/>},
        {path:"dbquiz",element:<DBquiz/>},
        {path:"htmlquiz",element:<HTML/>},
        {path:"cssquiz",element:<CSS/>},
         {path:"Quizrules",element:<QuizRules/>},
         {path:"Customquiz",element:<Customquiz/>},
      { path: "Custom/:id", element: <Custom/> }]}
    
  ]
}])
 

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
 <RouterProvider router={route}/>
 </Provider>
)
