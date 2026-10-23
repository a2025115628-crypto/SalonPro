
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    SafeAreaProvider,
    SafeAreaView,
} from 'react-native-safe-area-context';

type Seccion = 'roles' | 'usuarios';

export default function App() {
    const [seccion, setSeccion] = useState<Seccion>('roles');
    const esRoles = seccion === 'roles';

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.pantalla} edges={['top', 'bottom']}>
                <StatusBar style="dark" />
                <ScrollView contentContainerStyle={styles.contenido}>
                    <Text style={styles.etiqueta}>PROGRAMACIÓN APLICADA</Text>
                    <Text style={styles.titulo}>SalonPro</Text>
                    <Text style={styles.subtitulo}>
                        Mi primera aplicación Android con React Native.
                    </Text>

                    <View style={styles.filaIndicadores}>
                        <View style={styles.indicador}>
                            <Text style={styles.numero}>0</Text>
                            <Text style={styles.indicadorTexto}>Roles</Text>
                        </View>
                        <View style={styles.indicador}>
                            <Text style={styles.numero}>0</Text>
                            <Text style={styles.indicadorTexto}>Usuarios</Text>
                        </View>
                    </View>

                    <Text style={styles.seccionTitulo}>Explorar módulos</Text>
                    <View style={styles.filaBotones}>
                        <Pressable
                            onPress={() => setSeccion('roles')}
                            accessibilityRole="button"
                            accessibilityLabel="Mostrar módulo Roles"
                            accessibilityState={{ selected: esRoles }}
                            style={[styles.boton, esRoles && styles.botonActivo]}
                        >
                            <Text
                                style={[
                                    styles.botonTexto,
                                    esRoles && styles.botonTextoActivo,
                                ]}
                            >
                                Roles
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setSeccion('usuarios')}
                            accessibilityRole="button"
                            accessibilityLabel="Mostrar módulo Usuarios"
                            accessibilityState={{ selected: !esRoles }}
                            style={[styles.boton, !esRoles && styles.botonActivo]}
                        >
                            <Text
                                style={[
                                    styles.botonTexto,
                                    !esRoles && styles.botonTextoActivo,
                                ]}
                            >
                                Usuarios
                            </Text>
                        </Pressable>
                    </View>

                    <View style={styles.panel}>
                        <Text style={styles.panelTitulo}>
                            {esRoles ? 'Módulo Roles' : 'Módulo Usuarios'}
                        </Text>
                        <Text style={styles.panelTexto}>
                            {esRoles
                                ? 'Aquí mostraremos los roles del sistema.'
                                : 'Aquí mostraremos los usuarios de un rol.'}
                        </Text>
                        <Text style={styles.aviso}>
                            Datos reales: ninguno. Sin API ni base de datos aún.
                        </Text>
                    </View>
                    <Text style={styles.pie}>Rol (1) - Usuario (N)</Text>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    pantalla: { flex: 1, backgroundColor: '#F8F6FA' },
    contenido: { padding: 20, paddingBottom: 42 },
    etiqueta: { fontSize: 12, color: '#75509A', fontWeight: '700' },
    titulo: { fontSize: 31, color: '#2F2635', fontWeight: '800', marginTop: 8 },
    subtitulo: { fontSize: 15, color: '#75697C', marginTop: 9 },
    filaIndicadores: { flexDirection: 'row', gap: 12, marginTop: 24 },
    indicador: {
        flex: 1, padding: 18, borderRadius: 16, backgroundColor: '#FFFFFF',
    },
    numero: { fontSize: 29, fontWeight: '700', color: '#2F2635' },
    indicadorTexto: { marginTop: 4, color: '#75697C' },
    seccionTitulo: { fontSize: 18, fontWeight: '700', marginTop: 26,
        marginBottom: 13, color: '#2F2635' },
    filaBotones: { flexDirection: 'row', gap: 10 },
    boton: { flex: 1, borderRadius: 12, padding: 14,
        backgroundColor: '#EADFF2', alignItems: 'center' },
    botonActivo: { backgroundColor: '#75509A' },
    botonTexto: { color: '#2F2635', fontWeight: '700' },
    botonTextoActivo: { color: '#FFFFFF' },
    panel: { marginTop: 17, backgroundColor: '#FFFFFF',
        padding: 21, borderRadius: 17 },
    panelTitulo: { fontSize: 20, color: '#2F2635', fontWeight: '700' },
    panelTexto: { fontSize: 15, color: '#75697C', marginTop: 13,
        lineHeight: 23 },
    aviso: { fontSize: 13, color: '#75509A', marginTop: 21 },
    pie: { textAlign: 'center', color: '#75697C', marginTop: 30 },
});
