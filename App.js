import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    plainText: "",
    key: "",
    cipherText: ""
  };

  handlePlainText = event => {
    this.setState({ plainText: event.target.value });
  };

  handleKey = event => {
    this.setState({ key: event.target.value });
  };

  handleEncryption = () => {
    let plainText = this.state.plainText.toLowerCase();
    let key = this.state.key;
    let keyLength = key.length;
    plainText = this.removeSpaces(plainText);
    let encryptedMessage = this.handleInitialLetters(keyLength, plainText);
    plainText = plainText.replace(plainText.substring(0, keyLength), "");
    this.addRemainingLetters(encryptedMessage, plainText, keyLength);
    this.encryptMessage(encryptedMessage, key);
  };

  encryptMessage = (encryptedMessage, key) => {
    const keyArray = this.sortKey(key);
    let cipherText = "";
    for (let i = 0; i < keyArray.length; i++) {
      const index = key.indexOf(keyArray[i]);
      key = key.replace(key.substring(index, index + 1), "");
      const message = encryptedMessage[index];
      encryptedMessage.splice(index, 1);
      cipherText += this.encrypt(message);
    }
    this.setState({ cipherText });
  };

  encrypt = message => {
    let cipherText = "";
    message.map(character => (cipherText += character));
    return cipherText;
  };

  handleInitialLetters = (keyLength, plainText) => {
    let encryptedMessage = [];
    for (let i = 0; i < keyLength; i++) {
      let message = [];
      message.push(plainText.charAt(i));
      encryptedMessage.push(message);
    }
    return encryptedMessage;
  };

  sortKey = key => {
    let array = [];
    for (let i = 0; i < key.length; i++) {
      array.push(key.charAt(i));
    }
    return array.sort();
  };

  addRemainingLetters = (encryptedMessage, plainText, keyLength) => {
    let j = 0;
    for (let i = 0; i < plainText.length; i++) {
      let array = encryptedMessage[j];
      array.push(plainText.charAt(i));
      j++;
      if (j === keyLength) {
        j = 0;
      }
    }
  };

  removeSpaces = text => {
    let plainText = "";
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) !== " ") {
        plainText += text.charAt(i);
      }
    }
    return plainText;
  };

  render() {
    return (
      <div className="App">
        <h1>Columnar Transposition Cipher</h1>
        <label>Plain Text</label>
        <br />
        <textarea
          rows="5"
          cols="50"
          placeholder="Plain Text"
          onChange={this.handlePlainText}
        ></textarea>
        <br />
        <br />
        <label>Key</label>
        <br />
        <input type="text" placeholder="key" onChange={this.handleKey} />
        <br />
        <br />
        {/* <h1>Ciphered Text: {this.state.cipherText}</h1> */}
        <button onClick={this.handleEncryption}>Encrypt</button>
        <button>Decrypt</button>
        <h3>{this.state.cipherText !== "" ? this.state.cipherText : null}</h3>
      </div>
    );
  }
}

export default App;
