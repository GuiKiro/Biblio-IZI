import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUsuario } from './_layout'; 

export default function Perfil() {
  const router = useRouter();
  const { usuario, isDarkMode, toggleTheme } = useUsuario(); 

  const tema = isDarkMode ? estilosEscuros : estilosClaros;

  return (
    <ScrollView style={[styles.container, { backgroundColor: tema.bg }]} contentContainerStyle={styles.content}>
      
      {/* BOTÃO ALTERNAR MODO ESCURO/CLARO */}
      <TouchableOpacity style={[styles.themeToggle, { backgroundColor: tema.cardBg, borderColor: tema.borda }]} onPress={toggleTheme}>
        <Ionicons name={isDarkMode ? "sunny" : "moon"} size={20} color={isDarkMode ? "#FFB000" : "#444"} />
        <Text style={[styles.themeToggleText, { color: tema.texto }]}>
          Mudar para Modo {isDarkMode ? "Claro" : "Noturno"}
        </Text>
      </TouchableOpacity>

      <View style={[styles.profileHeader, { backgroundColor: tema.cardBg, borderColor: tema.borda }]}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' }} 
          style={styles.avatar} 
        />
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, { color: tema.texto }]}>{usuario?.nome || "Visitante"}</Text>
          <Text style={{ color: tema.subtexto, fontSize: 13 }}>E-mail: {usuario?.email}</Text>
          <Text style={{ color: tema.subtexto, fontSize: 13 }}>CPF: {usuario?.cpf}</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: tema.texto }]}>Minhas Atividades</Text>
      <View style={[styles.shopeeMenu, { backgroundColor: tema.cardBg, borderColor: tema.borda }]}>
        <TouchableOpacity style={styles.menuItem} onPress={() => alert('Vitrine Digital')}>
          <Ionicons name="book" size={24} color="#007AFF" style={styles.menuIcon} />
          <Text style={[styles.menuText, { color: tema.texto }]}>Livros Adquiridos</Text>
          <Ionicons name="chevron-forward" size={18} color="#CCC" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btnLogout} onPress={() => router.replace('/cadastro')}>
        <Text style={styles.btnLogoutText}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilosClaros = { bg: '#F8F9FA', cardBg: '#FFF', texto: '#1A1A1A', subtexto: '#666', borda: '#EAEAEA' };
const estilosEscuros = { bg: '#121212', cardBg: '#1E1E1E', texto: '#FFF', subtexto: '#AAA', borda: '#333' };

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  themeToggle: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1, marginBottom: 15, justifyContent: 'center' },
  themeToggleText: { marginLeft: 10, fontWeight: '600' },
  profileHeader: { flexDirection: 'row', padding: 20, borderRadius: 16, alignItems: 'center', marginBottom: 25, borderWidth: 1 },
  avatar: { width: 70, height: 70, borderRadius: 35, marginRight: 15, borderWidth: 2, borderColor: '#007AFF' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  sectionTitle: { fontSize: 15, fontWeight: '700', marginBottom: 12, marginLeft: 4 },
  shopeeMenu: { borderRadius: 16, paddingVertical: 8, borderWidth: 1, marginBottom: 30 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16 },
  menuIcon: { marginRight: 15 },
  menuText: { flex: 1, fontSize: 15, fontWeight: '500' },
  btnLogout: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E53E3E', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnLogoutText: { color: '#E53E3E', fontWeight: 'bold', fontSize: 15 }
});