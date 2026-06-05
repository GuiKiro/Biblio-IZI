import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUsuario } from './_layout'; // Puxa do Layout

export default function CadastroInicial() {
  const router = useRouter();
  const { setUsuario } = useUsuario();
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const handleCriarConta = () => {
    if (!nome || !email || !cpf || !senha) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos para criar sua conta.");
      return;
    }

    // Salva globalmente
    setUsuario({ nome, email, cpf });

    Alert.alert(
      "Conta Criada!", 
      `Bem-vindo(a) à Biblio IZI, ${nome}!`,
      [{ 
        text: "Começar a Ler", 
        onPress: () => router.replace('/(tabs)') 
      }]
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerSection}>
          <View style={styles.logoIcon}>
            <Ionicons name="book" size={50} color="#007AFF" />
          </View>
          <Text style={styles.welcomeTitle}>Criar sua Conta</Text>
          <Text style={styles.welcomeSubtitle}>Faça seu cadastro para acessar livros digitais e físicos próximos de você.</Text>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.inputLabel}>Nome Completo</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Digite seu nome" 
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.inputLabel}>E-mail</Text>
          <TextInput 
            style={styles.input} 
            placeholder="seu-email@exemplo.com" 
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.inputLabel}>CPF</Text>
          <TextInput 
            style={styles.input} 
            placeholder="000.000.000-00" 
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={cpf}
            onChangeText={setCpf}
          />

          <Text style={styles.inputLabel}>Senha</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Crie uma senha forte" 
            placeholderTextColor="#999"
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <TouchableOpacity style={styles.btnCadastrar} onPress={handleCriarConta}>
          <Text style={styles.btnText}>Cadastrar e Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLoginAlternativo} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.btnTextAlternativo}>Pular Cadastro (Modo Visitante)</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 24, paddingTop: 60, paddingBottom: 40 },
  headerSection: { alignItems: 'center', marginBottom: 35 },
  logoIcon: { backgroundColor: '#EBF5FF', padding: 16, borderRadius: 24, marginBottom: 16 },
  welcomeTitle: { fontSize: 26, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 8 },
  welcomeSubtitle: { fontSize: 14, color: '#666666', textAlign: 'center', lineHeight: 20, paddingHorizontal: 10 },
  formSection: { marginBottom: 24 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#444444', marginBottom: 6, marginLeft: 4 },
  input: { backgroundColor: '#F8F9FA', borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 12, padding: 14, fontSize: 15, color: '#1a1a1a', marginBottom: 16 },
  btnCadastrar: { backgroundColor: '#007AFF', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10, shadowColor: '#007AFF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 4 },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  btnLoginAlternativo: { alignItems: 'center', marginTop: 20, padding: 10 },
  btnTextAlternativo: { color: '#666666', fontSize: 14, textDecorationLine: 'underline' }
});