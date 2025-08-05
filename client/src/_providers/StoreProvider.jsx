// StoreProvider.js
'use client';

import { useRef, useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStore } from '../lib/store';
import { persistStore } from 'redux-persist';

export default function StoreProvider({ children }) {
  const storeRef = useRef(null);
  const [persistor, setPersistor] = useState(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const _persistor = persistStore(storeRef.current);
    setPersistor(_persistor);
  }, []);

  if (!persistor) return null;

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
