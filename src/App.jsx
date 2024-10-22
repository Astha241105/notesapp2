import { createBrowserRouter, RouterProvider,Navigate } from "react-router-dom";
import Notes from './notes';
import Login from './login';
import Newregistration from './re';

const router =createBrowserRouter(
    [
      {
        path:"/user/signup",
        element:<Newregistration/>
      },{
        path:"/user/login",
        element:<Login/>
      },{
        path:"/notes",
        element:<Notes/>
      }, {
        path: "/", 
        element: <Navigate to="/user/signup" /> 
      }
    ]
  )

function App() {
  return(
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}
  

export default App;
