import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Users({ navigation }) {
  const [users, setUsers] = useState([]);

  async function carregarUsuarios() {
    try {
      const json = await AsyncStorage.getItem('users');
      setUsers(json ? JSON.parse(json) : []);
    } catch (e) {
      console.log("Erro ao carregar usuários:", e);
    }
  }

  async function limparUsuarios() {
    await AsyncStorage.removeItem('users');
    setUsers([]);
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários Cadastrados</Text>

      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Nome: {item.nome}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Telefone: {item.telefone}</Text>
            <Text>CPF: {item.cpf}</Text>
            <Text>Curso: {item.curso}</Text>
          </View>
        )}
      />

      <Button title="Recarregar" onPress={carregarUsuarios} />
      <Button title="Excluir Todos" color="red" onPress={limparUsuarios} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20 },
  title:{ fontSize:22, fontWeight:"bold", marginBottom:10, textAlign:"center" },
  card:{ padding:10, borderWidth:1, borderColor:"#ccc", borderRadius:8, marginBottom:10 }
});
<Button title="Voltar para Login" color="purple" onPress={() => navigation.replace("Login")} />
