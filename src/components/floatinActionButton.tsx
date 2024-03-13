import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import * as COLORS from '../constants/colors';

type floatActionButtonProps = {
  onPress: () => void;
};

export const FloatingActionButton = ({onPress}: floatActionButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.floatingButton}>
      <Image
        source={require('../assets/images/plus.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: COLORS.PRIMARY,
    width: 56,
    height: 56,
    borderRadius: 27,
    position: 'absolute',
    bottom: 40,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});
