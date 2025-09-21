import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  async function handleEntrar() {
    try {
      const json = await AsyncStorage.getItem('users');
      if (!json) {
        Alert.alert('Erro', 'Nenhum usuário cadastrado. Cadastre-se primeiro.');
        return;
      }

      const lista = JSON.parse(json);

      const user = lista.find(u => 
        (usuario === u.email || usuario === u.cpf || usuario === u.telefone || usuario === u.nome) 
        && senha === u.senha
      );

      if (user) {
        navigation.replace('Cards');
      } else {
        Alert.alert('Erro', 'Usuário ou senha inválidos.');
      }

    } catch (e) {
      Alert.alert('Erro', 'Falha ao acessar dados locais.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput placeholder="Usuário (email / cpf / telefone / nome)" style={styles.input} value={usuario} onChangeText={setUsuario}/>
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry value={senha} onChangeText={setSenha}/>

      <Button title="ENTRAR" onPress={handleEntrar} />
      <View style={{height:10}}/>
      <Button title="CADASTRAR USUÁRIO" onPress={() => navigation.navigate('Register')} />
      <View style={{height:10}}/>
      <Button title="VER USUÁRIOS" onPress={() => navigation.navigate('Users')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, justifyContent:'center' },
  title:{ fontSize:24, marginBottom:20, textAlign:'center' },
  input:{ borderWidth:1, borderColor:'#ccc', padding:10, marginBottom:10, borderRadius:6 }
});
