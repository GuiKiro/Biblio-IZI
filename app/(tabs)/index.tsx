import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { useUsuario } from '../_layout'; // Importa o estado do tema global

export default function TabOneScreen() {
  const router = useRouter();
  const { isDarkMode } = useUsuario(); // Puxa se o modo escuro está ligado

  const irParaDetalhes = () => {
    router.push({
      pathname: '/detalhes',
      params: { 
        titulo: 'Tokyo Ghoul - Vol. 1', 
        arquivo: 'tokyo-ghoul.pdf' 
      }
    });
  };

  // Define as paletas de cores dinâmicas baseadas no tema global
  const tema = isDarkMode ? estilosEscuros : estilosClaros;

  return (
    <View style={[styles.container, { backgroundColor: tema.bg }]}>
      <Text style={[styles.mainTitle, { color: tema.tituloPrincipal }]}>Biblio IZI - Vitrine</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <Text style={[styles.sectionTitle, { color: tema.texto }]}>Seus Livros Adquiridos</Text>

      {/* CARD DO LIVRO CLICÁVEL COM CORES ADAPTADAS */}
      <TouchableOpacity style={[styles.cardLivro, { backgroundColor: tema.cardBg, borderColor: tema.borda }]} onPress={irParaDetalhes}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=300&auto=format&fit=crop' }} 
          style={styles.capaLivro} 
        />
        <View style={styles.infoLivro}>
          <Text style={[styles.tituloLivro, { color: tema.texto }]}>Tokyo Ghoul - Vol. 1</Text>
          <Text style={[styles.autorLivro, { color: tema.subtexto }]}>Sui Ishida</Text>
          <Text style={styles.statusLivro}>Disponível para Download</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}

// Configuração dos objetos de cores
const estilosClaros = { bg: '#FFF', cardBg: '#F8F9FA', texto: '#1A1A1A', subtexto: '#666', borda: '#EAEAEA', tituloPrincipal: '#007AFF' };
const estilosEscuros = { bg: '#121212', cardBg: '#1E1E1E', texto: '#FFF', subtexto: '#AAA', borda: '#333', tituloPrincipal: '#3095FF' };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft: 24,
    marginBottom: 15,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '90%',
  },
  cardLivro: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    width: '90%',
    alignItems: 'center',
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  capaLivro: {
    width: 70,
    height: 100,
    borderRadius: 6,
    backgroundColor: '#DDD'
  },
  infoLivro: {
    marginLeft: 15,
    flex: 1,
    backgroundColor: 'transparent'
  },
  tituloLivro: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  autorLivro: {
    fontSize: 13,
    marginBottom: 8
  },
  statusLivro: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500'
  }
});