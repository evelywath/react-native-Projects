import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { Screen, Navigator } = createBottomTabNavigator();

const estilos = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 3,
    padding: 10,
    borderWidth: 2,
  },
});

const Login = ({ onLogado }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    AsyncStorage.getItem('USERS')
      .then((info) => {
        const users = JSON.parse(info);
        let achado = false;
        for (const user of users) {
          if (user.email === email && user.senha === senha) {
            achado = true;
          }
        }
        if (achado) {
          onLogado(true);
          alert('Usuário logado');
        } else {
          onLogado(false);
          alert('Usuário ou senha incorretos, OU Não cadastrado.');
        }
      })
      .catch((err) => alert('Erro ao ler a lista de usuários'));
  };

  const handleRegistro = () => {
    AsyncStorage.getItem('USERS')
      .then((info) => {
        const users = JSON.parse(info);
        const novoUsuario = { email: email, senha: senha };
        users.push(novoUsuario);
        AsyncStorage.setItem('USERS', JSON.stringify(users))
          .then(() => {
            alert('Usuário cadastrado com sucesso!');
          })
          .catch((err) => alert('Erro ao cadastrar o usuário'));
      })
      .catch((err) => alert('Erro ao ler a lista de usuários'));
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#212A3E', textAlign: 'center', padding: 50 }}>
        LOGIN
      </Text>

      <View style={{ flex: 2 }}>
        <Text>EMAIL</Text>
        <TextInput placeholder="  " style={estilos.input} value={email} onChangeText={setEmail} />

        <Text>SENHA</Text>
        <TextInput placeholder="  " style={estilos.input} value={senha} onChangeText={setSenha} secureTextEntry={true} />

        <Button title="Entrar" onPress={handleLogin} />
        <Button title="Registrar" onPress={handleRegistro} />
      </View>
    </View>
  );
};

const PizzaForm = ({ lista, setLista, navigation, onLogout }) => {
  const [sabor, setSabor] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [preco, setPreco] = useState('');

  const salvarPizza = () => {
    const obj = { sabor, tamanho, preco };
    setLista([...lista, obj]);
    navigation.navigate('Listagem');
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
        <Button title="Logout" onPress={onLogout} />
      </View>

      <Text style={{ fontSize: 30, textAlign: 'center', backgroundColor: 'blue', padding: 30 }}>Pizzaria Brasa</Text>

      <Text>Sabor</Text>
      <TextInput placeholder="  " style={estilos.input} value={sabor} onChangeText={setSabor} />

      <Text>Tamanho</Text>
      <TextInput placeholder="  " style={estilos.input} value={tamanho} onChangeText={setTamanho} />

      <Text>Preço</Text>
      <TextInput placeholder="  " style={estilos.input} value={preco} onChangeText={setPreco} />

      <Button title="Salvar" onPress={salvarPizza} />
    </View>
  );
};

const ListagemScreen = ({ lista }) => {
  return (
    <View>
      {lista.map((item, index) => (
        <View key={index}>
          <Text>Sabor: {item.sabor}</Text>
          <Text>Tamanho: {item.tamanho}</Text>
          <Text>Preço: {item.preco}</Text>
          <Text>_______________________________________________</Text>
        </View>
      ))}
    </View>
  );
};

export default function App() {
  const [logado, setLogado] = useState(false);
  const [lista, setLista] = useState([]);

  const handleLogout = () => {
    setLogado(false);
  };

  return (
    <NavigationContainer>
      <Navigator>
        {!logado ? (
          <Screen name="Login" component={() => <Login onLogado={setLogado} />} />
        ) : (
          <>
            <Screen
              name="Cadastro"
              component={({ navigation }) => (
                <PizzaForm lista={lista} setLista={setLista} navigation={navigation} onLogout={handleLogout} />
              )}
              options={{
                tabBarIcon: ({ size }) => <MaterialIcons name="create" size={size} />,
              }}
            />
            <Screen
              name="Listagem"
              component={() => <ListagemScreen lista={lista} />}
              options={{
                tabBarIcon: ({ size }) => <MaterialIcons name="list" size={size} />,
              }}
            />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
}