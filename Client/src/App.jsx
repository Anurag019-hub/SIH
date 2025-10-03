import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import NotFound from './pages/Informative/Notfound.jsx';
import SidebarEmployee from './components/Dashboard/SlidebarEmployee.jsx';
import SidebarProjectHead from './components/Dashboard/SlidebarProjectHead.jsx';
import SidebarAdmin from './components/Dashboard/SlidebarAdmin.jsx';
import Landing from './pages/Welcome/Landing.jsx';
import UserLogin from './components/User/UserLogin.jsx';
import UserRegister from './components/User/UserRegister.jsx';
import  HeadDashboard  from './components/Dashboard/HeadDashboard.jsx';
import  AdminDashboard  from './components/Dashboard/AdminDashboard.jsx';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard.jsx';
import ManageKpis from './components/Dashboard/ManageKPIAdmin.jsx';
import EmployeeTaskLog from './components/Dashboard/EmployeeTaskLog.jsx';
import ApproveTasks from './components/Dashboard/HeadApproveTask.jsx';
import AssignTask from './components/Dashboard/HeadTaskAssign.jsx';
import EmployeeKpiPage from './components/Dashboard/EmployeeKpiPage.jsx';
import TeamKpis from './components/Dashboard/HeadTeamKpis.jsx';
const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Landing />} />
         <Route path="/employee" element={<SidebarEmployee />}>
            <Route path='dashboard' element={<EmployeeDashboard />} /> 
            <Route path="task-log" element={<EmployeeTaskLog />} />
             <Route path="my-kpis" element={<EmployeeKpiPage />} /> 
            {/* ... other employee pages*/}
        </Route>
         <Route path="/head" element={<SidebarProjectHead />}>
             <Route path="dashboard" element={<HeadDashboard />} />
              <Route path="approve-tasks" element={<ApproveTasks />} />
              <Route path="assign-task" element={<AssignTask />} />
             <Route path="team-kpis" element={<TeamKpis />} />
             {/* ... other head pages */}
        </Route>
         <Route path="/admin" element={<SidebarAdmin />}>
             <Route path="dashboard" element={<AdminDashboard />} />
             <Route path="manage-kpis" element={<ManageKpis />} />
             {/* ... other admin pages */}
        </Route>
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/register" element={<UserRegister/>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;