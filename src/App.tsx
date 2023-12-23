import React from 'react';
import MultiStepForm from './components/MultiStepForm'

const App: React.FC = () => {

  return (
    <div className='w-full flex item-center justify-center flex-col p-5 border border-sky-500 rounded-3xl'>
      <h1>Multi-Step Form</h1>
      <MultiStepForm />
    </div>
  );
};

export default App;