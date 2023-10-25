
import {NavigationContainer} from '@react-navigation/native';
import {Button, Text, TextInput, View, FlatList} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useState, useContext} from 'react';
//import MapView, {Marker} from 'react-native-maps';
import {Contexto} from './contexto';

const {Screen, Navigator} = createBottomTabNavigator();


const Formulario = () => {

  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [tipo, setTipo] = useState("");
  const [classificacao, setClassificacao] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [descricao, setDescricao] = useState("");


  const contexto = useContext(Contexto);




  return (
    <View style={{flex: 1}}>

      <Text>Detalhes Restaurante</Text>
        <TextInput placeholder='Nome do restaurante' value={nome} onChangeText={setNome}/>
        <TextInput placeholder='Endereço' value={endereco} onChangeText={setEndereco}/>
        <TextInput placeholder='Tipo da comida' value={tipo} onChangeText={setTipo}/>

        <View style={{flexDirection: 'row'}}>
        <TextInput placeholder='Classificação' value={classificacao} onChangeText={setClassificacao}/>
        <TextInput placeholder='Latitude' value={latitude} onChangeText={setLatitude}/>
        <TextInput placeholder='Longitude' value={longitude} onChangeText={setLongitude}/>
        <TextInput placeholder='Descrição' value={descricao} onChangeText={setDescricao}/>
        </View>

        <Button title='Salvar' onPress={() =>{

        const obj = {
          nome, endereco, tipo, classificacao,
          latitude, longitude
        }
        props.onSalvar(obj);

      }}/>

    </View>
  )
}

const Item = (props) => {
  return(
    <View style={{
      flex: 1, borderWidth: 1, margin: 5
      }} 
      key={props.index}>
      <Text>{props.Item.nome}</Text>
      <Text>{props.Item.tipo}</Text>
    </View>
  )
}


const Listar = (props) => { //aqui aula 10 MIN: 09:09
  return (
    <View style={{flex: 1}}>
      <Text>Listagem</Text>
      <FlatList data={props.lista} renderItem={Item}/>
    </View>
  )
}

const Mapa = (props) => {
  return (
    <View style={{flex: 1}}>
      <Text>Mapa</Text>

      <MapView style={{flex: 1}}
      initialRegion={{
        latitude: -23.542845,
        longitude: -46.638829,
        latitudeDelta: 0.0441,
        longitudeDelta: 0.0041
      }}>

        {props.lista.map((item, indice) => {
          return(
            <Marker coordinate={{
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude)}}
              title={item.nome}
              description={item.tipo}/>
          )
        })}

      </MapView>

    </View>
  )
}


const Principal = (props) => {

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Navigator>

          <Screen name="Formulário" component={Formulario}/>
        

          <Screen name="Listar">
            {(navProps)=>
            <Listar {...navProps} lista={props.lista}/>
            }
          </Screen>

          <Screen name="Mapa">
            {(navProps)=>
            <Mapa {...navProps} lista={props.lista}/>
            }
          </Screen>

        </Navigator>
      </NavigationContainer>
    </View>
  )
}


export default function App() {

  const [lista, setLista] = useState([]);

  const salvar = (obj) => {
    //alert("Salvar acionado");
    setLista([...lista, obj])
  }


  return (
    <Contexto.Provider value={{
      lista,
      salvar,
    }}
    >
    <View style={{flex: 1}}>
      <Text>000000000000000000</Text>
      <Principal onSalvar={salvar} lista={lista}/>
    </View>
    </Contexto.Provider>
  );
}