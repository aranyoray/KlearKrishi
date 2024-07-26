/* eslint-disable react/jsx-no-useless-fragment */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRootNavigationState } from 'expo-router';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import { authAtom } from './_layout';

export default function Authwall({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useAtom(authAtom);
  const [router, setRouter] = useState<string>();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!auth.klearkrishi) {
      (async () => {
        const klearkrishi = await AsyncStorage.getItem('klearkrishi_auth');

        if (klearkrishi) {
          setAuth({
            ...auth,
            klearkrishi: JSON.parse(klearkrishi) as any,
          });

          // setRouter('/klearkrishi/home');
        }
      })();
    }
  }, []);

  // if (!rootNavigationState?.key) return null;

  // if (router) return <Redirect href={router} />;

  return <>{children}</>;
}
