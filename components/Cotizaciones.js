import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CalculadoraModal from './CalculadoraModal';

const Cotizaciones = () => {
  const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cantidadDinero, setCantidadDinero] = useState('');
  const [conversor, setConversor] = useState('pesosAdolares');
  const [tipoCambio, setTipoCambio] = useState('blue');
  const [fechaActualizacion, setFechaActualizacion] = useState(null);


  useEffect(() => {
    obtenerCotizaciones();
    obtenerCotizacionUru();
    obtenerCotizacionReal();
    obtenerCotizacionEuro();
  }, []);
  
  

  const obtenerCotizacionUru = async () => {
    const UruApiUrl = 'https://dolarapi.com/v1/cotizaciones/uyu';
  
    try {
      const response = await fetch(UruApiUrl);
      const data = await response.json();
  
      const uru = {
        compra: data.compra,
        venta: data.venta,
      };
  
      // Llama a la función actualizarTarjeta con el cardId correspondiente (urug-card)
      actualizarTarjeta('uru',uru);
    } catch (error) {
      console.error('Error al obtener la cotización del peso uruguayo:', error);
    }
  };


  const obtenerCotizacionReal = async () => {
    const realApiUrl = 'https://dolarapi.com/v1/cotizaciones/brl';

    try {
      const response = await fetch(realApiUrl);
      const data = await response.json();

      const real = {
        compra: data.compra,
        venta: data.venta,
      };

      actualizarTarjeta('real',real);
    } catch (error) {
      console.error('Error al obtener la cotización del Real:', error);
    }
  };

  const obtenerCotizacionEuro = async () => {
    const euroApiUrl = 'https://dolarapi.com/v1/cotizaciones/eur';

    try {
      const response = await fetch(euroApiUrl);
      const data = await response.json();

      const euro = {
        compra: data.compra,
        venta: data.venta,
      };

      actualizarTarjeta('euro',euro);
    } catch (error) {
      console.error('Error al obtener la cotización del Euro:', error);
    }
  };

  const obtenerCotizaciones = async () => {
    const apiUrl = 'https://dolarapi.com/v1/dolares';
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (Array.isArray(data) && data.length > 0) {
        actualizarTarjeta('oficial', data[0]);
        actualizarTarjeta('blue', data[1]);
        actualizarTarjeta('bolsa', data[2]);
        actualizarTarjeta('liqui', data[3]);
        actualizarTarjeta('mayorista', data[4]);
        actualizarTarjeta('cripto', data[5]);
        actualizarTarjeta('tarjeta', data[6]);

        // Actualiza la fecha en el footer
        const fechaActualizacion = new Date();
        setFechaActualizacion(fechaActualizacion);
      } else {
        console.error('La respuesta de la API no tiene la estructura esperada:', data);
      }
    } 
    
    catch (error) {
      console.error('Error al obtener las cotizaciones:', error);
    }
  };

  const actualizarTarjeta = (cardId, moneda) => {
    setData((prevData) => ({
      ...prevData,
      [cardId]: moneda,
    }));
  };

  const handleCotizar = (cantidad, tipoOperacion, moneda) => {
    // Implementa la lógica de cotización aquí según los parámetros proporcionados
    // Actualiza los estados o realiza las operaciones necesarias
    // Ejemplo:
    // setCantidadDinero(cantidad);
    // setTipoCambio(moneda);
    // setConversor(tipoOperacion);
    // calcularValor(); // Puedes llamar a tu función de cálculo aquí si es necesario
  };
    
  // Estilos.

  const styles = StyleSheet.create({
    container: {
      flex: 0,
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titulo: {
      marginBottom: 16,
    },
    textoTitulo: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    cotizaciones: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    card: {
      width: '48%',
      backgroundColor: '#e0e0e0',
      padding: 16,
      marginBottom: 16,
      borderRadius: 8,
    },
    textoTarjeta: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    textoCompra: {
      fontSize: 16,
      marginBottom: 4,
    },
    textoVenta: {
      fontSize: 16,
    },
    fechaActualizacion: {
      marginBottom: 16,
    },
    textoFecha: {
      fontSize: 14,
      color: '#555',
    },
    botonCotizar: {
      backgroundColor: '#3498db',
      padding: 16,
      borderRadius: 8,
    },
    textoBoton: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
  });

return (
  <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.textoTitulo}>Tasa de Cambio</Text>
      </View>

      <View style={styles.cotizaciones}>
        {/* Tarjeta Dólar Blue */}
        <View style={styles.card}>
          <Text style={styles.textoTarjeta}>Dólar Blue</Text>
          <Text style={styles.textoCompra}>Compra: ${data?.blue?.compra || 'Cargando...'}</Text>
          <Text style={styles.textoVenta}>Venta: ${data?.blue?.venta || 'Cargando...'}</Text>
        </View>
        {/* Tarjeta Dólar Oficial */}
        <View style={styles.card}>
          <Text style={styles.textoTarjeta}>Dólar Oficial</Text>
          <Text style={styles.textoCompra}>Compra: ${data?.oficial?.compra || 'Cargando...'}</Text>
          <Text style={styles.textoVenta}>Venta: ${data?.oficial?.venta || 'Cargando...'}</Text>
        </View>
        {/* Tarjeta Dólar Bolsa */}
        <View style={styles.card}>
          <Text style={styles.textoTarjeta}>Dólar Bolsa</Text>
          <Text style={styles.textoCompra}>Compra: ${data?.bolsa?.compra || 'Cargando...'}</Text>
          <Text style={styles.textoVenta}>Venta: ${data?.bolsa?.venta || 'Cargando...'}</Text>
        </View>
        {/* Tarjeta Dólar Liqui */}
        <View style={styles.card}>
          <Text style={styles.textoTarjeta}>Dólar CCL</Text>
          <Text style={styles.textoCompra}>Compra: ${data?.liqui?.compra || 'Cargando...'}</Text>
          <Text style={styles.textoVenta}>Venta: ${data?.liqui?.venta || 'Cargando...'}</Text>
        </View>
        {/* Tarjeta Dólar Solidario */}
        <View style={styles.card}>
          <Text style={styles.textoTarjeta}>Dólar Cripto</Text>
          <Text style={styles.textoCompra}>Compra: ${data?.cripto?.compra || 'Cargando...'}</Text>
          <Text style={styles.textoVenta}>Venta: ${data?.cripto?.venta || 'Cargando...'}</Text>
        </View>
        {/* Tarjeta Dólar Mayorista */}
        <View style={styles.card}>
          <Text style={styles.textoTarjeta}>Dólar Mayorista</Text>
          <Text style={styles.textoCompra}>Compra: ${data?.mayorista?.compra || 'Cargando...'}</Text>
          <Text style={styles.textoVenta}>Venta: ${data?.mayorista?.venta || 'Cargando...'}</Text>
        </View>
        {/* Tarjeta Dólar Tarjeta */}
        <View style={styles.card}>
          <Text style={styles.textoTarjeta}>Dólar Tarjeta</Text>
          <Text style={styles.textoCompra}>Compra: ${data?.tarjeta?.compra || 'Cargando...'}</Text>
          <Text style={styles.textoVenta}>Venta: ${data?.tarjeta?.venta || 'Cargando...'}</Text>
        </View>
        {/* Tarjeta Real */}
        <View style={styles.card}>
          <Text style={styles.textoTarjeta}>Real</Text>
          <Text style={styles.textoCompra}>Compra: ${data?.real?.compra || 'Cargando...'}</Text>
          <Text style={styles.textoVenta}>Venta: ${data?.real?.venta || 'Cargando...'}</Text>
        </View>
        {/* Tarjeta Peso Uruguayo */}
        <View style={styles.card}>
          <Text style={styles.textoTarjeta}>Peso Uruguayo</Text>
          <Text style={styles.textoCompra}>Compra: ${data?.uru?.compra || 'Cargando...'}</Text>
          <Text style={styles.textoVenta}>Venta: ${data?.uru?.venta || 'Cargando...'}</Text>
        </View>
        {/* Tarjeta Euro */}
        <View style={styles.card}>
          <Text style={styles.textoTarjeta}>Euro</Text>
          <Text style={styles.textoCompra}>Compra: ${data?.euro?.compra || 'Cargando...'}</Text>
          <Text style={styles.textoVenta}>Venta: ${data?.euro?.venta || 'Cargando...'}</Text>
        </View>

        {/* Otras tarjetas aquí... */}
      </View>
      <View style={styles.fechaActualizacion}>
        <Text style={styles.textoFecha}>
          Fecha de actualización: {fechaActualizacion ? fechaActualizacion.toLocaleDateString() + ' - ' + fechaActualizacion.toLocaleTimeString() : 'Cargando...'}
        </Text>
      </View>


      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.botonCotizar}>
        <Text style={styles.textoBoton}>Cotizar</Text>
      </TouchableOpacity>

      <CalculadoraModal
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
        cotizar={handleCotizar}
      />

      {/* Puedes agregar aquí la lógica del modal según tus necesidades */}
    
  </ScrollView>
  );  
};

export default Cotizaciones;