import React,{ useState, useEffect} from 'react';
import {View, Text,Button,Flatlist, Image, TouchableOpacity,StyleSheet, Alert, TouchableWithoutFeedbackComponent} from 'react-native';
import { fetchCharacters } from '../services/marvel';

export default function Cards ({navigation  }) {
    const [cards, setCards] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        loadMore();
    },[]);

    async function loadMore() {
        try{
            const data = await fetchCharacters({ limit=10, offset});
            const results = data.data.results.map(r =>({
                id: r.id,
                name: r.name,
                description: r.description,
                thumbnail: `${r.thumbnail.patch}.${r.thumbnail.extension}`,
                more: r
            }));
            setCards(prev => [...prev, ...results]);
            setOffset(prev => prev + 10);
        }catch(e){
            Alert.alert('Erro','Falha ao buscar dados da API da Marvel. Verifique as chaves e a internet');
            console.log(e);
        }        
    }

    function handleAdd() {
        loadMore();
    }
    function handleExcluir(id){
        setCards(prev => prev.filter(c => c.id !== id));
    }
    function handlerVerMais(item){
        navigation.navigate('Details',{item});        
    }

)
}