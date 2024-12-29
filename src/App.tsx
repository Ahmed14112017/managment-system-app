import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Authlayout from './Modules/Component/Shared/Authlayout/Authlayout'
import Notfound from './Modules/Component/Shared/Notfound/Notfound'
import Login from './Modules/Component/Authentication/Login/Login'
import Register from './Modules/Component/Authentication/Register/Register'
import ForgetPassword from './Modules/Component/Authentication/ForgetPassword/ForgetPassword'
import VerifyAccount from './Modules/Component/Authentication/VerifyAccount/VerifyAccount'
import ResetPassword from './Modules/Component/Authentication/ResetPassword/ResetPassword'
import ChangePassword from './Modules/Component/Authentication/ChangePassword/ChangePassword'
import Dashboard from './Modules/Component/Dashboard/Dashboard'
import MasterLayout from './Modules/Component/Shared/MasterLayout/MasterLayout'
import Projects from './Modules/Component/Projects/Projects'
import Taskes from './Modules/Component/Taskes/Taskes'
import Users from './Modules/Component/Users/Users'
import { ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.css"
import ProjectData from './Modules/Component/Projects/ProjectData'
import Taskesdata from './Modules/Component/Taskes/Taskesdata'

function App() {

  const Routes=createBrowserRouter([
    {
      path:"/",element:<Authlayout />,
      errorElement:<Notfound />,
      children:[
        {
          index:true ,element:<Login />     
        },
        {
          path:"login" ,element:<Login />     
        },
        {
          path:"register" ,element:<Register />     
        },
        {
          path:"forget-password" ,element:<ForgetPassword />     
        },
        {
          path:"reset-password" ,element:<ResetPassword />     
        },
        {
          path:"verify-account" ,element:<VerifyAccount />     
        },
        {
          path:"change-password" ,element:<ChangePassword />     
        },
      ]
    },
    {
      path:"dashboard",element:<MasterLayout />,
      errorElement:<Notfound />,
      children:[
        {
          path:"" , element:<Dashboard />
        },
        {
          path:"dashboard" , element:<Dashboard />
        },
        {
          path:"project",element:<Projects />
        },
        {
          path:"projectdata",element:<ProjectData />
        },
        {
          path:"projectdata/:id",element:<ProjectData />
        },
        {
          path:"tasks",element:<Taskes />
        },
        {
          path:"tasksdata",element:<Taskesdata />
        },
        {
          path:"tasksdata/:id",element:<Taskesdata />
        },
        {
          path:"users",element:<Users />
        }
      ]
    }
  ])

  return (
    <>
    
      <RouterProvider router={Routes} />
      <ToastContainer />
    </>
  )
}

export default App
