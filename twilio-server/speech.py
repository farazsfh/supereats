import azure.cognitiveservices.speech as speechsdk
import time

# Creates an instance of a speech config with specified subscription key and service region.
# Replace with your own subscription key and region identifier from here: https://aka.ms/speech/sdkregion
speech_key, service_region = "5ae9c73c763c441082b0527d77a37fc3", "eastus"
speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)

# Creates an audio configuration that points to an audio file.
# Replace with your own audio filename.
audio_filename = "audio.wav"
audio_input = speechsdk.audio.AudioConfig(filename=audio_filename)

# Creates a recognizer with the given settings
speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_input)

# print("Recognizing first result...")

done = False

def stop_cb(evt):
    """callback that stops continuous recognition upon receiving an event `evt`"""
    # print('CLOSING on {}'.format(evt))
    speech_recognizer.stop_continuous_recognition()
    global done
    done = True

all_results = []
def handle_final_result(evt):
    all_results.append(evt.result.text.lower()[:-1])

speech_recognizer.recognized.connect(handle_final_result)
# Connect callbacks to the events fired by the speech recognizer
# speech_recognizer.recognizing.connect(lambda evt: print('RECOGNIZING: {}'.format(evt)))
# speech_recognizer.recognized.connect(lambda evt: print('RECOGNIZED: {}'.format(evt)))
# speech_recognizer.session_started.connect(lambda evt: print('SESSION STARTED: {}'.format(evt)))
# speech_recognizer.session_stopped.connect(lambda evt: print('SESSION STOPPED {}'.format(evt)))
# speech_recognizer.canceled.connect(lambda evt: print('CANCELED {}'.format(evt)))
# stop continuous recognition on either session stopped or canceled events
speech_recognizer.session_stopped.connect(stop_cb)
speech_recognizer.canceled.connect(stop_cb)

# Start continuous speech recognition
speech_recognizer.start_continuous_recognition()
while not done:
    time.sleep(.5)

# print("Printing all results:")
print(" ".join(all_results))