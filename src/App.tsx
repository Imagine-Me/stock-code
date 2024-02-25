import { useEffect, useRef, useState } from 'react';

import Alert from './alert';

function App() {
  const [code, setCode] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const timer = useRef<any>()

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const paramValue = queryParams.get('code');
    if (paramValue) {
      setCode(paramValue)
    }
  }, [])

  function copyToClipboard() {
    // Check if the Clipboard API is available
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code)
        .then(() => {
          console.log('Text copied to clipboard');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    } else {
      // Fallback for browsers that do not support the Clipboard API
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      console.log('Text copied to clipboard');
    }
    setShowAlert(true)
  }

  useEffect(() => {
    if (showAlert) {
      timer.current = setTimeout(() => setShowAlert(false), 2000)
    }
    return () => {
      if (timer.current) {
        clearTimeout(timer.current)
      }
    }
  }, [showAlert])


  return (
    <>
      {code && <h1 onClick={copyToClipboard}>{code}</h1>}
      {showAlert && <Alert />}
    </>
  )
}

export default App
