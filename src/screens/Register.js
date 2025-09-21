import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  const [senha, setSenha] = useState('');

  async function handleSalvar() {
    if (!nome || !email) {
      Alert.alert('Erro', 'Preencha pelo menos Nome e E-mail.');
      return;
    }

    const novoUser = { nome, telefone, cpf, email, curso, senha };

    try {
      const json = await AsyncStorage.getItem('users');
      let lista = json ? JSON.parse(json) : [];
      
      // Evita duplicar pelo e-mail ou CPF
      if (lista.find(u => u.email === email || u.cpf === cpf)) {
        Alert.alert('Erro', 'Usuário já cadastrado com este e-mail ou CPF.');
        return;
      }

      lista.push(novoUser);
      await AsyncStorage.setItem('users', JSON.stringify(lista));

      Alert.alert('Sucesso', 'Usuário salvo localmente.');
      navigation.goBack(); // volta ao LOGIN
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar usuário.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Usuário</Text>
      <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome}/>
      <TextInput placeholder="Telefone" style={styles.input} value={telefone} onChangeText={setTelefone}/>
      <TextInput placeholder="CPF" style={styles.input} value={cpf} onChangeText={setCpf}/>
      <TextInput placeholder="E-mail" style={styles.input} value={email} onChangeText={setEmail}/>
      <TextInput placeholder="Curso" style={styles.input} value={curso} onChangeText={setCurso}/>
      <TextInput placeholder="Senha" style={styles.input} secureTextEntry value={senha} onChangeText={setSenha}/>
      <Button title="SALVAR" onPress={handleSalvar}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20 },
  title:{ fontSize:20, marginBottom:12, textAlign:'center' },
  input:{ borderWidth:1, borderColor:'#ccc', padding:10, marginBottom:10, borderRadius:6 }
});
<View style={{ marginTop: 20 }}>
  <Button title="Cancelar e Voltar para Login" color="purple" onPress={() => navigation.replace("Login")} />
</View>
