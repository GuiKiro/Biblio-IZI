import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Alert, Linking, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUsuario } from './_layout'; // Puxa o tema global da raiz

export default function DetalhesLivro() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { isDarkMode } = useUsuario();
  const [baixando, setBaixando] = useState(false);

  // Pega os dados enviados pela Vitrine ou usa Tokyo Ghoul como padrão
  const titulo = params.titulo || 'Tokyo Ghoul - Vol. 1';

  const iniciarDownloadPaliativo = () => {
    setBaixando(true);

    // Simula um tempo de carregamento de 3 segundos para o download
    setTimeout(() => {
      setBaixando(false);
      
      Alert.alert(
        "Download Concluído!",
        "O volume 1 de Tokyo Ghoul foi salvo com sucesso no seu dispositivo virtual.",
        [
          { 
            text: "Ler Agora (Abrir PDF)", 
            onPress: () => {
              // 📱 Abre o link real do Google Drive fornecido
              Linking.openURL('https://drive.google.com/file/d/1NSsLaH12DdnK6K-YafzY5uGSS8pB6Eyc/view?usp=sharing');
            }
          },
          { text: "Fechar", style: "cancel" }
        ]
      );
    }, 3000);
  };

  const tema = isDarkMode ? estilosEscuros : estilosClaros;

  return (
    <View style={[styles.container, { backgroundColor: tema.bg }]}>
      
      {/* Capa Real do Livro vinda da pasta assets */}
      <Image 
        source={require('../assets/images/capa.png')} 
        style={styles.capaGrande} 
      />

      <Text style={[styles.titulo, { color: tema.texto }]}>{titulo}</Text>
      <Text style={[styles.autor, { color: tema.subtexto }]}>Autor: Sui Ishida</Text>
      
      <View style={[styles.boxDescricao, { backgroundColor: tema.cardBg, borderColor: tema.borda }]}>
        <Text style={[styles.descricaoTexto, { color: tema.texto }]}>
          Estranhos assassinatos estão acontecendo em Tóquio. Devido às evidências, a polícia conclui que os ataques são cortesia de "ghouls", criaturas que se alimentam de carne humana. Kaneki é um jovem universitário comum que acaba se envolvendo nesse submundo.
        </Text>
      </View>

      {/* BOTÃO DE DOWNLOAD PALIATIVO */}
      <TouchableOpacity 
        style={[styles.btnDownload, baixando && styles.btnDesativado]} 
        onPress={iniciarDownloadPaliativo}
        disabled={baixando}
      >
        {baixando ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color="#FFF" />
            <Text style={styles.btnTexto}>Baixando PDF...</Text>
          </View>
        ) : (
          <View style={styles.loaderContainer}>
            <Ionicons name="download" size={20} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={styles.btnTexto}>Baixar Volume 1 (PDF)</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
        <Text style={styles.btnVoltarTexto}>Voltar para Vitrine</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilosClaros = { bg: '#F8F9FA', cardBg: '#FFF', texto: '#1A1A1A', subtexto: '#666', borda: '#EAEAEA' };
const estilosEscuros = { bg: '#121212', cardBg: '#1E1E1E', texto: '#FFF', subtexto: '#AAA', borda: '#333' };

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  capaGrande: { 
    width: 150, 
    height: 220, 
    borderRadius: 12, 
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  autor: { fontSize: 15, marginTop: 4, marginBottom: 20 },
  boxDescricao: { padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 30, width: '100%' },
  descricaoTexto: { fontSize: 14, lineHeight: 20, textAlign: 'justify' },
  btnDownload: { backgroundColor: '#007AFF', padding: 16, borderRadius: 12, width: '100%', alignItems: 'center' },
  btnDesativado: { backgroundColor: '#A0CFFF' },
  loaderContainer: { flexDirection: 'row', alignItems: 'center' },
  btnTexto: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
  btnVoltar: { marginTop: 20, padding: 10 },
  btnVoltarTexto: { color: '#666', fontSize: 15, fontWeight: '500' }
});