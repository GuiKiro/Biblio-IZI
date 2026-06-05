import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useUsuario } from './_layout';

export default function FinalizacaoProduto() {
  const router = useRouter();
  const { produtoFinalizacao, isDarkMode } = useUsuario();

  const tema = isDarkMode ? estilosEscuros : estilosClaros;

  const confirmarPedido = () => {
    Alert.alert("Sucesso!", "Seu pedido foi processado. Verifique os detalhes na aba Perfil.", [
      { text: "OK", onPress: () => router.replace('/(tabs)/perfil' as any) }
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: tema.bg }]}>
      <Text style={[styles.headerTitle, { color: tema.texto }]}>Finalizar Pedido</Text>
      
      <View style={[styles.boxResumo, { backgroundColor: tema.cardBg, borderColor: tema.borda }]}>
        <Text style={[styles.livroTitulo, { color: tema.texto }]}>Tokyo Ghoul - Vol. 1</Text>
        <Text style={styles.livroPreco}>R$ {produtoFinalizacao?.preco || "45,90"}</Text>
        
        <View style={styles.linhaDivisora} />
        
        <Text style={[styles.label, { color: tema.subtexto }]}>Local de Retirada/Entrega:</Text>
        <Text style={[styles.valor, { color: tema.texto }]}>{produtoFinalizacao?.loja || "Não selecionado"}</Text>

        <Text style={[styles.label, { color: tema.subtexto, marginTop: 10 }]}>Método Escolhido:</Text>
        <Text style={[styles.valor, { color: tema.texto }]}>{produtoFinalizacao?.tipo || "A combinar"}</Text>

        <Text style={[styles.label, { color: tema.subtexto, marginTop: 10 }]}>Prazo Estimado:</Text>
        <Text style={[styles.prazoReal]}>{produtoFinalizacao?.prazo || "Imediato"}</Text>
      </View>

      <TouchableOpacity style={styles.btnConfirmar} onPress={confirmarPedido}>
        <Text style={styles.btnTexto}>Confirmar e Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilosClaros = { bg: '#F8F9FA', cardBg: '#FFF', texto: '#1A1A1A', subtexto: '#666', borda: '#EAEAEA' };
const estilosEscuros = { bg: '#121212', cardBg: '#1E1E1E', texto: '#FFF', subtexto: '#AAA', borda: '#333' };

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  boxResumo: { padding: 20, borderRadius: 16, borderWidth: 1, marginBottom: 30, elevation: 2 },
  livroTitulo: { fontSize: 20, fontWeight: 'bold' },
  livroPreco: { fontSize: 18, color: '#007AFF', fontWeight: '700', marginTop: 4 },
  linhaDivisora: { height: 1, backgroundColor: '#DDD', marginVertical: 15 },
  label: { fontSize: 13, fontWeight: '500' },
  valor: { fontSize: 15, fontWeight: 'bold', marginTop: 2 },
  prazoReal: { fontSize: 15, fontWeight: 'bold', color: '#2e7d32', marginTop: 2 },
  btnConfirmar: { backgroundColor: '#007AFF', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnTexto: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});