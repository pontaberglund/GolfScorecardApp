import {Text, View, StyleSheet, Pressable} from 'react-native';
import React from 'react';

export default function Hole({
  hole,
  par,
  extra,
  result,
  point,
  currentHole,
  setCurrentHole,
}: {
  hole: string;
  par: string;
  extra: string;
  result: string;
  point: string;
  currentHole: Number;
  setCurrentHole: any;
}) {
  return (
    <Pressable style={styles.hole} onPress={() => setCurrentHole(parseInt(hole))}>
      {currentHole == parseInt(hole) ? <Text style={styles.currentHole}>{hole}</Text> : <Text style={styles.text}>{hole}</Text>}
      <Text style={styles.text}>{par}</Text>
      <Text style={styles.text}>{extra}</Text>
      <Text style={styles.text}>{result}</Text>
      <Text style={styles.text}>{point}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hole: {
    flex: 1,
    borderWidth: 1,
    //justifyContent: 'space-around',
    marginLeft: -1,
  },
  text: {
    color: 'black',
    textAlign: 'center',
  },
  currentHole: {
    backgroundColor: '#2F4858',
    color: '#DAF7DC',
    textAlign: 'center',
  }
});
