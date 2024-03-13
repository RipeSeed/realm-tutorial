import React from 'react';
import TaskScreen from './src/screens/tacksScreens';
import Splash from './src/screens/splash';
import {AppProvider, RealmProvider, UserProvider} from '@realm/react';
import {appId} from './atlasConfig.json';
import {Task} from './src/models/task';
import { OpenRealmBehaviorType } from 'realm';

const App = () => {
  return (
    <AppProvider id={appId}>
      <UserProvider fallback={Splash}>
        <RealmProvider
          schema={[Task]}
          sync={{
            flexible: true,
            onError: (_session, error) => {
              console.error(error);
            },
            existingRealmFileBehavior: {
              type: OpenRealmBehaviorType.OpenImmediately,
            },
          }}>
          <TaskScreen />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
};

export default App;
