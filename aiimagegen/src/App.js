// import React from "react";
// import logo from './logo.svg';
// import './App.css';

// function App() {

//   const [data, setData] = React.useState(null);
  
//   React.useEffect(() => {
//     fetch("/api")
//       .then((res) => res.json())
//       .then((data) => setData(data.imageUrl));
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>{!data ? "Loading..." : data}</p>
//       </header>
//     </div>
//   );


//   // return (
//   //   <div className="App">
//   //     <header className="App-header">
//   //       <img src={logo} className="App-logo" alt="logo" />
//   //       <p>
//   //         Edit <code>src/App.js</code> and save to reload.
//   //       </p>
//   //       <a
//   //         className="App-link"
//   //         href="https://reactjs.org"
//   //         target="_blank"
//   //         rel="noopener noreferrer"
//   //       >
//   //         Learn React
//   //       </a>
//   //     </header>
//   //   </div>
//   // );
// }

// export default App;

// Works in Basic Aspects 
// import React, { useState } from 'react';
// import { Image } from 'react-native';
// function UserInput() {
//   const [inputValue, setInputValue] = useState('');
//   const [savedValue, setSavedValue] = useState('');

//   const [data, setData] = useState(null);

//   const handleChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleClick = () => {
//     setSavedValue(inputValue);
//     fetch("/api")
//        .then((res) => res.json())
//        .then((data) => setData(data.imageUrl));
//   };

//   return (
//     <div>
//       <input type="text" value={inputValue} onChange={handleChange} />
//       <button onClick={handleClick}>Save</button>
//       <p>Saved value: {data}</p>
//       <Image
//         source={{ uri: data }}
//         style={{ width: 512, height: 512 }}
//       />
//     </div>
//   );
// }

// export default UserInput;


import React, { useState } from 'react';
import {View, TextInput, Button, Image, StyleSheet, SafeAreaView, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9e6f2',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  promptText: {
    fontSize: 25,
    marginRight: 10,
  },
  ImageLoading: {
    fontSize: 30,
    alignItems: 'center',
    marginTop: 100,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: 512,
    height: 512,
    marginTop: 20,
    backgroundColor: '#d9e6f2',
  },
});

function App() {
  const [input, setInput] = useState('');
  // const [data, setData] = useState(null);
  const [otherData, setotherData] = useState('');
  const [urlOfImage, seturlOfImage] = useState('');
  const [loading, setloading] = useState(false);

  const handleChange = (text) => {
    setInput(text);
  };

  const handlePress = async () => {
    setloading(true);
    fetch(`/api?prompt=${input}`)
      .then((res) => res.json())
      .then((data) => {
        seturlOfImage(data.urlOfImage);
        setloading(false);
      })
    // try {
    //   const response = await fetch('/api', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ input }),
    //   });
    //   const data = await response.json();
    //   console.log(data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (


      <SafeAreaView style={[styles.container, {fexl: 1}]}>
        <Text style={styles.headerText}>AI Image Gen</Text>
        <View style={styles.innerContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.promptText}>Input Your Prompt:</Text>
            <TextInput
              value={input}
              onChangeText={handleChange}
              style={styles.input}
              placeholder="Enter text"
              placeholderTextColor="#a8b7c5"
            />
          </View>
          <Button
              title="                   Generate Image                   "
              onPress={handlePress}
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
            />
            {/* <Text style={styles.titleText} > {otherData} </Text> */}
            {loading ? (
              <Text style={styles.ImageLoading} >Loading ...</Text>
              //promptText
            ) : (
              <Image source={{ uri: urlOfImage }} style={styles.image} />
            )}
        </View>
      </SafeAreaView>
  );
}

export default App;
