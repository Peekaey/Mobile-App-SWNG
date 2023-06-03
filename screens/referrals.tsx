import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  Image, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, View} from '../components/Themed';
import { SelectList } from 'react-native-dropdown-select-list';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';



const Chapters = () => {

  const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'Chapter1'},
      {key:'2', value:'Chapter2'},
      {key:'3', value:'Chapter3'}
  ];
  return(
    <View>
      <Text style={styles.dropDownText}> Select the Chapter:</Text>
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
      <Text style={styles.dropDownText}> Select the Member:</Text>
      <SelectList data={data} setSelected={setSelected} />
    </View>
  );
};

export default function ReferralsPage() {

  const [username, setUsername] = React.useState('');
  const [email, setemail] = React.useState('');
  const[checkValidEmail, setCheckValidEmail] = React.useState(false);
  const [phonenum, setphonenum] = React.useState('');
  const[checkValidPhoneNum, setcheckValidPhoneNum] = React.useState(false);
  const [notes, setnotes] = React.useState('');

  const isAnyFieldEmpty = !username || checkValidPhoneNum || checkValidEmail || !notes;
  const buttonBackgroundColor = isAnyFieldEmpty ? '#c11717' : '#ed3434';
  const isPhoneEmpty = phonenum;

  const handleCheckEmail = text => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setemail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const handleCheckPhoneNum = Value => {
    let regex1 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setphonenum(Value);
    if (regex1.test(Value)) {
      setcheckValidPhoneNum(false);
    } else {
      setcheckValidPhoneNum(true);
    }
  };

  const handleBlur = () => {
    if(phonenum.length==0){
    setcheckValidPhoneNum("");
    }
  };

return (
  <View style={styles.container}>
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }} automaticallyAdjustKeyboardInsets={true}>
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
        <TextInput placeholder="Enter Name" value={username} onChangeText={text => setUsername(text)} style={styles.input1}></TextInput>
      </View>

      <View style={styles.centeredContainer}>
        <Text style={styles.textboxAnchorText}>Business/Organisation:</Text>
        <TextInput placeholder=" Enter Business/Organisation" style={styles.input1}></TextInput>
      </View>

      <View style={styles.centeredContainer}>
        <Text style={styles.textboxAnchorText}>Phone:</Text>
        <TextInput placeholder="0000000000" value={phonenum} onChangeText={text => handleCheckPhoneNum(text)} onBlur={handleBlur} style={styles.input1}></TextInput>
      </View>
      <View style={styles.errorContainer}>
        {checkValidPhoneNum ? (
          <Text style={styles.errorMessage}>Please enter a valid Phone number</Text>
        ) : (
          <Text style={styles.errorMessage}> </Text>
        )}
      </View>

      <View style={styles.centeredContainer}>
        <Text style={styles.textboxAnchorText}>Email(required):</Text>
        <TextInput placeholder="someone@example.com" value={email} onChangeText={text => handleCheckEmail(text)} style={styles.input1}></TextInput>
      </View>
      <View style={styles.errorContainer}>
        {checkValidEmail ? (
          <Text style={styles.errorMessage}>Please enter a valid email address</Text>
        ) : (
          <Text style={styles.errorMessage}> </Text>
        )}
      </View>

      <View style={styles.centeredContainer}>
        <Text style={styles.textboxAnchorText}>Notes(required):</Text>
        <TextInput placeholder=" " value={notes} onChangeText={text => setnotes(text)} style={styles.input1}></TextInput>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonBackgroundColor }]}
        disabled={isAnyFieldEmpty}>
        <Text style={styles.buttonText}>Submit Referral</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  centeredContainer: {
    alignItems: 'center',
    top: 110,
  },
  dropdown:{
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: '2%',
    backgroundColor: "white",
    position: "absolute",
    top: 30,
    width: "100%",
    zIndex: 1,
   },
   chap_dropdown:{
    padding:5,
    width: "45%",
   },
  mem_dropdown:{
    padding:5,
    width: "45%",
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
    marginVertical: 3,
    height: 1,
    width: '100%',
    top:15,
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
    top: 110,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  errorContainer: {
    top: 90,
    marginLeft:40,
  },
  errorMessage: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 13,
    position:'absolute',
  },
  dropDownText:{
    alignSelf: 'flex-start',
    marginBottom: '2%',
  },
});