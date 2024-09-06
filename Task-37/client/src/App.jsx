import React from 'react';
import DataForm from './components/DataForm';
import AggregatedData from './components/AggregatedData';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';

const App = () => {

  const[addToDB,useAddToDB]=useState(0);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">MongoDB Aggregate Functions</h1>
      <DataForm addToDB={addToDB} useAddToDB={useAddToDB}/>
      <AggregatedData addToDB={addToDB} useAddToDB={useAddToDB} />
      <Toaster />
    </div>
  );
};

export default App;
