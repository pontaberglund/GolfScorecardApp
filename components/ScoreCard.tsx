import {Text, View, StyleSheet} from 'react-native';
import React from 'react';

import Hole from './Hole';

export default function ScoreCard({
  holes,
  results,
  points,
  par,
  extra,
  currentHole,
  setCurrentHole,
}: {
  holes: Array<string>;
  results: Array<string>;
  points: Array<string>;
  par: Array<string>;
  extra: Array<string>;
  currentHole: Number;
  setCurrentHole: any;
}) {
  return (
    <View style={styles.scoreCard}>
      <View style={styles.info}>
        <Text style={styles.infoText}>Hole</Text>
        <Text style={styles.infoText}>Par</Text>
        <Text style={styles.infoText}>Extra</Text>
        <Text style={styles.infoText}>Result</Text>
        <Text style={styles.infoText}>Point</Text>
      </View>
      <Hole
        hole={holes[0]}
        par={par[0]}
        extra={extra[0]}
        result={results[0]}
        point={points[0]}
        currentHole={currentHole}
        setCurrentHole={setCurrentHole}
      />
      <Hole
        hole={holes[1]}
        par={par[1]}
        extra={extra[1]}
        result={results[1]}
        point={points[1]}
        currentHole={currentHole}
        setCurrentHole={setCurrentHole}
      />
      <Hole
        hole={holes[2]}
        par={par[2]}
        extra={extra[2]}
        result={results[2]}
        point={points[2]}
        currentHole={currentHole}
        setCurrentHole={setCurrentHole}
      />
      <Hole
        hole={holes[3]}
        par={par[3]}
        extra={extra[3]}
        result={results[3]}
        point={points[3]}
        currentHole={currentHole}
        setCurrentHole={setCurrentHole}
      />
      <Hole
        hole={holes[4]}
        par={par[4]}
        extra={extra[4]}
        result={results[4]}
        point={points[4]}
        currentHole={currentHole}
        setCurrentHole={setCurrentHole}
      />
      <Hole
        hole={holes[5]}
        par={par[5]}
        extra={extra[5]}
        result={results[5]}
        point={points[5]}
        currentHole={currentHole}
        setCurrentHole={setCurrentHole}
      />
      <Hole
        hole={holes[6]}
        par={par[6]}
        extra={extra[6]}
        result={results[6]}
        point={points[6]}
        currentHole={currentHole}
        setCurrentHole={setCurrentHole}
      />
      <Hole
        hole={holes[7]}
        par={par[7]}
        extra={extra[7]}
        result={results[7]}
        point={points[7]}
        currentHole={currentHole}
        setCurrentHole={setCurrentHole}
      />
      <Hole
        hole={holes[8]}
        par={par[8]}
        extra={extra[8]}
        result={results[8]}
        point={points[8]}
        currentHole={currentHole}
        setCurrentHole={setCurrentHole}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scoreCard: {
    //flex: 1/3,
    flexDirection: 'row',
    marginHorizontal: 3,
    marginTop: 3,
    backgroundColor: '#DAF7DC',
    padding: 3,
    borderRadius: 5,
    elevation: 20,
    zIndex: 1,
  },
  info: {
    marginRight: 5,
  },
  infoText: {
    color: 'grey',
  },
});
