import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, FlatList, Text} from 'react-native';


const estilos = StyleSheet.create ({
  campomsg: {borderWidth: '2px', paddingLeft: '80px', margin: '20px', borderRadius: '8px',
            width: '300px', height: '130px'},
})


function TelaMensagem () {

  const [mensg, setMsg] = useState("");
  const [listaMsg, setListaMsg] = useState([]);
  

  return(

    <View style={{flex: 1, backgroundColor: 'lightgray'}}>

    <TextInput placeholder="Deixe sua mensagem..." style={estilos.campomsg} value={mensg} 
    onChangeText={setMsg}>
    </TextInput>
    
    <View style={{padding: '15px'}}>
    <Button title="enviar" color="gray"
    onPress={()=> {
          const obj = {mensg}
          setListaMsg([...listaMsg, obj]);
        }}/>
    </View>

    <View style={{flex: 3, backgroundColor: '#CCCCCC'}}>
    <Text style={{textAlign: 'center', fontSize: 16, paddingBottom: 10}}>Mensagens deixadas:</Text>
    <FlatList data={listaMsg} renderItem={({ item })=>{
          return (<Text>{item.mensg}</Text>)
        }}/>
    </View>
    </View>
  )

}

export default TelaMensagem;