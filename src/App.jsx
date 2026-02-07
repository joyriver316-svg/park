import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import SystemHealth from './pages/SystemHealth';
import ParkingLotList from './pages/ParkingLotList';
import EntryExitLogs from './pages/EntryExitLogs';
import PolicyList from './pages/PolicyList';
import RevenueReport from './pages/RevenueReport';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="system-health" element={<SystemHealth />} />

          {/* Placeholder routes for other pages */}
          <Route path="parking-lots" element={<ParkingLotList />} />
          <Route path="logs" element={<EntryExitLogs />} />
          <Route path="policies" element={<PolicyList />} />
          <Route path="revenue" element={<RevenueReport />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
