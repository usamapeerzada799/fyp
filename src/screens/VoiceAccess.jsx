import React, { useState, useRef, useEffect } from 'react';

const VoiceAccess = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioStreamRef = useRef(null);

  useEffect(() => {
    const loadFFmpeg = async () => {
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
        setIsReady(true);
      }
    };
    loadFFmpeg();
  }, []);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioStreamRef.current = stream;
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };
    mediaRecorderRef.current.onstop = convertToMp3;
    audioChunksRef.current = [];
    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    audioStreamRef.current.getTracks().forEach(track => track.stop());
    setIsRecording(false);
  };

  const convertToMp3 = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
    const audioFile = new File([audioBlob], 'recording.wav');
    ffmpeg.FS('writeFile', 'recording.wav', await fetchFile(audioFile));
    await ffmpeg.run('-i', 'recording.wav', 'output.mp3');
    const data = ffmpeg.FS('readFile', 'output.mp3');
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mp3' }));
    setAudioUrl(url);
  };

  return (
    <div>
      <h1>Audio Recorder</h1>
      {isReady ? (
        <div>
          <button onClick={isRecording ? stopRecording : startRecording}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
          {audioUrl && (
            <div>
              <audio controls src={audioUrl} />
              <a href={audioUrl} download="recording.mp3">Download MP3</a>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default VoiceAccess;