/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useEffect, setGlobal} from 'reactn';
import {Scene, Router, Stack} from 'react-native-router-flux';
import BugBattle from 'react-native-bugbattle-sdk';
import ShareMenu from 'react-native-share-menu';
import {Actions} from 'react-native-router-flux';

import PictureGallery from './src/screens/PictureGallery';
import AddPicture from './src/screens/AddPicture';

console.disableYellowBox = true;

if (!__DEV__) {
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.debug = () => {};
}

setGlobal({
  albumList: [],
  lastGalleryRefresh: null,
});

export default function App() {
  useEffect(() => {
    BugBattle.autoConfigure('A0gFifgDUJ4H9HeneDa54qC055zzSIMX');
  }, []);

  const handleShare = useCallback(importedPicture => {
    if (!importedPicture) {
      return;
    }

    Actions.AddPicture({importedPicture});
  }, []);

  useEffect(() => {
    ShareMenu.getInitialShare(handleShare);
  }, []);

  useEffect(() => {
    const listener = ShareMenu.addNewShareListener(handleShare);

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <Router>
      <Stack key="root">
        <Scene
          key="PictureGallery"
          title="Galerie de photos"
          component={PictureGallery}
        />
        <Scene
          key="AddPicture"
          title="Ajouter une photo"
          component={AddPicture}
          back
        />
      </Stack>
    </Router>
  );
}
