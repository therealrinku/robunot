import SimpleUiSvg from '../assets/images/simple-ui.svg';
import PrivacySvg from '../assets/images/privacy.svg';
import FileSvg from '../assets/images/file.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InitialSetup() {
  const [step, setStep] = useState(1);

  const getStep = () => {
    switch (step) {
      case 1:
        return <FirstCard />;
      case 2:
        return <SecondCard />;
      case 3:
        return <ThirdCard />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      {getStep()}

      <div className="flex flex-row items-center gap-2">
        {/* {step > 1 && (
          <button
            onClick={() => setStep((prev) => prev - 1)}
            className="mt-5 text-xs bg-gray-100 hover:bg-gray-200 py-2 px-5 rounded"
          >
            Prev
          </button>
        )} */}

        {step < 3 && (
          <button
            onClick={() => setStep((prev) => prev + 1)}
            className="mt-5 text-xs bg-gray-100 hover:bg-gray-200 py-2 px-5 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

function FirstCard() {
  return (
    <div className="flex text-sm flex-col items-center gap-2">
      <img src={SimpleUiSvg} alt="Simple UI" className="w-96 h-96" />
      <p className="font-bold">Simple and Intiutive UI</p>
      <p>Clutter free and minimal UI for peace of mind</p>
    </div>
  );
}

function SecondCard() {
  return (
    <div className="flex text-sm flex-col items-center gap-2">
      <img src={PrivacySvg} alt="Simple UI" className="w-96 h-96" />
      <p className="font-bold">Privacy Focused</p>
      <p>We save your files locally, no cloud sync no bullshit!</p>
    </div>
  );
}

function ThirdCard() {
  const [filesPath, setFilesPath] = useState('');
  const navigate = useNavigate();

  function handleSelectFolder() {
    window.electron.ipcRenderer.once('open-new-file-dialog', (arg) => {
      setFilesPath(String(arg));
    });

    window.electron.ipcRenderer.sendMessage('open-new-file-dialog');
  }

  return (
    <div className="flex text-sm flex-col items-center gap-2">
      <img src={FileSvg} alt="Simple UI" className="w-96 h-96" />
      <p className="font-bold">Select your folder</p>
      <p className="text-center">
        Select the folder where you want to save all of your notes. <br />
        This can be changed later!
      </p>

      <div className="flex flex-row items-center gap-2">
        <button
          onClick={handleSelectFolder}
          className="mt-5 text-xs bg-gray-100 hover:bg-gray-200 py-2 px-5 rounded"
        >
          {filesPath ? 'Change Folder' : 'Select Folder'}
        </button>

        {filesPath && (
          <button
            onClick={() => navigate('Home')}
            className="mt-5 text-xs bg-gray-100 hover:bg-gray-200 py-2 px-5 rounded"
          >
            Continue...
          </button>
        )}
      </div>

      {filesPath && <p className="text-xs">Selected Folder: {filesPath}</p>}
    </div>
  );
}