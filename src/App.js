import React, { useState } from 'react';
import { numbers, upperCaseLetters, lowerCaseLetters, specialCharacters } from './characters';
import { ToastContainer, toast } from 'react-toastify';
import { COPY_SUCCESS } from './message';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(20);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludNumberse] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handleGeneratePassword = (e) => {
    if (!includeUpperCase && !includeLowerCase && !includeNumbers && !includeSymbols) {
      notify('You must select atleast one option', true);
    }

    let characterList = '';

    if (includeUpperCase) {
      characterList = characterList + upperCaseLetters;
    }
    if (includeLowerCase) {
      characterList = characterList + lowerCaseLetters;
    }
    if (includeNumbers) {
      characterList = characterList + numbers;
    }
    if (includeSymbols) {
      characterList = characterList + specialCharacters;
    }

    setPassword(createPassword(characterList));
  };

  const createPassword = (characterList) => {
    let password = '';
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea');
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand('copy');
    newTextArea.remove();
  };

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCopyPassword = (e) => {
    if (password === '') {
      notify('Nothing To Copy', true);
    } else {
      copyToClipboard();
      notify(COPY_SUCCESS);
    }
  };

  return (
    <div className="App">
      <div className="mainContainer">
        <div className="generator">
          <h2 className="generatorTitle">Password Generator</h2>
          <div className="generatorInput">
            <h3>{password}</h3>
            <button onClick={handleCopyPassword} className="copyBtn">
              <i className="far fa-clipboard"></i>
            </button>
          </div>

          <div className="formGroup">
            <label htmlFor="passwordLength">Password length</label>
            <input
              defaultValue={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              type="number"
              id="passwordLength"
              name="passwordLength"
              max="20"
              min="10"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="upperCaseLetters">Include Uppercase Letters</label>
            <input
              checked={includeUpperCase}
              onChange={(e) => setIncludeUpperCase(e.target.checked)}
              type="checkbox"
              id="upperCaseLetters"
              name="upperCaseLetters"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="lowerCaseLetters">Include Lowercase Letters</label>
            <input
              checked={includeLowerCase}
              onChange={(e) => setIncludeLowerCase(e.target.checked)}
              type="checkbox"
              id="lowerCaseLetters"
              name="lowerCaseLetters"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="numbers">Include Numbers</label>
            <input checked={includeNumbers} onChange={(e) => setIncludNumberse(e.target.checked)} type="checkbox" id="numbers" name="numbers" />
          </div>

          <div className="formGroup">
            <label htmlFor="symbols">Include Symbols</label>
            <input checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} type="checkbox" id="symbols" name="symbols" />
          </div>
          <button onClick={handleGeneratePassword} className="generator_Btn">
            Generate Password
          </button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default App;
