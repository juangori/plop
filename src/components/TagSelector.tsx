import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { QuickTag } from '../types';
import { COLORS } from '../constants';

interface TagSelectorProps {
  tags: QuickTag[];
  selectedTags: string[];
  onToggle: (tagId: string) => void;
}

export const TagSelector: React.FC<TagSelectorProps> = ({
  tags,
  selectedTags,
  onToggle,
}) => {
  const handleToggle = async (tagId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle(tagId);
  };

  return (
    <View style={styles.container}>
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag.id);
        
        return (
          <TouchableOpacity
            key={tag.id}
            style={[
              styles.tagButton,
              isSelected && styles.tagButtonSelected,
            ]}
            onPress={() => handleToggle(tag.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.emoji}>{tag.emoji}</Text>
            <Text style={styles.label}>{tag.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceHover,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tagButtonSelected: {
    backgroundColor: 'rgba(139, 92, 246, 0.25)',
    borderColor: COLORS.primary,
  },
  emoji: {
    fontSize: 16,
  },
  label: {
    color: COLORS.textPrimary,
    fontSize: 14,
  },
});
