import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { Header } from '@/components/header';

export default function TabLayout() {
  return (
    <>
      <AnimatedSplashOverlay />
      <Header />
      <AppTabs />
    </>
  );
}
