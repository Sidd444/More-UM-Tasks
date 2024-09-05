import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SERVER_URL from '../url'

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [filesData, setFilesData] = useState([]);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${SERVER_URL}/api/upload`, formData);
      toast.success('File uploaded successfully');
      fetchFilesData();
    } catch (error) {
      toast.error('File upload failed');
    }
  };

  const fetchFilesData = async () => {
    const response = await axios.get(`${SERVER_URL}/api/files`);
    setFilesData(response.data);
  };

  useEffect(() => {
    fetchFilesData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleFileUpload} className="bg-white p-6 rounded-lg shadow-md">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border mb-4 p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Upload File
        </button>
      </form>
      <div className="mt-8 w-2/3">
        <h2 className="text-xl font-bold mb-4">Uploaded Files:</h2>
        <ul>
          {filesData.map((file) => (
            <li key={file._id} className="mb-2">
              <a href={`${SERVER_URL}/${file.path}`} className="text-blue-600">
                {file.filename}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;
