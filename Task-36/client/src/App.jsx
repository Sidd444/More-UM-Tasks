import React from 'react';
import { Toaster } from 'react-hot-toast';
import FileUpload from './components/FileUpload';

const App = () => {
  return (
    <div>
      <Toaster />
      <FileUpload />
    </div>
  );
};

export default App;
