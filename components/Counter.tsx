import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

export default function Counter({
  onSetButtonPress,
  disabled,
}: {
  onSetButtonPress: any;
  disabled: boolean;
}) {
  const [strokes, setStrokes] = useState(0);

  function addStroke() {
    let curStrokes = strokes;
    setStrokes(curStrokes + 1);
  }

  function removeStroke() {
    let curStrokes = strokes;
    setStrokes(curStrokes - 1);
  }

  return (
      <View style={styles.counter}>
        <Text style={styles.strokeText}>{strokes}</Text>
        <TouchableOpacity
          onPress={addStroke}
          disabled={disabled}
          activeOpacity={0.9}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={removeStroke}
          disabled={disabled}
          activeOpacity={0.9}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStrokes(0), onSetButtonPress(strokes);
          }}
          disabled={disabled}
          activeOpacity={0.9}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Set</Text>
          </View>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  counter: {
    width: '50%',
    alignSelf: 'center',
    paddingBottom: 2,
  },
  button: {
    backgroundColor: '#DAF7DC',
    marginVertical: 3,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 50,
    textAlign: 'center',
    color: 'black'
  },
  strokeText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#DAF7DC',
    backgroundColor: 'black',
    opacity: 0.7,
    alignSelf: 'center',
    paddingHorizontal: 2,
    borderRadius: 5,
  },
});
