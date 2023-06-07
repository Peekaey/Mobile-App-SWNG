import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View} from '../components/Themed';
import { SelectList } from 'react-native-dropdown-select-list';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';

const Chapters_Members = () => {
  const [selected, setSelected] = React.useState("");
  const [chapterNames, setChapterNames] = React.useState([]);
  const [memberNames, setMemberNames] = React.useState([]);

  React.useEffect(() => {
      async function fetchChapterNames() {
          try {
              const response = await fetch(
                  "https://www.swng.org.au/wp-json/swng-app/v1/chapterNames"
              );
              const data = await response.json();
              const names = Object.values(data);
              setChapterNames(names);
          } catch (error) {
              console.error(error);
          }
      }
      fetchChapterNames();
  }, []);

  React.useEffect(() => {
      async function fetchMemberNames() {
          try {
              if (selected) {
                  const response = await fetch(
                      `https://www.swng.org.au/wp-json/swng-app/v1/memberNames/${selected}`
                  );
                  const data = await response.json();
                  const names = Object.values(data).map((member) => member.name);
                  setMemberNames(names);
              } else {
                  setMemberNames([]);
              }
          } 
          catch (error) {
              console.error(error);
          }
      }
      fetchMemberNames();
  }, [selected]);

  const chapterData = chapterNames.slice(1).map((name, index) => ({
      key: index.toString(),
      value: name,
  }));

  const memberData = memberNames.map((name, index) => ({
      key: index.toString(),
      value: name,
  }));

  const handleSelectChapter = (selectedOption) => {
      const selectedChapterName = chapterData.find(
          (option) => option.key === selectedOption
      )?.value;
      setSelected(selectedChapterName);
  };

  const handleSelectMember = (selectedOption) => {
      const selectedMemberName = memberData.find(
          (option) => option.key === selectedOption
      )?.value;
  };

  return (
      <View style={styles.dropdown}>
          <View style={styles.chap_dropdown}>
            <Text style={styles.dropDownText}>Select the Chapter:</Text>
            <SelectList data={chapterData} setSelected={handleSelectChapter} />
          </View>
          <View style={styles.mem_dropdown}>
            <Text style={styles.dropDownText}>Select the Member:</Text>
            <SelectList data={memberData} setSelected={handleSelectMember} />
          </View>
      </View>
  );
};

// const for POST data 
const postReferral = async (username, org, email, phonenum, notes) => {

  const storedUserId = await SecureStore.getItemAsync('user_id');
  const end_point = 'https://www.swng.org.au/wp-json/swng-app/v1/rap';

  const data ={
    status_code: 200,
    status: 'success',
    message: 'Referral submitted'
  };
  if(storedUserId){
    data.user_id = storedUserId;
  }
  if(username){
    data.name = username;
  }
  if(org){
    data.organisation = org;
  }
  if(phonenum){
    data.phone = phonenum;
  }
  if(email){
    data.email = email;
  }
  if(notes){
    data.notes = notes;
  }
 
  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
  body: JSON.stringify(data),
  };

  const response = await fetch(end_point, options);
  const result = await response.json();
  const alertMess = `Status Code: ${result.status_code}\nStatus: ${result.status}\nMessage: ${result.message}`;
  alert(alertMess);
  return result;
};

export default function ReferralsPage() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [username, setUsername] = React.useState('');
  const [org, setorg] = React.useState('');
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

  const updateinfo = async () => {
    const result = await postReferral(username, org, email, phonenum, notes); //call postReferral function
    console.log(result);

    setIsUpdated(true);
    setUsername('');
    setorg('');
    setemail('');
    setphonenum('');
    setnotes('')
  };

return (
  <View style={styles.container}>
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }} automaticallyAdjustKeyboardInsets={true}>
    
      <Chapters_Members/>

      <View style={styles.centeredContainer}>
        <Text style={styles.textboxAnchorText}>Name(required):</Text>
        <TextInput placeholder="Enter Name" value={username} onChangeText={text => setUsername(text)} style={styles.input1}></TextInput>
      </View>

      <View style={styles.centeredContainer}>
        <Text style={styles.textboxAnchorText}>Business/Organisation:</Text>
        <TextInput placeholder=" Enter Business/Organisation" value={org} onChangeText={text => setorg(text)} style={styles.input1}></TextInput>
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
        style={[styles.button, { backgroundColor: buttonBackgroundColor }]} disabled={isAnyFieldEmpty} onPress={updateinfo}>
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
  dropDownText:{
    alignSelf: 'flex-start',
    marginBottom: '2%',
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
});
