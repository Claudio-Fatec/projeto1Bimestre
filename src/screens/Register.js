import react, { use } from "react";
import React, {useState} from react;
import {View, Text, TextInput,Button,StyleSheet,Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register({navigation}) {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [curso, setCurso] = useState('');
    const [senha,setSenha] = useState('');

    async function handleSalvar() {
        if (!nome || !email) {
            Alert,alert('Erro','Preencha pelo menos o E-mail.');
            return;
        }
        const user = {nome,telefone,cpf,email,curso,senha};
        try {
            await AsyncStorage.setItem('user', JSON,stringify(user));
            Alert,alert('Sucesso', 'Usuário salvo localmente.');
            navigation.goBack();            
        }catch (e){
            Alert,alert('Erro','Falha ao salvar usuário.');
        }
    }

    retur (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar Usuário</Text>
            <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome}/>
            <TextInput placeholder="Telefone" style={styles.input} value={telefone} onChangeText={setTelefone}/>
            <TextInput placeholder="CPF" style={styles.input} value={cpf} onChangeText={setCpf}/>
            <TextInput placeholder="E-mail" style={styles.input} keyboardType="email-address" value={email} onChangeText={setEmail}/>
            <TextInput placeholder="Curso" style={styles.input} value={curso} onChangeText={setCurso}/>
            <TextInput placeholder="Senha" style={styles.input} secureTextEntry value={senha} onChangeText={setSenha}/>
            <Button title="SALVAR" onPress={handleSalvar}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{flex:1, padding:20},
    tittle:{fontSize:20, marginBottom:12, textAlign:'center'},
    input:{borderWidth:1, borderColor:'#ccc',padding:10, marginBottom:10, borderRadius:6}
});