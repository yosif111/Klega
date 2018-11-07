import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import baseURL from '../config';
import SoundPlayer from 'react-native-sound-player'
import { Button } from 'react-native-elements';



export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showLoadingAlert: false,
      showIsKlegaAlert: false,
      showNotKlegaAlert: false,
      showInfoAlert: false,
    };
  }

  componentDidMount() {

    SoundPlayer.onFinishedPlaying((success) => { // success is true when the sound is played
      console.log('finished playing', success)
    })
  }

  componentWillUnmount() {
    SoundPlayer.unmount()
  }

  sendRequest = (image) => {

    const instance = axios.create({
      timeout: 5000
    });
    instance.post(`${baseURL}/postImage/`, {
      userUUID: 'TESTINGtodayyy',
      base64: image.base64
    })
      .then((response) => {
        console.log("string size", (image.base64).length);
        console.log(response.data[0]);

        if (response.data[0] == 1) {
          // try {
          //   SoundPlayer.playSoundFile('../snapchatDing', 'mp3')
          // } catch (e) {
          //   console.log(`cannot play the sound file`, e)
          // }

          this.setState({ showLoadingAlert: false, showIsKlegaAlert: true })

        }
        else {
          this.setState({ showLoadingAlert: false })

          alert('not klega')




        }
        this.resumeCameraPreview();
      })
      .catch((error) => {
        console.log(error);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        this.toggleLoadingAlert();
        this.resumeCameraPreview();
        //this.isNotKlegaAlert();
      });


  }


  renderLoadingAlert = () => {
    if (this.state.showLoadingAlert)
      return (
        <View style={styles.loadingBackground}>
          <View style={styles.cardStyle}>
            <Image style={styles.cardEmojiStyle} source={require('../assets/thinking.png')} />
            <Image style={styles.gifStyle} source={require('../assets/eating_klega_loop.gif')} />
          </View>
        </View>
      )
  }

  renderIsKlegaAlert = () => {
    return (
      <AwesomeAlert
        show={this.state.showIsKlegaAlert}
        title="😍"
        message="وش هالكليجا الزينة😉 "
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={false}
        showConfirmButton={false}
        contentContainerStyle={{ borderRadius: 20 }}
        titleStyle={{ fontSize: 80, marginTop: -70 }}
        messageStyle={{ fontSize: 30 }}
      />)
  }


  toggleLoadingAlert = () => {
    this.setState({ showLoadingAlert: !this.state.showLoadingAlert });
  }

  toggleIsKlegaAlert = () => {
    this.setState({ showIsKlegaAlert: !this.state.showLoadingAlert });
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoView}>
          <TouchableOpacity onPress={() => this.setState({showInfoAlert: true})}>
            <Image style={styles.infoImage} source={require('./../assets/info.png')} />
            
          </TouchableOpacity>
        </View>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          autoFocus={'on'}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
        />

        <View style={styles.capture}>
          <TouchableOpacity
            onPress={() => this.takePicture()}
          //style = {styles.capture}
          >
            <Text style={{ fontSize: 22 }}> صّور </Text>
          </TouchableOpacity>
        </View>


        {this.renderLoadingAlert()}
        {this.renderIsKlegaAlert()}
        {this.showInfo()}


      </View>

    );
  }

  pauseCameraPreview = async () => {
    await this.camera.pausePreview()
  }

  resumeCameraPreview = async () => {
    await this.camera.resumePreview()
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.7, base64: true, doNotSave: true };
      this.toggleLoadingAlert()
      this.pauseCameraPreview();
      const data = await this.camera.takePictureAsync(options)
      this.sendRequest(data);
    }
  };

  showInfo = () => {
    return (
      <AwesomeAlert
        show={this.state.showInfoAlert}
        title="لماذا؟"
        message={"تم تطوير هذا التطبيق بعد النظر للغش والإحتيال الذي يحدث باسم الكليجا.\n\nفتم تطوير هذا التطبيق للحفاظ على الكنز القصمنجي.\n\nتم التطوير من قبل باسل العبدي ويوسف الخليفة (القصمان)"}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={false}
        showConfirmButton={false}
        contentContainerStyle={{ borderRadius: 20 }}
        titleStyle={{ fontSize: 30 }}
        messageStyle={{ fontSize: 16, textAlign: 'right' }}
      />)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    backgroundColor: 'white',
    borderRadius: 5,
    alignSelf: 'center',
    position: 'absolute',
    top: '90%',
    right: '40%',
    bottom: '5%',
    left: '40%',
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingBackground: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: 'rgba(52,52,52,0.5)',
  },
  cardStyle: {
    flex: 1,
    height: 170,
    width: 170,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    position: 'absolute',
  },
  gifStyle: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    position: 'absolute',
  },
  cardEmojiStyle: {
    marginTop: -190,
    width: 50,
    height: 50,
  },
  infoView: {
    position: 'absolute',
    right: '7%',
    top: '5%',
    zIndex: 2
  },
  infoImage: {
    height: 40,
    width: 40,
  }
});
