import { Stack } from 'expo-router';
import React, { createContext, useState, useContext } from 'react';

// --- CENTRAL DE DADOS GLOBAL (CONTEXTO INTEGRADO) ---
interface DadosUsuario {
  nome: string;
  email: string;
  cpf: string;
}

// Tipagem das informações do produto que o mapa vai enviar
interface DadosProduto {
  loja: string;
  preco: string;
  tipo: string;
  prazo: string;
}

interface ContextoType {
  usuario: DadosUsuario;
  setUsuario: React.Dispatch<React.SetStateAction<DadosUsuario>>;
  isDarkMode: boolean;
  toggleTheme: () => void;
  produtoFinalizacao: DadosProduto | null;
  setProdutoFinalizacao: React.Dispatch<React.SetStateAction<DadosProduto | null>>;
}

const UsuarioContexto = createContext<ContextoType | undefined>(undefined);

export function UsuarioProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<DadosUsuario>({ nome: '', email: '', cpf: '' });
  
  // Estado para controlar o Modo Escuro / Claro globalmente
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Estado para segurar os dados do produto escolhido no mapa
  const [produtoFinalizacao, setProdutoFinalizacao] = useState<DadosProduto | null>(null);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <UsuarioContexto.Provider value={{ 
      usuario, 
      setUsuario, 
      isDarkMode, 
      toggleTheme, 
      produtoFinalizacao, 
      setProdutoFinalizacao 
    }}>
      {children}
    </UsuarioContexto.Provider>
  );
}

export function useUsuario() {
  const context = useContext(UsuarioContexto);
  if (!context) throw new Error('useUsuario deve ser usado dentro de um UsuarioProvider');
  return context;
}
// --------------------------------------------------

export default function RootLayout() {
  return (
    <UsuarioProvider>
      <Stack initialRouteName="cadastro">
        
        {/* 1. Tela Inicial de Cadastro */}
        <Stack.Screen 
          name="cadastro" 
          options={{ 
            title: 'Cadastro',
            headerShown: false 
          }} 
        />

        {/* 2. Abas do Aplicativo (Biblioteca e Mapa) */}
        <Stack.Screen 
          name="(tabs)" 
          options={{ 
            headerShown: false 
          }} 
        />

        {/* 3. Tela de Perfil */}
        <Stack.Screen 
          name="perfil" 
          options={{ 
            title: 'Meu Perfil',
            presentation: 'modal', 
            headerShown: true,     
            headerTintColor: '#007AFF',
            headerTitleStyle: { fontWeight: 'bold' }
          }} 
        />

        {/* 4. NOVA TELA: Finalização de Produto (Adicionada aqui!) */}
        <Stack.Screen 
          name="finalizacao" 
          options={{ 
            title: 'Finalizar Pedido',
            headerShown: true,
            headerTintColor: '#007AFF',
            headerTitleStyle: { fontWeight: 'bold' }
          }} 
        />

      </Stack>
    </UsuarioProvider>
  );
}