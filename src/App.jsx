import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
