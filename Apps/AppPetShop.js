import React, {useState} from 'react';
import { Button, FlatList, ImageBackground, 
        Text, TextInput, View } from 'react-native';
import img from './assets/puppy.jpg';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import {MaterialIcons} from '@expo/vector-icons';
// const Tab = createBottomTabNavigator();
const {Screen, Navigator} = createBottomTabNavigator();


const PetForm = ({lista, setLista}) => { 
  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("");
  const [peso, setPeso] = useState("");
  const [nascimento, setNascimento] = useState("");
  return (
    <View style={{flex: 1}}>
      <TextInput placeholder="Nome do Pet"
        value={nome} onChangeText={setNome}/>
      <TextInput placeholder="Raça"
        value={raca} onChangeText={setRaca}/>
      <TextInput placeholder="Peso"
        value={peso} onChangeText={setPeso}/>
      <TextInput placeholder="Nascimento"
        value={nascimento} onChangeText={setNascimento}/>
      <Button title="Gravar" onPress={()=>{
        const obj = {nome, raca, peso, nascimento};
        setLista([...lista, obj])
      }}/>
    </View>
  )
}

const ItemView = (props) =>
  <View style={{flex: 1}}>
    <Text>Nome do pet: {props.item.nome} </Text>
    <Text>Raça: {props.item.raca}</Text>
    <Text>Peso: {props.item.peso}</Text>
    <Text>Nascimento: {props.item.nascimento}</Text> 
  </View>

const PetLista = (props) => { 
  return (
    <View style={{flex: 1}}>
      <Text>Listagem</Text>
      <FlatList data={props.lista} renderItem={ItemView}/>
    </View>
  );
}

export default function App() {
  const [lista, setLista] = useState([
    {nome: "Toto", raca: "Vita-lata", peso: 24.6, nascimento: "28/03/2018"}
  ]);
  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        <ImageBackground source={img} style={{flex: 1, 
                width: 350, height: 200}}>
          <Text>Pet Shop</Text>
        </ImageBackground>
        <View style={{flex: 3}}>
          <Navigator>
            <Screen name="Cadastrar" 
                    options = {{tabBarLabel: "Cadastrar", 
                      tabBarVisible: false, 
                      tabBarIcon: ({ color, size }) => (
                          <MaterialIcons name="pets" 
                                color={color} size={24} />
                      )}}>
              {()=><PetForm lista={lista} setLista={setLista}/>}
            </Screen>
            <Screen name="Listagem" 
                    options={{
                      tabBarBadge: lista.length,
                      tabBarIcon: (props)=>
                          <MaterialIcons name="list" 
                                size={props.size}/>
                      }}>
              {()=><PetLista lista={lista}/>}
            </Screen>
          </Navigator>
        </View>
      </View>
    </NavigationContainer>
  );
}