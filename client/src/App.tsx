import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { lazy,Suspense } from 'react'
import { AuthProvider } from './Context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Spinner from './components/ui/Spinner'
const AuthenticationPage = lazy(()=> import('./pages/AuthenticationPage'))
const VerifcationPage = lazy(()=> import("./pages/Verification"))
const PageNotFound = lazy(()=> import('./pages/PagenotFound'))
const Dashboard = lazy(()=> import('./pages/Dashboard'))

function App() {

  return (
   <Router>
    
    <AuthProvider>
     <Suspense fallback={<div className='w-screen h-screen flex items-center justify-center' ><Spinner/> </div>}>
    <Routes>
       <Route path='/' element={<AuthenticationPage/>} />
      <Route path='/verify' element={<VerifcationPage/>} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
     </Suspense>
    </AuthProvider>
   </Router>
  )
}

export default App
