import logo from './logo.svg';
import './App.css';

function App() {
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
