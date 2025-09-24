import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import { fetchCharacters } from '../services/marvel';

export default function Cards({ navigation }) {
  const [cards, setCards] = useState([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState('');

  
  function addWithoutDuplicates(prev, novos) {
    const ids = new Set(prev.map(c => c.id));
    const filtrados = novos.filter(n => !ids.has(n.id));
    return [...prev, ...filtrados];
  }

  
  useEffect(() => {
    loadInitial();
  }, []);

  async function loadInitial() {
    try {
      const data = await fetchCharacters({ limit: 5, offset: 0 });
      const results = data.data.results.map(r => ({
        id: r.id,
        name: r.name,
        description: r.description,
        thumbnail: `${r.thumbnail.path}.${r.thumbnail.extension}`,
        more: r
      }));
      setCards(results);
      setOffset(5);
    } catch (e) {
      Alert.alert('Erro', 'Falha ao carregar personagens iniciais.');
    }
  }

 
  async function handleSearch() {
    if (!search.trim()) {
      Alert.alert('Aviso', 'Digite um nome para pesquisar');
      return;
    }

    try {
      const data = await fetchCharacters({ name: search.trim() });
      let results = data.data.results.map(r => ({
        id: r.id,
        name: r.name,
        description: r.description,
        thumbnail: `${r.thumbnail.path}.${r.thumbnail.extension}`,
        more: r
      }));

      
      const termo = search.trim().toLowerCase();
      results = results.filter(r => r.name.toLowerCase().includes(termo));

      if (results.length === 0) {
        Alert.alert('Aviso', 'Nenhum personagem encontrado');
        return;
      }

      setCards(prev => addWithoutDuplicates(results, prev));
      setSearch('');
    } catch (e) {
      Alert.alert('Erro', 'Falha na pesquisa de personagens.');
    }
  }

  function handleExcluir(id) {
    setCards(prev => prev.filter(c => c.id !== id));
  }

  function handleVerMais(item) {
    navigation.navigate('Details', { item });
  }

  return (
    <View style={styles.container}>
      
      <View style={{ marginBottom: 15 }}>
        <Button title="Voltar para Login" color="purple" onPress={() => navigation.replace("Login")} />
      </View>

      
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar personagem..."
          value={search}
          onChangeText={setSearch}
        />
        <Button title="Adicionar" onPress={handleSearch} />
      </View>

      
      <FlatList
        data={cards}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <View style={styles.card}>
            {item.thumbnail ? <Image source={{ uri: item.thumbnail }} style={styles.thumb}/> : null}
            <View style={{flex:1, paddingLeft:8}}>
              <Text style={styles.name}>{item.name}</Text>
              <Text numberOfLines={2}>{item.description || 'Sem descrição disponível'}</Text>
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
  searchRow:{ flexDirection:'row', marginBottom:10 },
  input:{ flex:1, borderWidth:1, borderColor:'#ccc', padding:8, marginRight:8, borderRadius:6 },
  card:{ flexDirection:'row', padding:10, borderWidth:1, borderColor:'#ddd', borderRadius:8, marginBottom:10 },
  thumb:{ width:100, height:100, borderRadius:6 },
  name:{ fontWeight:'bold', fontSize:16 },
  btn:{ backgroundColor:'#2980b9', padding:8, borderRadius:6 },
  btnText:{ color:'#fff', fontSize:12 }
});
