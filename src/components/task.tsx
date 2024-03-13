import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import * as COLORS from '../constants/colors';
import PriorityDots from './priority';
import {Icon} from '@rneui/base';

type TaskProps = {
  isCompleted: Boolean;
  title: String;
  priorityLevel: number;
  index: number;
  onPress: (arg0: number) => void;
};

const Task = ({
  isCompleted,
  title,
  priorityLevel,
  index,
  onPress,
}: TaskProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => onPress(index)}>
      <View
        style={[
          styles.checkMarkContainer,
          {backgroundColor: isCompleted ? COLORS.BLACK : COLORS.WHITE},
        ]}>
        <Icon name="check" color={COLORS.WHITE} size={22} />
      </View>
      <Text style={styles.titleText}>{title}</Text>
      <View style={{flex: 1}} />
      <PriorityDots priority={priorityLevel} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    borderRadius: 8,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingRight: 5,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  imageContainer: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    marginHorizontal: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '300',
  },
  checkMarkContainer: {
    width: 30,
    height: 30,
    backgroundColor: 'black',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 10,
  },
});

export default Task;
