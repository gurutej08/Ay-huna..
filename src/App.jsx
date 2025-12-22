import React from 'react'
import Gamezone from './chitti/Gamezone'
import Home from './chitti/Home'
import Lobby from './chitti/Lobby'
import Creation from './chitti/Creation'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Hostzone from './chitti/Hostzone'
import Waiting from './chitti/Waiting'


const router = createBrowserRouter(
  [
    
    {
      path:"/",
      element:<Home/>,
    },
    {
      path:"/lobby",
      element:<Lobby/>,
    },
    {
      path:"/creation",
      element:<Creation/>,
    },
    {
      path:"/gamezone",
      element:<Gamezone/>,
    },
     {
      path:"/hostzone",
      element:<Hostzone/>,
    },
    {
      path:"/waiting",
      element:<Waiting/>,
    },


  ]
)
const App = () => {

  return (
    <RouterProvider router={router} />
  )  
}

export default App

