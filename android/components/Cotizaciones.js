import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalculadoraModal from "./CalculadoraModal";
import CalculatorScreen from './Cuotas';

const Cotizaciones = () => {
  const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [fechaActualizacion, setFechaActualizacion] = useState(null);
  const [temaOscuro, setTemaOscuro] = useState(false);

  useEffect(() => {
    // Obtener la preferencia del usuario al cargar el componente
    obtenerPreferenciaTema();
    obtenerCotizaciones();
    obtenerCotizacionUru();
    obtenerCotizacionReal();
    obtenerCotizacionEuro();
  }, []);

  // Función para obtener la preferencia del tema desde el almacenamiento local
  const obtenerPreferenciaTema = async () => {
    try {
      const temaGuardado = await AsyncStorage.getItem('temaOscuro');
      if (temaGuardado !== null) {
        // Si hay una preferencia guardada, actualizar el estado del tema oscuro
        setTemaOscuro(temaGuardado === 'true');
      }
    } catch (error) {
      console.error('Error al obtener la preferencia del tema:', error);
    }
  };

  // Función para guardar la preferencia del tema en el almacenamiento local
  const guardarPreferenciaTema = async (valor) => {
    try {
      await AsyncStorage.setItem('temaOscuro', valor.toString());
    } catch (error) {
      console.error('Error al guardar la preferencia del tema:', error);
    }
  };

  // Función para cambiar el tema y guardar la preferencia del usuario
  const toggleTema = () => {
    const nuevoValor = !temaOscuro;
    setTemaOscuro(nuevoValor);
    // Guardar la preferencia del tema en el almacenamiento local
    guardarPreferenciaTema(nuevoValor);
  };
  
  

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

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: temaOscuro ? '#333' : '#fff',
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    switchText: {
      color: temaOscuro ? '#fff' : '#000',
      marginRight: 8,
    },
    titulo: {
      alignItems: 'center',
      marginBottom: 20,
    },
    textoTitulo: {
      fontSize: 24,
      fontWeight: 'bold',
      color: temaOscuro ? '#fff' : '#000',
    },
    card: {
      backgroundColor: temaOscuro ? '#444' : '#eee',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
    textoTarjeta: {
      fontSize: 18,
      fontWeight: 'bold',
      color: temaOscuro ? '#fff' : '#000',
    },
    textoCompra: {
      fontSize: 16,
      color: temaOscuro ? '#fff' : '#000',
    },
    textoVenta: {
      fontSize: 16,
      color: temaOscuro ? '#fff' : '#000',
    },
    fechaActualizacion: {
      alignItems: 'center',
      marginTop: 20,
    },
    textoFecha: {
      fontSize: 14,
      color: temaOscuro ? '#fff' : '#000',
    },
    botonCotizar: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
      alignItems: 'center',
    },
    textoBoton: {
      color: '#fff',
      fontSize: 18,
    },
    scrollViewContent: {
      flexGrow: 1,
    },
  });
  


  return (
    <View style={styles.container}>
      {/* Interruptor para cambiar el tema */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Modo Oscuro</Text>
        <Switch value={temaOscuro} onValueChange={toggleTema} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.titulo}>
          <Text style={styles.textoTitulo}>Cotizaciones</Text>
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
  temaOscuro={temaOscuro}
  cotizaciones={data} 
/>


        <CalculatorScreen />
      </ScrollView>
    </View>
  );  
};

export default Cotizaciones;

