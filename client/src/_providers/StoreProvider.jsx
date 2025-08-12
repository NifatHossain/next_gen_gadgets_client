'use client';

import React, { useRef, useState, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore } from "../lib/store";
import { persistStore } from "redux-persist";

/**
 * StoreProvider (improved)
 * - Safe for SSR/Next.js (only renders PersistGate after persistor is ready)
 * - Keeps a persistent single store instance per client session using useRef
 */

export default function StoreProvider({ children }) {
  const storeRef = useRef(null);
  const persistorRef = useRef(null);
  const [, setReady] = useState(false);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    // create persistor on client only
    if (!persistorRef.current) {
      persistorRef.current = persistStore(storeRef.current);
      // small delay to let persistor initialize before render
      // setting state triggers a re-render to show children
      setReady(true);
    } else {
      setReady(true);
    }
  }, []);

  // During SSR this component will render once. On first client render we initialize persistor.
  if (!persistorRef.current) {
    // Render provider without PersistGate during initial hydration until persistor created.
    return (
      <Provider store={storeRef.current}>
        {children}
      </Provider>
    );
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}
