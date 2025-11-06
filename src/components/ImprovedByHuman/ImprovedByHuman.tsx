'use client';

import { useState } from 'react';
import ProtectiveScreen from '@/components/ProtectiveScreen';
import {
  CONTAINS_NUMBER_REGEXP,
  MIN_MESSAGE_LENGTH,
  validationStatusObj,
} from '@/constants';
import { MESSAGE_STATUS } from '@/enums/messageStatus';

interface ImprovedByHumanProps {
  isActive: boolean;
}

const ImprovedByHuman: React.FC<ImprovedByHumanProps> = ({ isActive }) => {
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState<MESSAGE_STATUS>(MESSAGE_STATUS.IDLE);
  const [message, setMessage] = useState('');
  const [validationStatus, setValidationStatus] = useState(
    validationStatusObj.valid
  );

  const iconLink =
    validationStatus !== validationStatusObj.valid
      ? './icons/error_icon.svg'
      : './icons/person_icon.svg';

  const checkValidity = (name: string) => {
    if (!name) {
      setValidationStatus(validationStatusObj.notProvided);
      return false;
    }

    if (CONTAINS_NUMBER_REGEXP.test(name)) {
      setValidationStatus(validationStatusObj.includesNumbers);
      return false;
    }

    if (name.length < MIN_MESSAGE_LENGTH) {
      setValidationStatus(validationStatusObj.tooShort);
      return false;
    } else {
      setValidationStatus(validationStatusObj.valid);
      return true;
    }
  };

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = lastName.trim();

    if (!checkValidity(trimmedName)) return;

    setStatus(MESSAGE_STATUS.LOADING);
    setMessage('');

    setTimeout(() => {
      const success = Math.random() > 0.3;

      if (success) {
        setStatus(MESSAGE_STATUS.SUCCESS);
        setMessage(`Vote for "${trimmedName}" submitted successfully!`);
        setLastName('');
      } else {
        setStatus(MESSAGE_STATUS.ERROR);
        setMessage(
          `Failed to submit vote for "${trimmedName}". Please try again.`
        );
      }
    }, 1000);
  };

  const isSubmitDisabled =
    status === MESSAGE_STATUS.LOADING || !lastName.trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(MESSAGE_STATUS.IDLE);
    setMessage('');
    setValidationStatus(validationStatusObj.valid);
    setLastName(e.target.value);
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
              onChange={handleChange}
              className={`w-full border border-gray-300 rounded pl-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${validationStatus !== validationStatusObj.valid ? 'border-red-500 border-1' : ''}`}
              autoFocus
              maxLength={20}
              aria-invalid={
                status === MESSAGE_STATUS.ERROR ? 'true' : undefined
              }
              aria-describedby={
                status !== MESSAGE_STATUS.IDLE ? 'status-message' : undefined
              }
            />
            {validationStatus !== validationStatusObj.valid ? (
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
              src={iconLink}
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
            {status === MESSAGE_STATUS.LOADING
              ? 'Submitting...'
              : 'Submit Vote'}
          </button>
        </form>

        <div
          className={`-z-10 absolute transition-all duration-1000 left-0 top-full w-full px-3 py-2 rounded-lg shadow-2xl ${status !== MESSAGE_STATUS.IDLE && message ? 'block' : 'none'} ${status === MESSAGE_STATUS.SUCCESS ? 'bg-green-300' : 'bg-red-300'} ${message ? 'opacity-100 translate-y-4' : 'opacity-0 -translate-y-0'}`}
        >
          <p
            id="status-message"
            className={`text-center font-medium transition-opacity duration-300 ${
              status === MESSAGE_STATUS.SUCCESS
                ? 'text-green-600'
                : 'text-red-600'
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
