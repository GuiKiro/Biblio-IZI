import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#666',
        headerShown: true, // Garante que a barra superior está visível
        headerStyle: {
          backgroundColor: '#FFF',
        },
        // 🌟 PERFIL NO CANTO SUPERIOR DIREITO
        headerRight: () => (
          <TouchableOpacity 
            style={styles.profileContainer} 
            onPress={() => router.push('/perfil')}
          >
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' }} 
              style={styles.profileAvatar} 
            />
            <View style={styles.profileBadge} />
          </TouchableOpacity>
        ),
      }}
    >
      {/* 1º ÍCONE: ESQUERDA */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Biblioteca',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 2º ÍCONE: MEIO (MAPA) */}
      <Tabs.Screen
        name="fornecedor-atalho"
        options={{
          title: 'Parceiros',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />

      {/* 3º ÍCONE: DIREITA */}
      <Tabs.Screen
        name="two"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    marginRight: 16,
    position: 'relative',
  },
  profileAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#EAEAEA',
  },
  profileBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF3B30',
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
});