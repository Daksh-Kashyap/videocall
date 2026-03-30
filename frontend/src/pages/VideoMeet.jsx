import { useState, useRef, useEffect } from "react";
import "../style/video.css";
import { TextField, Button } from "@mui/material";
import io from "socket.io-client";

const server_url = "http://localhost:8080";

var connections = {};

const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function VideoMeet() {
  const socketRef = useRef();
  let socketIdRef = useRef();

  let localVideoref = useRef();

  let [videoAvialable, setVideoAvailable] = useState(true);
  let [audioAvialable, setAudioAvailable] = useState(true);

  let [video, setVideo] = useState();
  let [audio, setAudio] = useState();
  let [screen, setScreen] = useState();
  let [showModal, setModal] = useState();
  let [screenAvailable, setScreenAvailable] = useState();
  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  let [newMessages, setNewMessages] = useState(0);
  let [askForUsername, setAskForUsername] = useState(true);
  let [username, setUsername] = useState("");

  const videoRef = useRef([]);

  let [videos, setVideos] = useState([]);

  //TODO
  // If(isChrome()===false){

  // }

  const getPermissons = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({
        video: "true",
      });
      if (videoPermission) {
        setVideoAvailable(true);
      } else {
        setVideoAvailable(false);
      }

      const audioPermission = await navigator.mediaDevices.getUserMedia({
        audio: "true",
      });
      if (audioPermission) {
        setAudioAvailable(true);
      } else {
        setAudioAvailable(false);
      }

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }

      if (videoAvialable || audioAvialable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvialable,
          audio: audioAvialable,
        });

        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoref.current) {
            localVideoref.current.srcObject = userMediaStream;
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    (async () => {
      await getPermissons();
    })();
  }, []);

  let getUSerMediaSucess = (stream) => {};

  let getUserMedia = () => {
    if ((video && videoAvialable) || (audio && audioAvialable)) {
      navigator.mediaDevices
        .getUserMedia({ video: video, audio: audio })
        .then(getUSerMediaSucess)
        .then((stream) => {})
        .catch((e) => console.log(e));
    } else {
      try {
        let tracks = localVideoref.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {}
    }
  };

  useEffect(() => {
    if (video !== undefined && audio !== undefined) {
      getUserMedia();
    }
  }, [audio, video]);

  let connectToSocketServer = () => {
    socketRef.current = io.connect(server_url, { secure: false });
    socketRef.current.on('signal', gotMessageFromServer)
  };

  let getMedia = () => {
    setVideo(videoAvialable);
    setAudio(audioAvialable);
    connectToSocketServer();
  };

  return (
    <div>
      {askForUsername === true ? (
        <div>
          <h2>Enter into Lobby</h2>
          <TextField
            id="outlined-basic"
            label="Outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button variant="contained">Connect</Button>

          <div>
            <video ref={localVideoref} autoPlay muted></video>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
