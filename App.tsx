import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

import ScoreCard from './components/ScoreCard';
import Counter from './components/Counter';
import Header from './components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {visbygk} from './courses/visbygk';

function App(): JSX.Element {
  const [results, setResults] = useState(new Array(18).fill(''));
  const [points, setPoints] = useState(new Array(18).fill(''));
  const [currentHole, setCurrentHole] = useState(1);
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalStrokes, setTotalStrokes] = useState(0);
  const [extra, setExtra] = useState(new Array(18).fill('0'));
  const [numberOfHoles, setNumberOfHoles] = useState(9);
  const [par, setPar] = useState(visbygk.nineHole.par);
  const [shcp, setShcp] = useState('Shcp');
  const [dropdownValue, setDropdownValue] = useState('nineHole')

  async function getData() {
    let data = '';
    try {
      const tempData = await AsyncStorage.getItem('data');
      data = tempData != null ? tempData : '';
      //console.log(data)
    } catch (error) {
      console.log(error);
    }
    console.log('Retrived data: ' + data);
    let parsedData = JSON.parse(data);
    setTotalPoints(parsedData.totPoints);
    setTotalStrokes(parsedData.totStrokes);
    setResults(parsedData.results);
    setPoints(parsedData.points || new Array(18).fill(''));
    setCurrentHole(parsedData.currentHole);
    setExtra(parsedData.extra || new Array(18).fill('0'));
    setPar(parsedData.par || visbygk.nineHole.par);
    setNumberOfHoles(parsedData.numberOfHoles || '9');
    setShcp(parsedData.shcp || 'Shcp');
    setDropdownValue(parsedData.dropdownValue || 'nineHole')
  }

  async function storeData(
    results: Array<String>,
    points: Array<String>,
    totalPoints: number,
    totalStrokes: number,
    currentHole: number,
    extra: Array<String>,
  ) {
    let data = JSON.stringify({
      results: results,
      points: points,
      totPoints: totalPoints,
      totStrokes: totalStrokes,
      currentHole: currentHole,
      extra: extra,
      par: par,
      numberOfHoles: numberOfHoles,
      shcp: shcp,
      dropdownValue: dropdownValue,
    });
    try {
      await AsyncStorage.setItem('data', data);
    } catch (error) {
      console.log(error);
    }
    console.log('Data stored: ' + data);
  }

  function onSetButtonPress(strokes: number) {
    //New results
    const newResults = results.slice(0);
    newResults[currentHole - 1] = strokes;
    setResults(newResults);
    let newTotalStrokes = 0;
    newResults.forEach((val) => {
      newTotalStrokes += val
    })
    setTotalStrokes(newTotalStrokes);

    //New points
    let point = 0;
    if (
      strokes >
      parseInt(par[currentHole - 1]) + parseInt(extra[currentHole - 1])
    ) {
      let temp =
        2 -
        (strokes -
          (parseInt(par[currentHole - 1]) + parseInt(extra[currentHole - 1])));
      point = temp > 0 ? temp : 0;
    } else {
      point =
        2 +
        (parseInt(par[currentHole - 1]) + parseInt(extra[currentHole - 1])) -
        strokes;
    }
    const newPoints = points.slice(0);
    newPoints[currentHole - 1] = point;
    setPoints(newPoints);
    let newTotalPoints = 0;
    newPoints.forEach((val) => {
      newTotalPoints += val
    })
    setTotalPoints(newTotalPoints);

    let newHole = currentHole + 1;
    setCurrentHole(newHole);

    storeData(
      newResults,
      newPoints,
      newTotalPoints,
      newTotalStrokes,
      newHole,
      extra,
    );
  }

  function onResetButtonPress() {
    setTotalPoints(0);
    setTotalStrokes(0);
    setResults(new Array(18).fill(''));
    setPoints(new Array(18).fill(''));
    setCurrentHole(1);
    storeData(new Array(18).fill(''), new Array(18).fill(''), 0, 0, 1, extra);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ImageBackground
      source={require('./assets/images/background3.jpeg')}
      style={styles.app} resizeMode='cover' >
      <Header
        onResetButtonPress={onResetButtonPress}
        setExtra={setExtra}
        setNumberOfHoles={setNumberOfHoles}
        setPar={setPar}
        shcp={shcp}
        setDropdownValue={setDropdownValue}
        dropdownValue={dropdownValue}
      />
      {numberOfHoles == 9 ? (
        <ScoreCard
          holes={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
          results={results.slice(0, 9)}
          points={points.slice(0, 9)}
          par={par.slice(0, 9)}
          extra={extra.slice(0, 9)}
          currentHole={currentHole}
          setCurrentHole={setCurrentHole}
        />
      ) : (
        <View>
          <ScoreCard
            holes={['1', '2', '3', '4', '5', '6', '7', '8', '9']}
            results={results.slice(0, 9)}
            points={points.slice(0, 9)}
            par={par.slice(0, 9)}
            extra={extra.slice(0, 9)}
            currentHole={currentHole}
            setCurrentHole={setCurrentHole}
          />
          <ScoreCard
            holes={['10', '11', '12', '13', '14', '15', '16', '17', '18']}
            results={results.slice(9, 18)}
            points={points.slice(9, 18)}
            par={par.slice(9, 18)}
            extra={extra.slice(9, 18)}
            currentHole={currentHole}
            setCurrentHole={setCurrentHole}
          />
        </View>
      )}
      <View style={styles.textView}>
        <Text style={styles.text}>
          Points: {totalPoints} Strokes: {totalStrokes} Hole: {currentHole}
        </Text>
      </View>
      <Counter
        onSetButtonPress={onSetButtonPress}
        disabled={numberOfHoles == 9 ? currentHole > 9 : currentHole > 18}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#86BBD8',
  },
  text: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Open Sans',
  },
  textView: {
    alignSelf: 'center',
    backgroundColor: '#DAF7DC',
    padding: 3,
    borderRadius: 5,
  },
});

export default App;
