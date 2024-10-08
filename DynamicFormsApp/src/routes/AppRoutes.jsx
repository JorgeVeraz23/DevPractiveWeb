
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/DynamicFormPages/Home';
import About from '../pages/DynamicFormPages/About';
import FormCarPage from "../pages/DynamicFormPages/FormCardPage"
import PetForm from '../pages/DynamicFormPages/PetForm';

import FormDisplay from '../pages/DynamicFormPages/EditFormPage';

import CreateFormPage from '../pages/DynamicFormPages/CreateFormPage'
import CreateFormGroupPage from '../pages/DynamicFormPages/CreateFormGroupPage'
import CreateFormFieldPage from '../pages/DynamicFormPages/CreateFormFieldPage'
import FormResponsesDisplay from '../pages/DynamicFormPages/FormResponsePage'
import FilledFormSelector from '../pages/DynamicFormPages/FilledFormSelectorPage';
// import VehiculosTable  from '../pages/VehiculosForm';
import VehiculosCards from '../pages/DynamicFormPages/VehiculosCards';
import VehiculosCarousel from '../pages/DynamicFormPages/VehiculosCarousel';
import UserManagement from "../pages/DynamicFormPages/UserManagement.tsx"
import VehiculosTable from '../pages/DynamicFormPages/VehiculosForm.jsx';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="form-page" element={<FormCarPage />} />
          <Route path="filled-form-page" element={<FilledFormSelector />} />
          <Route path='/form-display/:id' element={<FormDisplay />} />
          <Route path='/form-response-display/:id' element={<FormResponsesDisplay />} />
          <Route path='create-form-page' element={<CreateFormPage/>} />
          <Route path='create-form-group' element={<CreateFormGroupPage />} />
          <Route path='create-form-field' element={<CreateFormFieldPage />} />
          <Route path='vehiculos-card' element={< VehiculosCards/>}></Route>
          <Route path='vehiculos-carousel' element={< VehiculosCarousel/>}></Route>
          <Route path='vehiculos-list' element={< VehiculosTable/>}></Route>
          <Route path='example' element={<UserManagement/>}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
