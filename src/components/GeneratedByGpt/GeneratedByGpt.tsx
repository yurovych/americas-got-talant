'use client';

import { useState } from 'react';

const GeneratedByGpt = ({ isActive }: { isActive: boolean }) => {
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lastName.trim()) {
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
        setMessage(`Vote for "${lastName}" submitted successfully!`);
      } else {
        setStatus('error');
        setMessage(`Failed to submit vote for "${lastName}". Try again.`);
      }

      setLastName('');
    }, 1000);
  };

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

      <div className="bg-white p-8 rounded shadow-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          America’s Got Talent Voting
        </h1>

        <form onSubmit={handleVote} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter contestant's last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={status === 'loading'}
            className={`bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition ${
              status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {status === 'loading' ? 'Submitting...' : 'Submit Vote'}
          </button>
        </form>

        {status !== 'idle' && (
          <p
            className={`mt-4 text-center font-medium ${
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

export default GeneratedByGpt;
