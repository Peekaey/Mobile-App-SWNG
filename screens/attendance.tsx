import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { Text } from '../components/Themed';

export default function AttendancePage() {
  const [attendance, setAttendance] = useState<boolean[]>([]);

  const handleAttendance = (index: number) => {
    const updatedAttendance: boolean[] = [...attendance];
    updatedAttendance[index] = !updatedAttendance[index];
    setAttendance(updatedAttendance);
  };

  const handleSubmit = () => {
    // Code to submit attendance data to the database
    // You can use the 'attendance' state variable to get the updated attendance data
  };

  const names = ['John', 'Sarah', 'Michael', 'Emily']; // Replace with your list of names

  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Attendance List </Text>
      {names.map((name, index) => (
        <View key={index} style={styles.row}>
          <Text style={[styles.name, attendance[index] && styles.absent]}>{name}</Text>
          <TouchableOpacity style={styles.checkbox} onPress={() => handleAttendance(index)}>
            {attendance[index] && <View style={styles.checked} />}
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },

  title: {
    fontSize: 31,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  separator: {
    marginVertical: 20,
    height: 1,
    width: '50%',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  name: {
    flex: 1,
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 10,
  },
  absent: {
    color: 'red',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 10,
    height: 10,
    backgroundColor: '#c11717',
  },
  button: {
    backgroundColor: '#c11717',
    width: '50%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
