import Reac, {useState, useEffect} from 'react';
import {Button, Text, View} from 'react-native';


const ContadorNumeros = () => {
  const [numero, setNumero] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(()=>{
    if (numero % 3 === 0) { 
      setMsg(numero + " é divisivel por 3");
      }else{
        setMsg("");
    }
  }, [numero])

  // const lista = useState(0);
  // const numero = lista[0];
  // const setNumero = lista[1];
  //          0                             1
  // [ ponteiro para o valor,   ponteiro para função que altera o valor ]
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "stretch"}}>
      <View style={{flexDirection: "row", justifyContent: "space-between"}}>
        <Button title="-" onPress={()=>{
          setNumero(numero - 1);
        }}/>
        <Text>{numero}</Text>
        <Button title="+" onPress={()=>{
          setNumero(numero + 1);
        }}/>
      </View>
      <Text style={{marginTop: 40}}>{msg}</Text>
    </View>
  );
}

export default () =>
<View style={{flex: 1, justifyContent: "center", 
    alignItems: "center", backgroundColor: "#FFFFDD"}}>
    <ContadorNumeros/>
</View>