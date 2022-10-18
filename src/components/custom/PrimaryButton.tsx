import React, {FC} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

interface ButtonProps {
  title: string;
}

const PrimaryButton: FC<ButtonProps> = (props): JSX.Element => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00000000',
    borderWidth: 1,
    borderColor: '#00B48C',
    padding: 10,
    margin: 16,
  },
  text: {
    color: '#00B48C',
    textAlign: 'center',
  },
});

export default PrimaryButton;
