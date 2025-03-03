import React, { useState, useEffect } from 'react';
import { getSystemInfo, isValidSystemSetup } from 'crypto-pro-enhanced';

function SystemInfo() {
  const [systemInfo, setSystemInfo] = useState(null);
  const [systemInfoError, setSystemInfoError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setSystemInfo({
          ...await getSystemInfo(),
          isValidSystemSetup: await isValidSystemSetup()
        });
      } catch (error) {
        setSystemInfoError(error.message);
      }
    })();
  });

  return (
    <pre>
      {systemInfo ? (
        JSON.stringify(systemInfo, null, '  ')
      ) : (
        systemInfoError || null
      )}
    </pre>
  );
}

export default SystemInfo;
