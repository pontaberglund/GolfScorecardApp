import {Text, View, StyleSheet, Button, TextInput} from 'react-native';
import React, {useState} from 'react';
import {visbygk} from '../courses/visbygk';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Header({
  onResetButtonPress,
  setExtra,
  setNumberOfHoles,
  setPar,
  shcp,
  setDropdownValue,
  dropdownValue,
}: {
  onResetButtonPress: any;
  setExtra: any;
  setNumberOfHoles: any;
  setPar: any;
  shcp: string
  setDropdownValue: any;
  dropdownValue: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(dropdownValue);
  const [items, setItems] = useState([
    {label: '9-hole', value: 'nineHole'},
    {label: '9-hole twice', value: 'nineHoleTwice'},
    {label: '18-hole', value: 'eighteenHole'}
  ]);

  function calculateExtra(shcp: string) {
    let shcpNum = parseInt(shcp);
    let extra = new Array(18).fill(0);
    let i = 0;
    while (shcpNum > 0) {
      switch (value) {
        case 'nineHole':
          extra[visbygk.nineHole.index[i] - 1]++;   
          break;
        case 'nineHoleTwice':
          extra[visbygk.nineHoleTwice.index[i] - 1]++;   
          break;
        case 'eighteenHole':
          extra[visbygk.eighteenHole.index[i] - 1]++
        default:
          break;
      }
      shcpNum--;
      i == 17 ? (i = 0) : i++;
    }
    for (let j = 0; j < extra.length; j++) extra[j] = extra[j].toString();
    switch (value) {
      case 'nineHole':
        setExtra(extra.slice(0, 9));
        break;
      default:
        setExtra(extra.slice(0, 18));
        break;
    }
    
  }

  function handleCourseChange(val: string | null) {
    switch (val) {
      case 'nineHole':
        setNumberOfHoles(9);
        setPar(visbygk.nineHole.par)
        setDropdownValue('nineHole')
        break;
      case 'nineHoleTwice':
        setNumberOfHoles(18);
        setPar(visbygk.nineHoleTwice.par)
        setDropdownValue('nineHoleTwice')
        break;
      case 'eighteenHole':
        setNumberOfHoles(18)
        setPar(visbygk.eighteenHole.par)
        setDropdownValue('eighteenHole')
      default:
        break;
    }
  }

  return (
    <View style={styles.header}>
      <View style={styles.title}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={val => {
            handleCourseChange(val);
          }}
          style={styles.picker}
          dropDownContainerStyle={styles.picker}
          textStyle={{color: '#DAF7DC'}}     
          zIndex={3000}   />
      </View>
      <View style={styles.hcpView}>
        <TextInput
          placeholder={shcp}
          onChangeText={shcp => calculateExtra(shcp)}
          keyboardType='number-pad'
          style={styles.textInput}
        />
      </View>
      <View style={styles.button}>
        <Button title="Reset" onPress={onResetButtonPress} color={'red'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingTop: 2,
    backgroundColor: '#86BBD8',
    zIndex: 2,
  },
  title: {
    flex: 2,
    color: '#DAF7DC',
  },
  hcp: {
    textAlignVertical: 'center',
    color: 'black',
    textDecorationColor: 'black',
  },
  hcpView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    alignSelf: 'center',
  },
  picker: {
    backgroundColor: '#2F4858',
    borderColor: 'black',
  },
  textInput: {
    alignSelf: 'center',
  },
});
