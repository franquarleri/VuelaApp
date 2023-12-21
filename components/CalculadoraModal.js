import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CalculadoraModal = ({ visible, closeModal, cotizar, data }) => {
  const [cantidad, setCantidad] = useState('');
  const [tipoOperacion, setTipoOperacion] = useState('pesosAmoneda');
  const [tipoCambio, setTipoCambio] = useState('blue');
  const [resultado, setResultado] = useState('');
  const [cotizaciones, setCotizaciones] = useState({});
 
  useEffect(() => {
     if (!visible) {
       setCantidad('');
       setTipoOperacion('pesosAmoneda');
       setTipoCambio('blue');
       setResultado('');
     }
  }, [visible]);
 
  useEffect(() => {
     setCotizaciones(data);
  }, [data]);
 
  const handleCotizar = () => {
     console.log('Cotizaciones disponibles:', cotizaciones);
     
     // Validar la cantidad ingresada
     const cantidadNumerica = parseFloat(cantidad);
     if (isNaN(cantidadNumerica)) {
       setResultado('La cantidad ingresada no es un número válido');
       return;
     }
 
     // Validar que la moneda seleccionada exista en el objeto data
     if (!cotizaciones || !cotizaciones.hasOwnProperty(tipoCambio)) {
       setResultado('No se encontró la cotización de la moneda seleccionada');
       return;
     }
 
     // Realizar la operación
     let resultadoCotizacion = 0;
     if (tipoOperacion === 'pesosAmoneda') {
       resultadoCotizacion = cantidadNumerica * cotizaciones[tipoCambio];
     } else {
       resultadoCotizacion = cantidadNumerica / cotizaciones[tipoCambio];
     }
 
     setResultado(resultadoCotizacion.toFixed(2));
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
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => closeModal()} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
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
            selectedValue={tipoCambio}
            onValueChange={(itemValue) => setTipoCambio(itemValue)}
          >
            {/* Agrega aquí las opciones de moneda según las tarjetas que estás mostrando */}
            <Picker.Item label="Dólar Blue" value="blue" />
            <Picker.Item label="Dólar Oficial" value="oficial" />
            <Picker.Item label="Dólar Bolsa" value="bolsa" />
            <Picker.Item label="Dólar CCL" value="liqui" />
            <Picker.Item label="Dólar Cripto" value="cripto" />
            <Picker.Item label="Dólar Mayorista" value="mayorista" />
            <Picker.Item label="Dólar Tarjeta" value="tarjeta" />
            <Picker.Item label="Real" value="real" />
            <Picker.Item label="Euro" value="euro" />
            <Picker.Item label="Peso Uruguayo" value="uru" />
            {/* Agrega más opciones según sea necesario */}
          </Picker>
          {/* Muestra el resultado en la interfaz */}
          {resultado && <Text>{resultado}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleCotizar}>
            <Text style={styles.buttonText}>Calcular</Text>
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    padding: 0,
  },
  closeButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
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
