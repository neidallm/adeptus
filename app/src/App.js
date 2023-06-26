import React from 'react';
import { AppRouter } from './components/Router/AppRouter';
import { DataProvider } from './components/context/UserContext';

export default function App() {
  return (
    <DataProvider>
    <div>
      <AppRouter></AppRouter>
    </div>
    </DataProvider>
  )
}
