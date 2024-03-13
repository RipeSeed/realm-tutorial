import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as COLORS from '../constants/colors';

const PriorityDots = ({priority}: {priority: number}) => {
  const dots = [];
  for (let i = 0; i < 5; i++) {
    dots.push(
      <View
        key={i}
        style={[
          styles.container,
          {
            backgroundColor: i < priority ? COLORS.PRIMARY : COLORS.LIGHT_GRAY,
          },
        ]}
      />,
    );
  }
  return <View style={{flexDirection: 'row'}}>{dots}</View>;
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: 10,
    borderRadius: 5,
    margin: 2,
  },
});

export default PriorityDots;
