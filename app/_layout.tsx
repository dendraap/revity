import { ClerkProvider, useAuth, useSession } from '@clerk/clerk-expo';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useFonts } from 'expo-font';
import { ApolloProvider, ApolloClient, HttpLink, from, InMemoryCache, createHttpLink, } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev"
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const CLERK_PUBLISHABLE_KEY = 'pk_test_ZXhjaXRpbmctc2hlZXAtMTMuY2xlcmsuYWNjb3VudHMuZGV2JA';

if (__DEV__) {
  loadErrorMessages();
  loadDevMessages();
}

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(auth)';

    if (isSignedIn && !inTabsGroup) {
      router.replace('/home');
    } else if (!isSignedIn) {
      router.replace('/login');
    }
  }, [isSignedIn]);

  return <Slot />;
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);

    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const RootLayout = () => {
  const [isFontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!isFontsLoaded) {
    return;
  }

  const httpLink = createHttpLink({
    uri: 'https://valued-anteater-53.hasura.app/v1/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        'x-hasura-admin-secret': 'POF5gqe2zFgJcNXsPAm4bqajjnlfhtaOXCEt77btz6YNqRyLoTgxnKPW9XL421om',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            tasks: {
              merge(existing = [], incoming) {
                const merged = existing.slice();
                for (let i = 0; i < incoming.length; ++i) {
                  const item = incoming[i];
                  const index = existing.findIndex((e: any) => e.idtask === item.idtask);
                  if (index !== -1) {
                    merged[index] = item;
                  } else {
                    merged.push(item);
                  }
                }
                return merged;
              },
            },
          },
        },
      },
    }),
  });
  

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={{flex: 1}}>
            <BottomSheetModalProvider>
              <InitialLayout />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ApolloProvider>
    </ClerkProvider>
  );
};

export default RootLayout;