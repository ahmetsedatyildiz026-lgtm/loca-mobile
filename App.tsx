// LOCA - Ana Uygulama Dosyası (Production Ready)
import React, { useEffect, useState } from 'react';
import { 
  StatusBar, 
  SafeAreaView, 
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { AppNavigator } from './navigation/AppNavigator';
import { THEME_COLORS, DESIGN_TOKENS } from './types';
import { LAYOUT_STYLES, TYPOGRAPHY } from './styles';

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('LOCA App Error:', error, errorInfo);
    // Here you could log to crash reporting service like Crashlytics
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={[LAYOUT_STYLES.container, LAYOUT_STYLES.center]}>
          <StatusBar backgroundColor={THEME_COLORS.error} barStyle="light-content" />
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Bir şeyler ters gitti</Text>
            <Text style={styles.errorMessage}>
              Uygulama beklenmedik bir hatayla karşılaştı. Lütfen uygulamayı yeniden başlatın.
            </Text>
            <Text style={styles.errorDetails}>
              Hata: {this.state.error?.message}
            </Text>
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

// Loading Screen Component
const LoadingScreen: React.FC = () => (
  <SafeAreaView style={[LAYOUT_STYLES.container, LAYOUT_STYLES.center]}>
    <StatusBar backgroundColor={THEME_COLORS.primary} barStyle="light-content" />
    <View style={styles.loadingContainer}>
      <Text style={styles.appTitle}>LOCA</Text>
      <Text style={styles.appSubtitle}>İstanbul'u Keşfet</Text>
      <ActivityIndicator 
        size="large" 
        color={THEME_COLORS.primary} 
        style={styles.loadingSpinner}
      />
      <Text style={styles.loadingText}>Yükleniyor...</Text>
    </View>
  </SafeAreaView>
);

// Ana App Komponenti
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [appError, setAppError] = useState<string | null>(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // App initialization tasks
      await Promise.all([
        // Simulated async operations
        new Promise(resolve => setTimeout(resolve, 1000)), // Splash screen duration
        
        // Here you would typically:
        // - Initialize Firebase/Supabase
        // - Check authentication status
        // - Load cached data
        // - Request permissions
        // - Initialize analytics
        // - Load app configuration
      ]);

      console.log('LOCA App initialized successfully');
      setIsLoading(false);
    } catch (error) {
      console.error('App initialization error:', error);
      setAppError(error instanceof Error ? error.message : 'Unknown error');
      setIsLoading(false);
    }
  };

  // App Error State
  if (appError) {
    return (
      <SafeAreaView style={[LAYOUT_STYLES.container, LAYOUT_STYLES.center]}>
        <StatusBar backgroundColor={THEME_COLORS.error} barStyle="light-content" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Başlatma Hatası</Text>
          <Text style={styles.errorMessage}>
            Uygulama başlatılırken bir hata oluştu. İnternet bağlantınızı kontrol edip tekrar deneyin.
          </Text>
          <Text style={styles.errorDetails}>Hata: {appError}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Loading State
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Main App
  return (
    <ErrorBoundary>
      <SafeAreaView style={styles.appContainer}>
        <StatusBar 
          backgroundColor={THEME_COLORS.primary} 
          barStyle="light-content"
          translucent={false}
        />
        <AppNavigator />
      </SafeAreaView>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: DESIGN_TOKENS.spacing.xl,
  },
  appTitle: {
    ...TYPOGRAPHY.h1,
    color: THEME_COLORS.primary,
    fontWeight: '900',
    letterSpacing: 3,
    marginBottom: DESIGN_TOKENS.spacing.xs,
  },
  appSubtitle: {
    ...TYPOGRAPHY.body,
    color: THEME_COLORS.textSecondary,
    marginBottom: DESIGN_TOKENS.spacing.xl,
    textAlign: 'center',
  },
  loadingSpinner: {
    marginVertical: DESIGN_TOKENS.spacing.lg,
  },
  loadingText: {
    ...TYPOGRAPHY.label,
    color: THEME_COLORS.textSecondary,
    marginTop: DESIGN_TOKENS.spacing.sm,
  },
  errorContainer: {
    alignItems: 'center',
    padding: DESIGN_TOKENS.spacing.xl,
    maxWidth: '90%',
  },
  errorTitle: {
    ...TYPOGRAPHY.h4,
    color: THEME_COLORS.error,
    textAlign: 'center',
    marginBottom: DESIGN_TOKENS.spacing.md,
  },
  errorMessage: {
    ...TYPOGRAPHY.body,
    color: THEME_COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: DESIGN_TOKENS.spacing.lg,
  },
  errorDetails: {
    ...TYPOGRAPHY.caption,
    color: THEME_COLORS.textSecondary,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
});

// Development/Debug Configuration
if (__DEV__) {
  console.log('LOCA App running in development mode');
  
  // Enable debug logging
  console.log('Theme Colors:', THEME_COLORS);
  console.log('Design Tokens:', DESIGN_TOKENS);
}

// Performance monitoring (Production)
if (!__DEV__) {
  console.log('LOCA App running in production mode');
  
  // Here you would typically initialize:
  // - Crashlytics
  // - Performance monitoring
  // - Analytics
}