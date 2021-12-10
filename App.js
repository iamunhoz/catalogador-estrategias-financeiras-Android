import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header/index'
import { retrieveCurrencies, retrieveData } from './src/services/api';

const date = new Date()

export default function App() {
  const [listOfCards, setListOfCards] = useState([])
  const [searchParams, setSearchParams] = useState({
    currency: '',
    timeframe: '',
    lastUpdate: date.toLocaleTimeString('pt-BR')
  })
  const [gales, setGales] = useState('G2')

  const getCards = (objectOfObjects) => {
    const propertiesList = Object.keys(objectOfObjects || {})
    const arrayOfObjects = propertiesList.map(property => objectOfObjects[property])
    return arrayOfObjects
  }

  useEffect(() => {
    retrieveCurrencies()
      .then(_ => {
        setSearchParams(oldParams => ({
          ...oldParams,
          currency: 'all',
          timeframe: 'M5',
          lastUpdate: date.toLocaleTimeString('pt-BR')
        }))
      })
  }, [])

  useEffect(() => {
    retrieveData(searchParams.currency, searchParams.timeframe)
     .then(response => {
       setListOfCards(getCards(response.data.ok))
     })
  }, [searchParams])

  
  /* não é necessário reload intervalado durante o periodo de desenvolvimento

     useEffect(() => {
    const interval = setInterval(() => {
    window.location.reload()
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  
  */

  return (
    <View style={styles.container}>
      <Header setSearchParams={setSearchParams} setGales={setGales}/>
      
      <Text style={styles.title}>
        {`Última Atualização feita às: ${searchParams.lastUpdate} UTC-3`}
      </Text>

      {/* <Content gales={gales} listOfCards={listOfCards}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#191919',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  title: {
    color: '#CCCCCC'
  }
});
