import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';

const CalculatorScreen = ({ temaOscuro }) => {
  const [cost, setCost] = useState('');
  const [monthlyPrice, setMonthlyPrice] = useState('');
  const [months, setMonths] = useState('');
  const [inflation, setInflation] = useState('12.8');
  const [result, setResult] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleCalculate = () => {
    const parsedCost = parseFloat(cost);
    const parsedMonthlyPrice = parseFloat(monthlyPrice);
    const parsedMonths = parseInt(months);
    const parsedInflation = parseFloat(inflation) / 100;
    setModalVisible(true);

    if (isNaN(parsedCost) || isNaN(parsedMonthlyPrice) || isNaN(parsedMonths) || isNaN(parsedInflation)) {
      setResult('Por favor, ingrese números válidos en todos los campos.');
    } else if (parsedMonths < 1 || parsedMonths > 24) {
      setResult('La cantidad de cuotas debe estar entre 1 y 24.');
    } else {
      const decision = calcularPagoConInflacion(parsedCost, parsedMonthlyPrice, parsedInflation, parsedMonths);
      setResult(decision);
    }
  };

  const handleClear = () => {
    setCost('');
    setMonthlyPrice('');
    setMonths('');
    setInflation('12.8');
    setResult('');
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const styles = StyleSheet.create({
    calculatorSection: {
      backgroundColor: temaOscuro ? '#333' : '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      maxWidth: 400,
      margin: 20,
      padding: 20,
    },
    h1: {
      color: temaOscuro ? '#fff' : '#333',
      fontSize: 24,
      textAlign: 'center',
    },
    formContainer: {
      backgroundColor: temaOscuro ? '#666' : '#D8D8D8',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 3,
      padding: 20,
      maxWidth: 350,
      width: '100%',
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 5,
      color: temaOscuro ? '#fff' : '#333',
    },
    input: {
      padding: 10,
      borderWidth: 1,
      borderColor: temaOscuro ? '#fff' : '#ccc',
      borderRadius: 5,
      marginBottom: 10,
      color: temaOscuro ? '#fff' : '#333',
      backgroundColor: temaOscuro ? '#666' : '#fff',
    },
    inflationInput: {
      display: 'flex',
      alignItems: 'center',
      margin: 10,
    },
    button: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: temaOscuro ? '#003DB6' : 'rgb(0, 61, 182 )',
      color: '#fff',
      borderRadius: 5,
      marginHorizontal: 10,
    },
    calculateButton: {
      backgroundColor: temaOscuro ? '#3498db' : 'rgb(0, 61, 182 )',
      color: '#fff',
      borderWidth: 1,
      borderColor: '#333',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginVertical: 20,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    result: {
      fontWeight: 'bold',
      textAlign: 'center',
      color: temaOscuro ? '#fff' : '#333',
    },
    clearButton: {
      backgroundColor: temaOscuro ? '#666' : '#333',
      color: '#fff',
      borderWidth: 1,
      borderColor: temaOscuro ? '#fff' : '#333',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginVertical: 20,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    space: {
      width: 10,
      marginVertical: 4,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro para el modal
    },
    modalContent: {
      backgroundColor: temaOscuro ? '#333' : '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    resultText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      color: temaOscuro ? '#fff' : '#333',
    },
  });

  return (
    <View style={styles.calculatorSection}>
      <View style={styles.formContainer}>
        <Text style={styles.h1}>Cuotas o Contado?</Text>
        <View style={styles.form}>
          <View>
            <Text style={styles.label}>Monto en un solo pago:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={cost}
              onChangeText={(text) => setCost(text)}
            />
          </View>
          <View>
            <Text style={styles.label}>Precio en cuotas:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={monthlyPrice}
              onChangeText={(text) => setMonthlyPrice(text)}
            />
          </View>
          <View>
            <Text style={styles.label}>Cantidad de cuotas:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={months}
              onChangeText={(text) => setMonths(text)}
            />
          </View>
          <View>
            <Text style={styles.label}>Inflación Estimada Indec Noviembre 2023 (12.8%):</Text>
            <View style={styles.inflationInput}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={inflation}
                onChangeText={(text) => setInflation(text)}
              />
            </View>
          </View>
          <View>
            <Button title="Calcular" onPress={handleCalculate} style={styles.calculateButton} />
            <View style={styles.space} />
            <Button title="Limpiar" onPress={handleClear} style={styles.clearButton} />
          </View>
          {/* Modal para mostrar el resultado */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.resultText}>{result}</Text>
                <Button title="Cerrar" onPress={closeModal} />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

function calcularPagoConInflacion(pagoContado, pagoCuotas, tasaInflacion, numeroCuotas) {
  if (numeroCuotas === 1) {
    // Aplicar inflación solo para 1 cuota
    pagoCuotas /= 1 + tasaInflacion;
  } else {
    let valorActualCuota = pagoCuotas;
    for (let mes = 1; mes <= numeroCuotas; mes++) {
      valorActualCuota /= 1 + tasaInflacion;
    }
    pagoCuotas = valorActualCuota;
  }

  if (pagoCuotas < pagoContado) {
    return 'Le conviene comprar en cuotas.';
  } else {
    return 'Le conviene comprar de contado.';
  }
}

export default CalculatorScreen;
