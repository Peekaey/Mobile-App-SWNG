
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, View} from '../components/Themed';
import { SelectList } from 'react-native-dropdown-select-list';
import React from 'react';

const Chapters = () => {

  const [selected, setSelected] = React.useState("");
  
  const data = [
    {key:'1', value:'Camden'},
    {key:'2', value:'Campbelltown'},
    {key:'3', value:'Liverpool'},
    {key:'4', value:'Narellan'}
];
  return(
    <View>
      <Text style={styles.textboxAnchorText}> Select the Chapter:</Text>
      <SelectList data={data} setSelected={setSelected} />
    </View>
  );
};

const Members = () => {

  const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Member1'},
      {key:'2', value:'Member2'},
      {key:'3', value:'Member3'}
  ];
  return(
    <View>
      <Text style={styles.textboxAnchorText}> Select the Member:</Text>
      <SelectList data={data} setSelected={setSelected} />
    </View>
  );
};

export default function ReferralsPage() {

  return (
    <View style={styles.container}>
      <View style = {styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.dropdown}>
        <View style={styles.chap_dropdown}>
          <Chapters/>
        </View>
        <View style={styles.mem_dropdown}>
         <Members/>
        </View>
      </View>
      
      <View style={styles.centeredContainer}>
      <Text style={styles.textboxAnchorText}>Name(required):</Text>
      <TextInput placeholder="name" style={styles.input1}></TextInput>
      </View>
      
      <View style={styles.centeredContainer}>
      <Text style={styles.textboxAnchorText}>Business/Organisation:</Text>
      <TextInput placeholder="Business/Organisation" style={styles.input1}></TextInput>
      </View>

      <View style={styles.centeredContainer}>
      <Text style={styles.textboxAnchorText}>Phone:</Text>
      <TextInput placeholder="00 0000 0000" style={styles.input1}></TextInput>
      </View>

      <View style={styles.centeredContainer}>
      <Text style={styles.textboxAnchorText}>Email(required):</Text>
      <TextInput placeholder="someone@example.com" style={styles.input1}></TextInput>
      </View>

      <View style={styles.centeredContainer}>
      <Text style={styles.textboxAnchorText}>Notes(required):</Text>
      <TextInput placeholder=" " style={styles.input1}></TextInput>
      </View>

      <TouchableOpacity style={styles.button} >
      <Text style={styles.buttonText} >Submit Referral</Text>
      </TouchableOpacity>
    </View>     

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    alignItems: 'center',
    top: 100,
  },
  dropdown:{
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: '4%',
    marginBottom: '2%',
    backgroundColor: "white",
    position: "absolute",
    top: 20,
    width: "100%",
    zIndex: 999,
   },
   chap_dropdown:{
    padding:5,
   },
  mem_dropdown:{
    padding:5,
   },
  textboxAnchorText: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
  },
  input: {
    width: '50%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 30,
    alignItems: 'center',
    textAlign: 'center',
  },
  image: {
    marginLeft: '8%',
    resizeMode: 'contain',
    height: '20%',
    width: '20%',
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '50%',
  },
  input1: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#c11717',
    width: '30%',
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '10%',
    top: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});