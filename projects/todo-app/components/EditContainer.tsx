import { createHomeStyles } from '@/assets/styles/home.styles';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';


type EditContainerProps = {
  editText: string;
  setEditText: (text: string) => void;
  handleSaveEdit: () => void;
  handleCancelEdit: () => void;
};

const EditContainer = ({
  editText,
  setEditText,
  handleSaveEdit,
  handleCancelEdit,
}: EditContainerProps) => {
  const { colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  return (
    <View style={homeStyles.editContainer}>
      <TextInput
        style={homeStyles.editInput}
        value={editText}
        onChangeText={setEditText}
        autoFocus
        multiline
        placeholder='Edit your todo...'
        placeholderTextColor={colors.textMuted}
      />
      {/* save and cancel buttons */}
      <View style={homeStyles.editButton}>
        {/* save button */}
        <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
          <LinearGradient
            colors={colors.gradients.success}
            style={homeStyles.editButton}
          >
            <Ionicons name='checkmark' size={16} color='#fff' />
            <Text style={homeStyles.editButtonText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
        {/* cancel button */}
        <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
          <LinearGradient
            colors={colors.gradients.muted}
            style={homeStyles.editButton}
          >
            <Ionicons name='close' size={16} color='#fff' />
            <Text style={homeStyles.editButtonText}>Cancel</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default EditContainer;
