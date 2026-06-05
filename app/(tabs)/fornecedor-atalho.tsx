import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { useUsuario } from '../_layout'; 

interface Loja {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
  endereco: string;
}

const FILIAIS_PARCEIRAS: Loja[] = [
  { id: '1', nome: 'Livraria Parceira - Shopping Recife', latitude: -8.118228, longitude: -34.905141, endereco: 'R. Padre Carapuceiro, 777 - Boa Viagem' },
  { id: '2', nome: 'Livraria Parceira - Shopping Boa Vista', latitude: -8.058376, longitude: -34.888514, endereco: 'R. do Giriquiti, 48 - Boa Vista' },
  { id: '3', nome: 'Livraria Parceira - Shopping RioMar', latitude: -8.086055, longitude: -34.894982, endereco: 'Av. República do Líbano, 251 - Pina' },
];

export default function FornecedorAtalho() {
  const [lojaSelecionada, setLojaSelecionada] = useState<Loja | null>(null);
  const router = useRouter();
  const { isDarkMode, setProdutoFinalizacao } = useUsuario();

  const irParaCheckout = (tipoOpcao: 'reserva' | 'entrega') => {
    if (!lojaSelecionada) return;

    const prazoCalculado = tipoOpcao === 'reserva' 
      ? 'Retirada imediata (em até 2h)' 
      : 'Entrega via motoboy (1 a 2 dias úteis)';

    setProdutoFinalizacao({
      loja: lojaSelecionada.nome,
      preco: "45,90",
      tipo: tipoOpcao === 'reserva' ? 'Retirada na Loja' : 'Entrega Domiciliar',
      prazo: prazoCalculado
    });

    // ✨ CORREÇÃO AQUI: Mudando a forma como o Expo Router busca a rota raiz
    router.push({
      pathname: "/finalizacao" as any
    });
  };

  const temaAbas = isDarkMode ? estilosEscuros : estilosClaros;

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { backgroundColor: temaAbas.bg, justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
        <Text style={{ color: temaAbas.texto, fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
          O Mapa nativo está disponível apenas no celular (Expo Go).
        </Text>
        
        <Text style={{ color: temaAbas.subtexto, textAlign: 'center', marginBottom: 20 }}>
          Selecione uma loja simulada abaixo para testar o fluxo de finalização:
        </Text>

        {FILIAIS_PARCEIRAS.map(loja => (
          <TouchableOpacity 
            key={loja.id} 
            style={{ backgroundColor: '#007AFF', padding: 12, borderRadius: 8, marginVertical: 6, width: '80%', alignItems: 'center' }}
            onPress={() => setLojaSelecionada(loja)}
          >
            <Text style={{ color: '#FFF', fontWeight: '600' }}>{loja.nome}</Text>
          </TouchableOpacity>
        ))}

        {lojaSelecionada && (
          <View style={{ marginTop: 20, padding: 15, backgroundColor: temaAbas.panelBg, borderRadius: 12, width: '80%', borderWidth: 1, borderColor: temaAbas.borda }}>
            <Text style={{ color: temaAbas.texto, fontWeight: 'bold' }}>{lojaSelecionada.nome}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <TouchableOpacity style={{ backgroundColor: '#424242', padding: 10, borderRadius: 6 }} onPress={() => irParaCheckout('reserva')}>
                <Text style={{ color: '#FFF' }}>Reservar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 6 }} onPress={() => irParaCheckout('entrega')}>
                <Text style={{ color: '#FFF' }}>Entrega</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: temaAbas.bg }]}>
      <MapView 
        style={styles.map}
        customMapStyle={isDarkMode ? darkMapStyle : []}
        initialRegion={{
          latitude: -8.088,
          longitude: -34.895,
          latitudeDelta: 0.11,
          longitudeDelta: 0.11,
        }}
      >
        {FILIAIS_PARCEIRAS.map((loja) => (
          <Marker
            key={loja.id}
            coordinate={{ latitude: loja.latitude, longitude: loja.longitude }}
            title={loja.nome}
            onPress={() => setLojaSelecionada(loja)}
          />
        ))}
      </MapView>

      {lojaSelecionada && (
        <View style={[styles.detailsPanel, { backgroundColor: temaAbas.panelBg }]}>
          <Text style={[styles.title, { color: temaAbas.texto }]}>{lojaSelecionada.nome}</Text>
          <Text style={{ color: temaAbas.subtexto, marginBottom: 8, fontSize: 13 }}>{lojaSelecionada.endereco}</Text>
          <Text style={styles.status}>Status: Exemplar Disponível</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonReserva} onPress={() => irParaCheckout('reserva')}>
              <Text style={styles.buttonText}>Reservar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonEntrega} onPress={() => irParaCheckout('entrega')}>
              <Text style={styles.buttonText}>Pedir Entrega</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const estilosClaros = { bg: '#FFF', panelBg: '#FFF', texto: '#1A1A1A', subtexto: '#666', borda: '#EAEAEA' };
const estilosEscuros = { bg: '#121212', panelBg: '#1E1E1E', texto: '#FFF', subtexto: '#AAA', borda: '#333' };

const darkMapStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] },
  { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] },
  { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] }
];

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
  detailsPanel: { position: 'absolute', bottom: 0, width: '100%', padding: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24, elevation: 10 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  status: { fontSize: 14, color: '#2e7d32', fontWeight: '600', marginBottom: 16 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  buttonReserva: { backgroundColor: '#424242', paddingVertical: 14, borderRadius: 12, width: '48%', alignItems: 'center' },
  buttonEntrega: { backgroundColor: '#007AFF', paddingVertical: 14, borderRadius: 12, width: '48%', alignItems: 'center' },
  buttonText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 }
});