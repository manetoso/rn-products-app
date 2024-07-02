import React, { FC, useState } from 'react';
import { StyleSheet, ScrollView, useWindowDimensions, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, Layout, Text } from '@ui-kitten/components';

import { CustomIcon } from '../../components/ui/CustomIcon';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen: FC<Props> = ({ navigation }) => {
  const { login } = useAuthStore();
  const { height } = useWindowDimensions();
  const [form, setForm] = useState({ email: '', password: '' });
  const [isPosting, setIsPosting] = useState(false);

  const onLogin = async () => {
    if (!form.email || !form.password) {
      return;
    }
    setIsPosting(true);
    const wasSuccessfull = await login(form.email, form.password);
    setIsPosting(false);
    if (wasSuccessfull) return;
    Alert.alert('Error', 'Credenciales incorrectas');
  };

  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Layout style={{ paddingTop: height * 0.3 }}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>

        <Layout style={styles.inputContainer}>
          <Input
            accessoryLeft={<CustomIcon name="email-outline" />}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={value => setForm({ ...form, email: value })}
          />
          <Input
            accessoryLeft={<CustomIcon name="lock-outline" />}
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
            value={form.password}
            onChangeText={value => setForm({ ...form, password: value })}
          />
        </Layout>

        <Layout style={styles.inputContainer} />

        <Layout style={styles.inputContainer}>
          <Button
            accessoryRight={<CustomIcon name="arrow-forward-outline" white />}
            disabled={isPosting}
            onPress={onLogin}>
            Ingresar
          </Button>
        </Layout>

        <Layout style={styles.signInContainer}>
          <Text>¿No tienes cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => {
              navigation.navigate('RegisterScreen');
            }}>
            Crear cuenta
          </Text>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
  inputContainer: {
    paddingTop: 20,
    flexDirection: 'column',
    gap: 10,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingTop: 20,
    gap: 10,
  },
});
