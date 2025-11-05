'use client';

import { useState } from 'react';
import ProtectiveScreen from '@/components/ProtectiveScreen';

enum VALIDATION_STATUS {
  VALID = 'valid',
  NOT_PROVIDED = "Please enter a contestant's last name.",
  TOO_SHORT = 'Name is too short.',
  INCLUDES_NUMBERS = 'Name cannot include numbers.',
}

const ImprovedByHuman = ({ isActive }: { isActive: boolean }) => {
  const [lastName, setLastName] = useState('');
  const [validationStatus, setValidationStatus] = useState(
    VALIDATION_STATUS.VALID
  );
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  const checkValidity = (name: string) => {
    if (!name) {
      setValidationStatus(VALIDATION_STATUS.NOT_PROVIDED);
      return false;
    }

    if (/\d/.test(name)) {
      setValidationStatus(VALIDATION_STATUS.INCLUDES_NUMBERS);
      return false;
    }

    if (name.length < 3) {
      setValidationStatus(VALIDATION_STATUS.TOO_SHORT);
      return false;
    } else {
      setValidationStatus(VALIDATION_STATUS.VALID);
      return true;
    }
  };

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = lastName.trim();

    if (!checkValidity(trimmedName)) return;

    setStatus('loading');
    setMessage('');

    setTimeout(() => {
      const success = Math.random() > 0.3;

      if (success) {
        setStatus('success');
        setMessage(`Vote for "${trimmedName}" submitted successfully!`);
        setLastName('');
      } else {
        setStatus('error');
        setMessage(
          `Failed to submit vote for "${trimmedName}". Please try again.`
        );
      }
    }, 1000);
  };

  const isSubmitDisabled = status === 'loading' || !lastName.trim();

  const handleOnchange = (name: string) => {
    setStatus('idle');
    setMessage('');
    setValidationStatus(VALIDATION_STATUS.VALID);
    setLastName(name);
  };

  return (
    <div className="relative flex items-center justify-center">
      {!isActive ? <ProtectiveScreen /> : ''}
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          America’s Got Talent Voting
        </h1>

        <form onSubmit={handleVote} className="flex flex-col space-y-1">
          <label
            htmlFor="human-option-lastName"
            className="text-sm font-medium text-gray-700"
          >
            Contestant&apos;s Last Name
          </label>
          <div className="relative w-full">
            <input
              id="human-option-lastName"
              type="text"
              placeholder="Enter contestant's last name"
              value={lastName}
              onChange={(e) => handleOnchange(e.target.value)}
              className={`w-full border border-gray-300 rounded pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationStatus !== VALIDATION_STATUS.VALID ? 'border-red-500 border-1' : ''}`}
              autoFocus
              maxLength={20}
              aria-invalid={status === 'error' ? 'true' : undefined}
              aria-describedby={
                status !== 'idle' ? 'status-message' : undefined
              }
            />
            {validationStatus !== VALIDATION_STATUS.VALID ? (
              <p
                className={'absolute -bottom-4 text-[12px]/[16px] text-red-600'}
              >
                {validationStatus}
              </p>
            ) : (
              ''
            )}

            <img
              className={'absolute w-[20px] h-[20px] right-3 top-3'}
              src={
                validationStatus !== VALIDATION_STATUS.VALID
                  ? './icons/error_icon.svg'
                  : './icons/person_icon.svg'
              }
              alt="person-icon"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`bg-blue-600 text-white font-semibold py-2 mt-5 rounded hover:bg-blue-700 transition ${
              isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {status === 'loading' ? 'Submitting...' : 'Submit Vote'}
          </button>
        </form>

        <div
          className={`-z-10 absolute transition-all duration-1000 left-0 top-full w-full px-3 py-2 rounded-lg shadow-2xl ${status !== 'idle' && message ? 'block' : 'none'} ${status === 'success' ? 'bg-green-300' : 'bg-red-300'} ${message ? 'opacity-100 translate-y-4' : 'opacity-0 -translate-y-0'}`}
        >
          <p
            id="status-message"
            className={`text-center font-medium transition-opacity duration-300 ${
              status === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImprovedByHuman;
