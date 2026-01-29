import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SectionList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { TimelineEntry } from '../components';
import { DayData } from '../types';
import { COLORS } from '../constants';
import { formatDate } from '../utils';

interface TimelineScreenProps {
  history: DayData[];
}

// Health legend items
const LEGEND = [
  { label: 'Healthy', color: COLORS.healthy },
  { label: 'Warning', color: COLORS.warning },
  { label: 'Alert', color: COLORS.alert },
  { label: 'Constipated', color: COLORS.constipated },
];

export const TimelineScreen: React.FC<TimelineScreenProps> = ({ history }) => {
  // Transform history for SectionList
  const sections = history.map(day => ({
    title: formatDate(day.date),
    data: day.entries,
    date: day.date,
  }));

  return (
    <LinearGradient
      colors={[COLORS.bgPrimary, COLORS.bgSecondary, COLORS.bgTertiary]}
      style={styles.container}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 0.7, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Timeline</Text>
          <Text style={styles.subtitle}>
            Track your digestive health journey
          </Text>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          {LEGEND.map(item => (
            <View key={item.label} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <Text style={styles.legendLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Timeline */}
        {history.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📅</Text>
            <Text style={styles.emptyText}>No entries yet</Text>
            <Text style={styles.emptySubtext}>
              Your timeline will appear here
            </Text>
          </View>
        ) : (
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.entryWrapper}>
                <TimelineEntry entry={item} />
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
              </View>
            )}
            stickySectionHeadersEnabled={true}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -1,
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  sectionHeader: {
    backgroundColor: COLORS.bgSecondary,
    paddingVertical: 8,
    paddingTop: 16,
  },
  sectionTitle: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  entryWrapper: {
    marginTop: 10,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 18,
    fontWeight: '600',
  },
  emptySubtext: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginTop: 4,
  },
});
