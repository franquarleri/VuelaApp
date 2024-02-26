import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CalculadoraModal = ({ cotizaciones, visible, closeModal, temaOscuro }) => {
  const [cantidad, setCantidad] = useState('');
  const [monedaOrigen, setMonedaOrigen] = useState('ARS');
  const [monedaDestino, setMonedaDestino] = useState('USD');
  const [resultado, setResultado] = useState('');

  // Función para obtener la cotización de una moneda
  const getCotizacion = (moneda) => {
    if (moneda === 'ARS') {
      // Si la moneda es pesos argentinos, el valor es siempre 1
      return { compra: 1, venta: 1 };
    } else {
      // Obtener la cotización de la moneda desde el objeto de cotizaciones
      return cotizaciones[moneda] || { compra: 0, venta: 0 }; // Devuelve { compra: 0, venta: 0 } si no hay cotización disponible
    }
  };

  const handleCotizar = () => {
    const cantidadNumerica = parseFloat(cantidad);
    if (isNaN(cantidadNumerica)) {
      setResultado('La cantidad ingresada no es un número válido');
      return;
    }

    // Obtener las cotizaciones de las monedas de origen y destino
    const cotizacionOrigenData = getCotizacion(monedaOrigen);
    const cotizacionDestinoData = getCotizacion(monedaDestino);

    if (!cotizacionOrigenData || !cotizacionDestinoData) {
      setResultado('No se encontró la cotización de la moneda seleccionada');
      return;
    }

    // Realizar los cálculos de conversión según la moneda seleccionada
    let resultadoConversion;
    if (monedaOrigen === 'ARS') {
      // Si la moneda de origen es pesos argentinos, convertir la cantidad ingresada a la moneda de destino
      resultadoConversion = cantidadNumerica * cotizacionDestinoData.compra;
    } else if (monedaDestino === 'ARS') {
      // Si la moneda de destino es pesos argentinos, convertir la cantidad ingresada desde la moneda de origen
      resultadoConversion = cantidadNumerica / cotizacionOrigenData.venta;
    } else {
      // Si no involucra pesos argentinos en ninguna de las monedas, realizar la conversión normal
      resultadoConversion =
        (cantidadNumerica * cotizacionOrigenData.venta) * cotizacionDestinoData.compra;
    }

    // Establecer el resultado con el formato deseado
    setResultado(resultadoConversion.toFixed(2));
  };

  const reiniciarValores = () => {
    setCantidad('');
    setMonedaOrigen('ARS');
    setMonedaDestino('USD');
    setResultado('');
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
      <View style={[styles.modalContainer, temaOscuro && styles.modalContainerDark]}>
        <View style={[styles.modalContent, temaOscuro && styles.modalContentDark]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => closeModal()} style={styles.closeButton}>
              <Text style={[styles.closeButtonText, temaOscuro && styles.closeButtonTextDark]}>X</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.modalTitle, temaOscuro && styles.modalTitleDark]}>Calculadora de Cotizaciones</Text>
          <TextInput
            style={[styles.input, temaOscuro && styles.inputDark]}
            placeholder="Ingrese la cantidad"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={(text) => setCantidad(text)}
          />
          <Picker
  selectedValue={monedaOrigen}
  onValueChange={(itemValue) => setMonedaOrigen(itemValue)}
  style={[styles.picker, temaOscuro && styles.pickerDark, styles.pickerItem, temaOscuro && styles.pickerItemDark]}
>
  
  <Picker.Item label="Peso Argentino" value="pesos" />
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

<Picker
  selectedValue={monedaDestino}
  onValueChange={(itemValue) => setMonedaDestino(itemValue)}
  style={[styles.picker, temaOscuro && styles.pickerDark, styles.pickerItem, temaOscuro && styles.pickerItemDark]}
  enabled={monedaOrigen === 'pesos'} // Deshabilita el Picker si la moneda de origen no es 'pesos'
>
<Picker.Item label="Peso Argentino" value="pesos" />
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

          {resultado && <Text style={[styles.resultadoText, temaOscuro && styles.resultadoTextDark]}>{resultado}</Text>}
          <TouchableOpacity style={[styles.button, temaOscuro && styles.buttonDark]} onPress={handleCotizar}>
            <Text style={[styles.buttonText, temaOscuro && styles.buttonTextDark]}>Calcular</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonLimpiar} onPress={reiniciarValores}>
            <Text style={styles.buttonText}>Limpiar</Text>
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
  modalContainerDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Cambia el color de fondo para tema oscuro
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalContentDark: {
    backgroundColor: '#333', // Cambia el color de fondo para tema oscuro
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

  closeButtonTextDark: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  modalTitleDark: {
    color: '#fff', // Cambia el color del texto para tema oscuro
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color:'#333',
  },
  inputDark: {
    color: '#fff', // Cambia el color del texto para tema oscuro
    borderColor: '#fff', // Cambia el color del borde para tema oscuro
  },
  picker: {
    marginBottom: 10,
    color: 'black',
  },
  pickerDark: {
    color: '#fff', // Cambia el color del texto para tema oscuro
  },

  pickerItem:{
    backgroundColor: '#333',
    color:'white',
  },

  pickerItemDark: {
    color: 'white',
    backgroundColor: '#333',
  },

  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDark: {
    backgroundColor: '#3498db', // Cambia el color de fondo para tema oscuro
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonTextDark: {
    color: '#fff', // Cambia el color del texto para tema oscuro
  },

  buttonLimpiar:{
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop:10,
  },

  resultadoText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color:'black',
  },

  resultadoTextDark: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color:'white',
  },
});

export default CalculadoraModal;




