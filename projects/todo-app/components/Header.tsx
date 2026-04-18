import { createHomeStyles } from '@/assets/styles/home.styles';
import useStats from '@/hooks/useStats';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';
import { View, Text } from 'react-native'
const Header = () => {
  const { colors } = useTheme();
  const { completedTodos, totalTodos, progressPercentage } = useStats();

  // styles
  const homeStyles = createHomeStyles(colors)
  

  
  return (
    <View style={homeStyles.header}>
      <View style={homeStyles.titleContainer}>
        {/* icon */}
        <LinearGradient
          colors={colors.gradients.primary}
          style={homeStyles.iconContainer}
        >
          <Ionicons name='flash-outline' size={28} color={colors.surface} />
        </LinearGradient>

        {/* task count */}
        <View style={homeStyles.titleTextContainer}>
          <Text style={homeStyles.title}>Today&apos;s Tasks 𖣠</Text>
          <Text style={homeStyles.subtitle}>
            {completedTodos} of {totalTodos} completed
          </Text> 
        </View>
      </View>

      {/* progress bar */}
      {
        totalTodos > 0 && (
          <View style={homeStyles.progressContainer}>
            <View style={homeStyles.progressBarContainer}>
              <View style={homeStyles.progressBar}>
            <LinearGradient
              colors={colors.gradients.success}
              style={[homeStyles.progressFill, { width: `${progressPercentage}%` }]}
                />
              </View>
              <Text style={homeStyles.progressText}>
                {Math.round(progressPercentage)}%
              </Text>
            </View>
          </View>
        )
      }
    </View>
  );
}
export default Header