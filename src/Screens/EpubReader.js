import React from 'react';
import { NativeModules, Button } from 'react-native';
const { EpubModule } = NativeModules;

const EpubReader = () => {
  const onPress = () => {
    // EpubModule.navigateToReaderHome("storage/emulated/0/Download/alchemist.epub");
    console.log('We will invoke the native module here!');
    // EpubModule.navigateToReaderHome();
  };

  return (
    <Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />
  );
};

export default EpubReader;