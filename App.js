
import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
export default function App() {

  const [fotos, setFotos] = useState([]);
  const [mostrarFotos, setMostrarFotos] = useState(false);

  function carregarFotos() {
    fetch('https://api.openverse.org/v1/images/?q=nature&page_size=20')
      .then(resposta => resposta.json())
      .then(dados => {
        setFotos(dados.results);
        setMostrarFotos(true);
      })
      .catch(erro => console.log(erro));
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Minha Galeria</Text>
      <Text style={styles.subtitulo}>Imagens da natureza para relaxar!</Text>
      <Text style={styles.instrucao}>clique abaixo para carregar as fotos</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={carregarFotos}
      >
        <Text style={styles.textoBotao}>
          Mostrar fotos
        </Text>
      </TouchableOpacity>

      {mostrarFotos && (
        <FlatList
          data={fotos}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.thumbnail }}
              style={styles.foto}
            />
          )}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#3e98c2',
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    color: '#003663',
  },

  foto: {
    width: '48%',
    height: 180,
    margin: '1%',
    borderRadius: 20,
  },

  subtitulo: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#07253d',
  },

  instrucao: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#0060af',
  },
  botao: {
  backgroundColor: '#03204d',
  height: 50,
  width: 200,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
},

textoBotao: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},

});