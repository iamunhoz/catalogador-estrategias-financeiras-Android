import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Linking, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { retrieveCurrencies } from '../../services/api';

export default function Header({
  setSearchParams,
  setGales
}) {
  const [currencies, setCurrencies] = useState([])

  const handleStrategyChange = ItemValue => {
    setSearchParams(oldParams => ({
      ...oldParams,
      currency: ItemValue
    }))
  }
  const handleGales = ItemValue => {
    setGales(ItemValue)
  }

  useEffect(() => {
    retrieveCurrencies()
    .then(response => {
      setCurrencies(response.data.ok)
    })
    .catch((e) => console.error(e))
  }, [])

  return (
    <View style={styles.container}>
      
      <Picker
        onValueChange={handleStrategyChange}
      >
        <Picker.Item value='all' label='Todos'/>
        {currencies.map((currency, index) => <Picker.Item value={currency} label={currency} key={index}/>)}
      </Picker>

      <Picker onValueChange={handleStrategyChange}>
        <Picker.Item label="M5" value="M5"/>
        <Picker.Item label="M1" value="M1"/>
        <Picker.Item label="M15" value="M15"/>
      </Picker>

      <Picker 
        onValueChange={handleGales}
      >
        <Picker.Item label='2 Gales' value="G2"/>
        <Picker.Item label='1 Gale' value="G1"/>
        <Picker.Item label='Mão Fixa' value="Mao"/>
      </Picker>


      <TouchableOpacity
        onPress={() => Linking.openURL('https://t.me/agbot_oficial')}
        >
        <Image
          source={require('./../../assets/icons/telegram.png')}
          style={styles.telegramIcon}
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex:  '0 1',
    backgroundColor: '#555555',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    width: '100%'
  },
  telegramIcon: {
    marginLeft: 10,
    width: 20,
    height: 20
  }


});
