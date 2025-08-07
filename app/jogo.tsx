import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

type Jogador = 'X' | 'O';
type Casa = Jogador | null;

const CORES = { X: '#FF6347', O: '#4682B4', fundo: '#F0F8FF', borda: '#B0C4DE', texto: '#2c3e50', vitoria: 'gold', empate: 'orange' };

const Quadrado = ({ valor, onPress, cor }: { valor: Casa, onPress: () => void, cor: string }) => (
  <TouchableOpacity style={styles.botao} onPress={onPress}>
    <Text style={[styles.texto, { color: cor }]}>{valor}</Text>
  </TouchableOpacity>
);

export default function TelaJogo() {
  const [tabuleiro, setTabuleiro] = useState<Casa[]>(Array(9).fill(null));
  const [jogadorAtual, setJogadorAtual] = useState<Jogador>('X');
  const [vencedor, setVencedor] = useState<Jogador | 'E' | null>(null);
  const [placar, setPlacar] = useState({ X: 0, O: 0 });
  
  useEffect(() => {
    if (vencedor && vencedor !== 'E') {
      setPlacar(prevPlacar => ({...prevPlacar, [vencedor]: prevPlacar[vencedor] + 1}));
    }
  }, [vencedor]);

  const verificarVencedor = (tabuleiroAtual: Casa[]) => {
    const combos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (let combo of combos) {
      const [a, b, c] = combo;
      if (tabuleiroAtual[a] && tabuleiroAtual[a] === tabuleiroAtual[b] && tabuleiroAtual[a] === tabuleiroAtual[c]) {
        return tabuleiroAtual[a];
      }
    }
    return tabuleiroAtual.every(q => q !== null) ? 'E' : null;
  };

  const handleClick = (i: number) => {
    if (tabuleiro[i] || vencedor) return;
    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[i] = jogadorAtual;
    setTabuleiro(novoTabuleiro);
    const resultado = verificarVencedor(novoTabuleiro);
    if (resultado) {
      setVencedor(resultado);
    } else {
      setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X');
    }
  };
  
  const jogarNovamente = () => {
    setTabuleiro(Array(9).fill(null));
    setVencedor(null);
    setJogadorAtual('X');
  };

  const renderMensagem = () => {
    if (vencedor) {
      if (vencedor === 'E') return "Deu Empate!";
      return `O JOGADOR ${vencedor} VENCEU!`;
    }
    return `É a vez do Jogador ${jogadorAtual}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tituloHeader}>Jogo da Velha</Text>
      <View style={styles.placarContainer}>
        <Text style={styles.placarTexto}>Jogador X: {placar.X}</Text>
        <Text style={styles.placarTexto}>Jogador O: {placar.O}</Text>
      </View>
      <Text style={[styles.mensagem, { color: vencedor ? (vencedor === 'E' ? CORES.empate : CORES.vitoria) : CORES.texto }]}>{renderMensagem()}</Text>
      <View style={styles.tabuleiro}>
        {Array.from({ length: 3 }).map((_, i) => (
          <View key={i} style={styles.linha}>
            {Array.from({ length: 3 }).map((_, j) => {
              const index = i * 3 + j;
              return <Quadrado key={index} valor={tabuleiro[index]} onPress={() => handleClick(index)} cor={tabuleiro[index] === 'X' ? CORES.X : CORES.O} />;
            })}
          </View>
        ))}
      </View>
      <View style={styles.botoesContainer}>
        {vencedor && <TouchableOpacity style={styles.resetBtn} onPress={jogarNovamente}><Text style={styles.textoReset}>Jogar Novamente</Text></TouchableOpacity>}
        
        <Link href="/" asChild>
            <TouchableOpacity style={styles.menuBtn}>
                <Text style={styles.textoReset}>Voltar ao Menu</Text>
            </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, paddingTop:50, backgroundColor:CORES.fundo, alignItems:'center' },
  tituloHeader:{ fontSize:28, fontWeight:'bold', color:CORES.texto },
  placarContainer:{ flexDirection:'row', justifyContent:'space-around', width:'80%', marginTop:20, padding:10, backgroundColor:'white', borderRadius:10, elevation:2 },
  placarTexto:{ fontSize:18, fontWeight:'bold', color:CORES.texto },
  mensagem:{ fontSize:24, fontWeight:'bold', marginVertical:20 },
  tabuleiro:{ borderWidth:1, borderColor:CORES.borda },
  linha:{ flexDirection:'row' },
  botao:{ width:100, height:100, borderWidth:1, borderColor:CORES.borda, justifyContent:'center', alignItems:'center', backgroundColor:'white' },
  texto:{ fontSize:50, fontWeight:'bold' },
  botoesContainer:{ marginTop:30, width:'80%', alignItems:'center' },
  resetBtn:{ backgroundColor:CORES.O, padding:15, borderRadius:10, width:'100%', alignItems:'center', marginBottom:10 },
  
  menuBtn:{ 
    backgroundColor:CORES.X, 
    padding:15, 
    borderRadius:10, 
    width:'100%', 
    alignItems:'center', 
    marginBottom:10,
  },
  textoReset:{ color:'white', fontSize:18, fontWeight:'bold' }
});
