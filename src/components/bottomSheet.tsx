import React, {useEffect, useRef, useState} from 'react';
import {Button, Text, Input, Slider} from '@rneui/base';
import {
  View,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import * as COLORS from '../constants/colors';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TaskController} from '../controllers/task';
import {TaskType} from '../types/task';
import {Icon} from '@rneui/base';

type bottomSheetProps = {
  update?: Boolean;
  rbSheet: React.ReactElement;
  task?: TaskType;
};

export const TaskComponent = ({
  update = false,
  rbSheet,
  task,
}: bottomSheetProps) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskPriority, setTaskPriority] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const {updateTask, addTask} = TaskController();

  useEffect(() => {
    console.log(task);
    if (update) {
      setTaskTitle(task?.title!);
      setIsComplete(task?.isComplete!);
      setTaskPriority(task?.priorityLevel!);
    } else {
      setTaskPriority(0);
      setTaskTitle('');
      setIsComplete(false);
    }
  }, [task]);

  const taskButtonHandler = () => {
    if (update) {
      updateTask({
        title: taskTitle,
        isComplete,
        priorityLevel: taskPriority,
        _id: task?._id!,
      });
    } else {
      addTask({title: taskTitle, isComplete, priorityLevel: taskPriority});
    }
    rbSheet?.current.close();
  };

  return (
    <RBSheet
      ref={rbSheet}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        draggableIcon: {
          backgroundColor: COLORS.PRIMARY,
        },
        container: {
          backgroundColor: COLORS.WHITE,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      }}
      height={300}>
      <View style={styles.container}>
        <Text h4>{update ? 'Update task' : 'Add new task'}</Text>
        <Input
          placeholder="Enter task name"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <View style={{width: '100%', paddingHorizontal: 5}}>
          <Slider
            step={1}
            value={taskPriority}
            onValueChange={setTaskPriority}
            maximumValue={5}
            minimumValue={1}
            style={{
              width: '100%',
            }}
            thumbStyle={{
              width: 20,
              height: 20,
              backgroundColor: COLORS.PRIMARY,
            }}
          />
        </View>
        <View style={styles.checkMarkViewContainer}>
          <Text h4>Is task completed?</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsComplete(completed => !completed)}>
            <View
              style={[
                styles.checkMarkContainer,
                {backgroundColor: isComplete ? COLORS.BLACK : COLORS.WHITE},
              ]}>
              <Icon name="check" color={COLORS.WHITE} size={22} />
            </View>
          </TouchableOpacity>
        </View>
        <Button
          title={update ? 'Update Task' : 'Add Task'}
          buttonStyle={{backgroundColor: COLORS.PRIMARY, width: '100%'}}
          onPress={taskButtonHandler}
        />
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 20,
  },
  imageContainer: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    marginHorizontal: 10,
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
  checkMarkViewContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
});
