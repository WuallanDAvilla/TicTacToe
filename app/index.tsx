import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function TelaInicial() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Velha</Text>
      <Text style={styles.subtitulo}>(tic tac toe)</Text>

      <Link href="/jogo" asChild>
        <TouchableOpacity style={styles.botao}>
            <Text style={styles.textoBotao}>Jogar</Text>
        </TouchableOpacity>
      </Link>
      
      <Link href="/regras" asChild>
        <TouchableOpacity style={styles.botaoRegras}>
            <Text style={styles.textoBotaoRegras}>Regras Básicas</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.creditos}>
        Direitos reservados a WuallanDavilla
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00BFFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    titulo: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    subtitulo: {
        fontSize: 24,
        color: 'white',
        marginBottom: 50,
    },
    botao: {
        backgroundColor: '#32CD32',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 5,
    },
    textoBotao: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    botaoRegras: {
        backgroundColor: 'white', 
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 5,
    },
    textoBotaoRegras: {
        color: '#00BFFF', 
        fontSize: 22,
        fontWeight: 'bold',
    },
    creditos: {
        position: 'absolute',
        bottom: 20,
        color: 'white',
        fontSize: 12,
    },
});