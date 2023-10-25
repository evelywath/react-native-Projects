
import {NavigationContainer} from '@react-navigation/native';
import {Button, Text, TextInput, View, FlatList} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useState} from 'react';

const {Screen, Navigator} = createBottomTabNavigator();


const Formulario = () => {

  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [tipo, setTipo] = useState("");
  const [classificacao, setClassificacao] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");



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


const Listar = (props) => {
  return (
    <View style={{flex: 1}}>
      <Text>Listagem</Text>
      <FlatList data={props.lista} renderItem={Item}/>
    </View>
  )
}

const Mapa = () => {
  return (
    <View style={{flex: 1}}>
      <Text>Mapa</Text>
    </View>
  )
}


const Principal = (props) => {

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Navigator>
          <Screen name="Formulário">
            {(navProps) => 
            <Formulario {...navProps}
            onSalvar={props.onSalvar}/> 
            }
          </Screen>

          <Screen name="Listar">
            {(navProps)=>
            <Listar {...navProps} lista={props.lista}/>
            }
          </Screen>

          <Screen name="Mapa" component={Mapa}/>
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
    <View style={{flex: 1}}>
      <Text>000000000000000000</Text>
      <Principal onSalvar={salvar} lista={lista}/>
    </View>
  );
}