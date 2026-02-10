import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import SystemHealth from './pages/SystemHealth';
import ParkingLotList from './pages/ParkingLotList';
import EntryExitLogs from './pages/EntryExitLogs';
import PolicyList from './pages/PolicyList';
import RegularPassList from './pages/RegularPassList';
import DiscountTicketList from './pages/DiscountTicketList';
import SettlementList from './pages/SettlementList';
import RevenueReport from './pages/RevenueReport';
import Settings from './pages/Settings';
import Monitoring from './pages/Monitoring';
import TenantManagement from './pages/TenantManagement';
import AIAgent from './pages/AIAgent';
import ParkingHealth from './pages/ParkingHealth';
import CIPFlow from './pages/CIPFlow';
import RevenueSimulator from './pages/RevenueSimulator';
import EVAnalysis from './pages/EVAnalysis';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="ai-agent" element={<AIAgent />} />
          <Route path="parking-health" element={<ParkingHealth />} />
          <Route path="cip-flow" element={<CIPFlow />} />
          <Route path="revenue-simulator" element={<RevenueSimulator />} />
          <Route path="ev-analysis" element={<EVAnalysis />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="system-health" element={<SystemHealth />} />
          <Route path="parking-lots" element={<ParkingLotList />} />
          <Route path="logs" element={<EntryExitLogs />} />
          <Route path="policies" element={<PolicyList />} />
          <Route path="regular-passes" element={<RegularPassList />} />
          <Route path="discounts" element={<DiscountTicketList />} />
          <Route path="settlements" element={<SettlementList />} />
          <Route path="revenue" element={<RevenueReport />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="tenants" element={<TenantManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
