import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import {AnimatePresence} from 'motion/react';
import AICenter from './components/AICenter';
import TaxiBooking from './components/TaxiBooking';
import RoutePlanner from './components/RoutePlanner';
import Insights from './components/Insights';
import Explore from './components/Explore';
import SettingsPage from './components/SettingsPage';
import TripStatus from './components/TripStatus';
import {BottomNavBar, TopBar} from './components/Navigation';
import {cn} from './lib/utils';

function AnimatedRoutes() {
  const location = useLocation();
  
  // Hide TopBar and BottomNavBar on specific transactional screens
  const isTaxiBooking = location.pathname === '/taxi';
  const isTripStatus = location.pathname === '/trip-status';
  const isSettings = location.pathname === '/settings';
  
  const hideShell = isTaxiBooking || isTripStatus || isSettings;

  return (
    <div className="min-h-screen bg-surface">
      {!hideShell && <TopBar />}
      
      <main className={cn(!hideShell && "pt-20")}>
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={<AICenter />} />
            <Route path="/taxi" element={<TaxiBooking />} />
            <Route path="/route" element={<RoutePlanner />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/trip-status" element={<TripStatus />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!hideShell && <BottomNavBar />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

