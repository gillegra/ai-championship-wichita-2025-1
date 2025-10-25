/**
 * Challenge 3: Wichita Tech Scene - One Prompt Demo
 * Redirects to standalone HTML demo
 */

import { useEffect } from 'react';

export default function Challenge3() {
  useEffect(() => {
    // Redirect to standalone HTML demo
    window.location.href = '/c3.html';
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <p>Redirecting to Wichita Tech Demo...</p>
    </div>
  );
}
