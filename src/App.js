import useUser from './components/hooks/useUser';
import { UserContext } from './components/context/userContext';
import { useEffect } from 'react'
import Router from './components/Router';
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer.jsx'

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
            <Nav />
          </div>
          <div className='app-content-container min-h-screen w-10/12 mx-auto px-2'>
            <Router />
          </div>
          <div className='app-footer'>
            <Footer />
          </div>
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default App;
