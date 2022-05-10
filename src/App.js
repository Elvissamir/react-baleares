import useUser from './components/hooks/useUser';
import { UserContext } from './components/context/userContext';
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer.jsx'
import LoginForm from './components/LoginForm';
import RequireAuth from './components/RequireAuth';

function App() {
  const { 
    currentUser, 
    setCurrentUser, 
    setCurrentUserFromToken, 
    logoutUser, 
    loginUser } = useUser() 

  useEffect(() => {
    setCurrentUserFromToken()
  }, [])

  return (
    <div className="App">
       <div className='app-container'>
        <UserContext.Provider value={{ currentUser, setCurrentUser, loginUser, logoutUser }}>
          <div className='app-nav'>
            < Nav />
          </div>
          <div className='app-content-container min-h-screen w-10/12 mx-auto px-2'>
          
          </div>
        </UserContext.Provider>

        <div className='app-footer'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
