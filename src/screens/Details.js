import React from 'react';
import { View, Text, Image, ScrollView,Button, StyleSheet } from 'react-native';

export default function Details({ route }) {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
      {item.thumbnail ? <Image source={{ uri: item.thumbnail }} style={styles.image}/> : null}
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.sectionTitle}>Descrição</Text>
      <Text>{item.description || 'Sem descrição disponível.'}</Text>

      <Text style={styles.sectionTitle}>Dados brutos</Text>
      <Text>Id: {item.id}</Text>
      {item.more?.comics && <Text>Comics available: {item.more.comics.available}</Text>}
      {item.more?.series && <Text>Series available: {item.more.series.available}</Text>}
      {item.more?.stories && <Text>Stories available: {item.more.stories.available}</Text>}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:16 },
  image:{ width:'100%', height:300, borderRadius:8, marginBottom:12 },
  title:{ fontSize:22, fontWeight:'bold', marginBottom:8 },
  sectionTitle:{ marginTop:12, fontWeight:'bold' }
});

<View style={{ marginVertical: 20 }}>
  <Button title="Voltar para Login" color="purple" onPress={() => navigation.replace("Login")} />
</View>


