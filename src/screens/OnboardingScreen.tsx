import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants';
import { BristolIcon } from '../components/BristolIcons';
import { PrimaryButton } from '../components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    title: 'Welcome to Flushy',
    subtitle: 'Your personal gut health companion',
    description: 'Track your bowel movements quickly and privately. All data stays on your device.',
    useImage: true,
  },
  {
    title: 'Bristol Stool Chart',
    subtitle: '7 types, science-backed',
    description: 'Log using the Bristol Stool Scale — a medical tool used by doctors worldwide to classify stool consistency.',
    useBristol: true,
  },
  {
    title: 'Discover Patterns',
    subtitle: 'Insights that matter',
    description: 'Track colors, tags, and see how diet and habits affect your gut. Your Gut Score shows overall health at a glance.',
    useStats: true,
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const goToSlide = (index: number) => {
    Animated.timing(slideAnim, {
      toValue: -index * SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentSlide(index);
    });
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.bgPrimary, COLORS.bgSecondary, COLORS.bgTertiary]}
      style={styles.container}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 0.7, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Skip button */}
        {currentSlide < slides.length - 1 && (
          <TouchableOpacity style={styles.skipButton} onPress={onComplete}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}

        {/* Slides */}
        <View style={styles.slidesContainer}>
          <Animated.View
            style={[
              styles.slidesWrapper,
              { transform: [{ translateX: slideAnim }] },
            ]}
          >
            {slides.map((slide, index) => (
              <View key={index} style={styles.slide}>
                {/* Visual */}
                <View style={styles.visual}>
                  {slide.useImage && (
                    <Image
                      source={require('../../assets/flushy-emoji.png')}
                      style={styles.heroImage}
                    />
                  )}
                  {slide.useBristol && (
                    <View style={styles.bristolPreview}>
                      {[3, 4, 5].map((type) => (
                        <View key={type} style={styles.bristolItem}>
                          <BristolIcon type={type} size={40} color={
                            type === 4 ? COLORS.healthy : COLORS.warning
                          } />
                          <Text style={styles.bristolLabel}>Type {type}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                  {slide.useStats && (
                    <View style={styles.statsPreview}>
                      <View style={styles.previewCard}>
                        <Text style={styles.previewLabel}>Gut Score</Text>
                        <Text style={[styles.previewValue, { color: COLORS.healthy }]}>85</Text>
                      </View>
                      <View style={styles.previewCard}>
                        <Text style={styles.previewLabel}>Streak</Text>
                        <Text style={[styles.previewValue, { color: COLORS.healthy }]}>7</Text>
                      </View>
                    </View>
                  )}
                </View>

                {/* Text */}
                <View style={styles.textContent}>
                  <Text style={styles.slideTitle}>{slide.title}</Text>
                  <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
                  <Text style={styles.slideDescription}>{slide.description}</Text>
                </View>
              </View>
            ))}
          </Animated.View>
        </View>

        {/* Dots */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentSlide === index && styles.dotActive,
              ]}
            />
          ))}
        </View>

        {/* Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={currentSlide === slides.length - 1 ? "Let's Go!" : 'Next'}
            onPress={handleNext}
            variant="primary"
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 10,
    padding: 8,
  },
  skipText: {
    color: COLORS.textMuted,
    fontSize: 15,
    fontWeight: '500',
  },
  slidesContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  slidesWrapper: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * slides.length,
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  visual: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heroImage: {
    width: 120,
    height: 120,
  },
  bristolPreview: {
    flexDirection: 'row',
    gap: 24,
  },
  bristolItem: {
    alignItems: 'center',
    gap: 8,
  },
  bristolLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  statsPreview: {
    flexDirection: 'row',
    gap: 16,
  },
  previewCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    paddingHorizontal: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  previewLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  previewValue: {
    fontSize: 36,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: -1,
  },
  textContent: {
    alignItems: 'center',
  },
  slideTitle: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  slideSubtitle: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
  slideDescription: {
    color: COLORS.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 12,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.surface,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
  buttonContainer: {
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
});
