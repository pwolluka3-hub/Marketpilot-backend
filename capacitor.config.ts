import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nexusai.app',
  appName: 'NexusAI',
  webDir: 'dist',
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false
  },
  plugins: {
    LocalNotifications: { smallIcon: 'ic_stat_icon' },
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: '#080B14',
      androidSplashResourceName: 'splash'
    }
  }
};

export default config;
