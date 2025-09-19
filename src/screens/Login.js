import React, { useState, useEffect} from "react";
import {View, Text, TextInput, Button, StyleSheet, Alert} from  'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login ({navigation}){
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    async function handleEntrar() {
        try {
            const json =  await AsyncStorage.getItem('User');
            if(!json){
                Alert.alert('Erro', 'Nenhum usuário cadastrado. Cadastre-se primeiro.');
                return;
            }
            const user = JSON.parse(json);

            if (usuario === user.email || usuario === user.cpf || usuario === user.telefone || usuario === user.nome){
                navigation.replace ('Cards');
            } else {
                Alert.alert('Erro','Usuário não encontrado. Verifique os dados.');
            }
        } catch (e) {
            Alert.alert('Erro','Falha ao acessar dados locais.');

        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput placeholder="Usuário (emai / cpf/ telefone /nome)" style={styles.input} value={usuario} onChangeText={setUsuario}/>
            <TextInput placeholder="Senha" style={styles.input} secureTextEntry value={senha} onChangeText={setSenha}/>

            <Button title="ENTRAR" onPress={handleEntrar}/>
            <View style={{height:10}}/>
            <Button title="CADASTRAR USUÁRIO" onPress={() => navigation.navigate('Register')}/> 
        </View>
    )
}

const styles = StyleSheet.create({
    container:{flex:1, padding:20,justifyContent:'center' },
    title:{ fontSize:24, marginBottom:20, textAlign:'center'},
    input:{borderWidth:1, borderColor:'#ccc', padding:10, marginBottom:10, borderRadius:6}
});