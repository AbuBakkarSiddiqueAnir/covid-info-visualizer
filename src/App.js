import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme } from '@material-ui/core/styles';
import React, { lazy, Suspense, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer, Header, Skeleton } from './components';
import { ThemeContext } from './context/ThemeContext';
import { themeDark, themeLight } from './utils/rootStyles';

const Home = lazy(() => import('./pages/Home/Home.jsx'));


const App = () => {
  const { theme } = useContext(ThemeContext);
  const appliedTheme = createTheme(theme.isDark ? themeDark : themeLight);
  const [location,setLocation] = useState(null)


  return (
    <Router>
      <ThemeProvider theme={appliedTheme}>
        <div className="App App__padding-vertical">
          <div className="App__container">
            <CssBaseline />
            <Header location={location} />
            <Suspense fallback={<Skeleton />}>
              <Routes>
                <Route  path="/" element={<Home setLocation={setLocation}/>} />
                {/* <Route  path="/overtime" element={<Overtime setLocation={setLocation}/>} /> */}
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
