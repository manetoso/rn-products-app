import React, { FC, PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { CustomIcon } from '../components/ui/CustomIcon';

interface Props extends PropsWithChildren {
  title: string;
  subtitle?: string;
  rightAction?: () => void;
  rightActionIcon?: string;
}

export const MainLayout: FC<Props> = ({
  title,
  children,
  rightAction,
  rightActionIcon,
  subtitle,
}) => {
  const { top } = useSafeAreaInsets();
  const { canGoBack, goBack } = useNavigation();

  const renderBackAction = () => (
    <TopNavigationAction icon={<CustomIcon name="arrow-back-outline" />} onPress={goBack} />
  );

  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderRightAction = () => {
    if (rightAction === undefined || rightActionIcon === undefined) return null;
    return (
      <TopNavigationAction onPress={rightAction} icon={<CustomIcon name={rightActionIcon} />} />
    );
  };
  return (
    <Layout style={{ paddingTop: top }}>
      <TopNavigation
        title={title}
        subtitle={subtitle}
        alignment="center"
        accessoryLeft={canGoBack() ? renderBackAction : undefined}
        // eslint-disable-next-line react/no-unstable-nested-components
        accessoryRight={() => <RenderRightAction />}
      />
      <Divider />
      <Layout style={styles.container}>{children}</Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
