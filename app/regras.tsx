import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function TelaRegras() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titulo}>Regras Básicas</Text>
        
        <Text style={styles.regra}>1. O jogo é jogado em um tabuleiro de 3x3.</Text>
        
        <Text style={styles.regra}>
          2. Dois jogadores participam, um usa {'"X"'} e o outro {'"O"'}.
        </Text>
        
        <Text style={styles.regra}>3. Os jogadores alternam suas jogadas, preenchendo uma casa vazia por vez.</Text>
        <Text style={styles.regra}>4. O objetivo é ser o primeiro a conseguir 3 de suas marcas em uma linha.</Text>
        <Text style={styles.regra}>5. Se todas as 9 casas forem preenchidas e ninguém tiver vencido, o jogo termina em empate.</Text>
      </ScrollView>

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
    container:{ flex:1, backgroundColor:'#00BFFF', alignItems:'center', justifyContent:'center', padding:20 },
    scrollContainer:{ alignItems:'center', paddingHorizontal:10 },
    titulo:{ fontSize:36, fontWeight:'bold', color:'white', marginBottom:30, textAlign:'center' },
    regra:{ fontSize:18, color:'white', marginBottom:15, textAlign:'left', lineHeight:26, width:'100%' },
    botaoVoltar:{ backgroundColor:'white', paddingVertical:15, paddingHorizontal:40, borderRadius:10, width:'80%', alignItems:'center', marginTop:30 },
    textoBotao:{ color:'#00BFFF', fontSize:22, fontWeight:'bold' }
});