import React from 'react';
import Router from './screens/Router';
import { WidgetProvider } from './contexts/Widget';

function App() {
  return (
    <WidgetProvider initialScreen="TreatmentsAll">
      <Router />
    </WidgetProvider>
  );
}

export default App;
