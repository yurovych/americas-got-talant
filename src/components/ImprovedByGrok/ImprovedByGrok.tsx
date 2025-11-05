'use client';

import { useState } from 'react';

const ImprovedByGrok = ({ isActive }: { isActive: boolean }) => {
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = lastName.trim();
    if (!trimmedName) {
      setMessage("Please enter a contestant's last name.");
      setStatus('error');
      return;
    }

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

  return (
    <div className="relative flex items-center justify-center">
      {!isActive ? (
        <div
          className={
            'absolute top-0 left-0 w-full h-full bg-white opacity-60 rounded-lg'
          }
        />
      ) : (
        ''
      )}
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          America’s Got Talent Voting
        </h1>

        <form onSubmit={handleVote} className="flex flex-col space-y-4">
          <label
            htmlFor="lastName"
            className="text-sm font-medium text-gray-700"
          >
            Contestant&apos;s Last Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Enter contestant's last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-invalid={status === 'error' ? 'true' : undefined}
            aria-describedby={status !== 'idle' ? 'status-message' : undefined}
          />

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition ${
              isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {status === 'loading' ? 'Submitting...' : 'Submit Vote'}
          </button>
        </form>

        {status !== 'idle' && (
          <p
            id="status-message"
            className={`mt-4 text-center font-medium transition-opacity duration-300 ${
              status === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImprovedByGrok;
