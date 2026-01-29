import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  unit,
  color = COLORS.textPrimary 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueRow}>
        <Text style={[styles.value, { color }]}>{value}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  label: {
    color: COLORS.textMuted,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -1,
  },
  unit: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginLeft: 4,
  },
});
