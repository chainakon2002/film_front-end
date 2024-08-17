import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import LoginForm from '../layout/LoginForm'
import RegisterForm from '../layout/RegisterForm'
import useAuth from '../hooks/useAuth'
import Header from '../layout/Header'
import UserHome from '../layout/UserHome'
import NewTodoForm from '../layout/NewTodoForm'
import Cart from '../layout/cart'
import ThankYouPage from '../layout/test'
import ProductDetail from '../layout/OrderDate/getProductById'; // เพิ่ม import
import Payment from '../layout/pay/Payment';
import Home from '../layout/Home'
import Index1 from '../layout/index1/index1'


import Productpict from '../layout/Productpict'
import Profile from '../layout/profile'
import Adress from '../layout/pay/address'



import Adminproduct from '../layout/adminpage/adminproduct'
import Adminorder from '../layout/adminpage/adminorder'
import Admin from '../layout/adminpage/adminhome'
import Sidebar from '../layout/adminpage/Sidebar'
import Getuser from '../layout/adminpage/user'
import Adminpage from '../layout/adminpage/adminpage'
import Adminshow from '../layout/adminpage/adminshowproduct'

const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children: [
      { index: true, element: <LoginForm/> },
      { path: '/register', element: <RegisterForm />},
      { path: '/homepage', element: <Home/> },
      { path: '/index', element: <Index1/> },
      { path: '/login', element: <LoginForm/> },
    ]
  }
])

const userRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    children : [
      { index: true, element: <UserHome /> },
      { path: '/new', element: <NewTodoForm />},
      { path: '/cart', element: <Cart />},
      { path: '/new', element: <product /> },
      { path: '/product/:id', element: <ProductDetail /> },
      { path: '/payment/:id/Fs2224SbaRel2Ncvn123444Bncceddd101Mx12Z01', element: <Payment/> },
      { path: '/product01/', element: <Productpict /> },
      { path: '/profile', element: <Profile /> },
      { path: '/address', element: <Adress /> },
      { path: '/thank', element: <ThankYouPage/> },
      

      
    
    ]
  }
])

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
<div className="flex">
        <Sidebar />
        <div className="flex-1 ml-80 p-4">
          {/* <Header /> */}
          <Outlet />
        </div>
      </div>
      
    </>,
    children : [
      { index: true, element: <Admin /> },
      { path: '/Add', element: <Adminproduct/>},
      { path: '/home', element: <Admin />},
      { path: '/order', element: <Adminorder />},
      { path: '/getuser', element: <Getuser/> },
      { path: '/adminpage', element: <Adminpage/> },
      { path: '/adminshow', element: <Adminshow/> },

      
    ]
  }
])

export default function AppRouter() {
  const {user} = useAuth()
  // const finalRouter = user?.id ? userRouter : guestRouter
  const finalRouter = user?.id ? user?.role === 'ADMIN' ? adminRouter : userRouter : guestRouter;
  return (
    <RouterProvider router={finalRouter} />
  )
}
