import React, { FC } from 'react';
import { StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { CustomIcon } from '../../components/ui/CustomIcon';

export const LoginScreen: FC = () => {
  const { height } = useWindowDimensions();
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
          />
          <Input
            accessoryLeft={<CustomIcon name="lock-outline" />}
            placeholder="Contraseña"
            autoCapitalize="none"
            secureTextEntry
          />
        </Layout>

        <Layout style={styles.inputContainer} />

        <Layout style={styles.inputContainer}>
          <Button
            accessoryRight={<CustomIcon name="arrow-forward-outline" white />}
            onPress={() => {}}>
            Ingresar
          </Button>
        </Layout>

        <Layout style={styles.signInContainer}>
          <Text>¿No tienes cuenta?</Text>
          <Text status="primary" category="s1" onPress={() => {}}>
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
