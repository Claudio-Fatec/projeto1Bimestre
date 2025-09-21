import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { fetchCharacters } from '../services/marvel';

export default function Cards({ navigation }) {
  const [cards, setCards] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    loadMore();
  }, []);

  async function loadMore() {
    try {
      const data = await fetchCharacters({ limit: 10, offset });
      const results = data.data.results.map(r => ({
        id: r.id,
        name: r.name,
        description: r.description,
        thumbnail: `${r.thumbnail.path}.${r.thumbnail.extension}`,
        more: r
      }));
      setCards(prev => [...prev, ...results]);
      setOffset(prev => prev + 10);
    } catch (e) {
      Alert.alert('Erro', 'Falha ao buscar dados da API Marvel. Verifique as chaves e a internet.');
    }
  }

  function handleAdd() {
    loadMore();
  }

  function handleExcluir(id) {
    setCards(prev => prev.filter(c => c.id !== id));
  }

  function handleVerMais(item) {
    navigation.navigate('Details', { item });
  }

  return (
    <View style={styles.container}>

      {/* 🔹 Botão de Voltar para Login no topo */}
      <View style={{ marginBottom: 15 }}>
        <Button title="Voltar para Login" color="purple" onPress={() => navigation.replace("Login")} />
      </View>

      <View style={styles.buttonsRow}>
        <Button title="ADD" onPress={handleAdd}/>
        <Button title="CARREGAR MAIS" onPress={loadMore}/>
      </View>

      <FlatList
        data={cards}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <View style={styles.card}>
            {item.thumbnail ? <Image source={{ uri: item.thumbnail }} style={styles.thumb}/> : null}
            <View style={{flex:1, paddingLeft:8}}>
              <Text style={styles.name}>{item.name}</Text>
              <Text numberOfLines={2}>{item.description || 'Sem descrição'}</Text>
              <View style={{flexDirection:'row', marginTop:8}}>
                <TouchableOpacity onPress={() => handleVerMais(item)} style={styles.btn}>
                  <Text style={styles.btnText}>VER MAIS DETALHES</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleExcluir(item.id)} style={[styles.btn, {backgroundColor:'#e74c3c', marginLeft:8}]}>
                  <Text style={styles.btnText}>EXCLUIR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:10 },
  buttonsRow:{ flexDirection:'row', justifyContent:'space-between', marginBottom:10 },
  card:{ flexDirection:'row', padding:10, borderWidth:1, borderColor:'#ddd', borderRadius:8, marginBottom:10 },
  thumb:{ width:100, height:100, borderRadius:6 },
  name:{ fontWeight:'bold', fontSize:16 },
  btn:{ backgroundColor:'#2980b9', padding:8, borderRadius:6 },
  btnText:{ color:'#fff', fontSize:12 }
});
