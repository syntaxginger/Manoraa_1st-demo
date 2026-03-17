import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThreePanelLayout from './components/layout/ThreePanelLayout';
import SearchGuide from './pages/5-SearchGuide';
import DatabaseDocs from './pages/6-DatabaseDocs';
import SystemSettings from './pages/7-Settings';

// 1. นำไฟล์จริงที่คุณเขียนไว้มาใส่แทนที่ Placeholder เดิม
import SmartSearch from './pages/1-SmartSearch';
import InsightDashboard from './pages/2-InsightDashboard'; // หน้า Dashboard ของจริง
import DeepDiveLab from './pages/3-DeepDiveLab';           // หน้า Lab 3D
import SummaryReport from './pages/4-SummaryReport';       // หน้า Report

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ThreePanelLayout />}>
          {/* 2. เปลี่ยน Element ให้เรียกใช้ Component ของจริงตาม Path */}
          <Route path="/" element={<SmartSearch />} />
          <Route path="/dashboard" element={<InsightDashboard />} />
          <Route path="/lab" element={<DeepDiveLab />} />
          <Route path="/report" element={<SummaryReport />} />
          <Route path="/guide" element={<SearchGuide />} />
          <Route path="/docs" element={<DatabaseDocs />} />
          <Route path="/settings" element={<SystemSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;