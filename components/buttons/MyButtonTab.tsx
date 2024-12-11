import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { View } from "react-native";



interface Props extends BottomTabBarButtonProps {
  title: string;
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;

}

export default function MyButtonTab({ title, iconName, onPress, accessibilityState }: Props) {

  const isFocused = accessibilityState?.selected;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.button}
      >
        <View style={styles.grupo}>
          <MaterialCommunityIcons name={iconName} size={isFocused ? 30 : 24} color={isFocused ? "#fff" : "#B0BEC5"} />
          <Text style={isFocused ? styles.textFocused : styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor:"#6200EE"
  },
  focusedButton: {
    backgroundColor: '#fff', // Un tono más oscuro cuando está en foco
  },
  text: {
    color: '#B0BEC5',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textFocused: {
    color: "#fff",
    fontWeight:"bold"
  },
  grupo: {
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
  }
});

