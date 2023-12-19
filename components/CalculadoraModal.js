import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CalculadoraModal = ({ visible, closeModal, cotizar }) => {
  const [cantidad, setCantidad] = useState('');
  const [tipoOperacion, setTipoOperacion] = useState('pesosAmoneda');
  const [moneda, setMoneda] = useState('blue');

  const handleCotizar = () => {
    // Realiza la lógica de cotización según tus necesidades
    cotizar(cantidad, tipoOperacion, moneda);
    // Cierra el modal después de cotizar
    closeModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Calculadora de Cotizaciones</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese la cantidad"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={(text) => setCantidad(text)}
          />
          <Picker
            selectedValue={tipoOperacion}
            onValueChange={(itemValue) => setTipoOperacion(itemValue)}
          >
            <Picker.Item label="Pesos a Moneda" value="pesosAmoneda" />
            <Picker.Item label="Moneda a Pesos" value="monedaApesos" />
          </Picker>
          <Picker
            selectedValue={moneda}
            onValueChange={(itemValue) => setMoneda(itemValue)}
          >
            {/* Agrega aquí las opciones de moneda según las tarjetas que estás mostrando */}
            <Picker.Item label="Dólar Blue" value="blue" />
            <Picker.Item label="Dólar Oficial" value="oficial" />
            {/* Agrega más opciones según sea necesario */}
          </Picker>
          <TouchableOpacity style={styles.button} onPress={handleCotizar}>
            <Text style={styles.buttonText}>Cotizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CalculadoraModal;
