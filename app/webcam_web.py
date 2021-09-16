#from keras.preprocessing.image import img_to_array
import imutils
#import cv2
#from keras.models import load_model
import numpy as np
import time
import openpyxl
import datetime
import os

detection_model_path = 'app/lib/files/face.xml'
emotion_model_path = 'app/lib/files/trained.hdf5'
face_detection = cv2.CascadeClassifier(detection_model_path)
emotion_classifier = load_model(emotion_model_path, compile=False)
EMOTIONS = ["Enojo", "Felicidad", "Tristeza", "Sorpresa", "Neutral"]


def frames(frame):
    # ..............................................................
    label = 'No se reconoce'
    preds = list()
    if not frame.any():
        success = False
        pass
    success = True
    # Captura frame por frame
    frame = imutils.resize(frame, width=300)
    frame2 = cv2.cvtColor(frame, cv2.IMREAD_COLOR)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_detection.detectMultiScale(
        gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30), flags=cv2.CASCADE_SCALE_IMAGE)
    canvas = np.zeros((250, 300, 3), dtype="uint8")
    frameClone = frame.copy()

    if len(faces) > 0:
        faces = sorted(faces, reverse=True,
                       key=lambda x: (x[2] - x[0]) * (x[3] - x[1]))[0]
        (fX, fY, fW, fH) = faces
        roi = gray[fY:fY + fH, fX:fX + fW]
        roi = cv2.resize(roi, (64, 64))
        roi = roi.astype("float") / 255.0
        roi = img_to_array(roi)
        roi = np.expand_dims(roi, axis=0)

        # En preds están las probabildiades
        preds = emotion_classifier.predict(roi)[0]
        enojo = preds[0]
        asustado = preds[1]
        miedo = preds[2]
        felicidad = preds[3]
        tristeza = preds[4]
        sorpresa = preds[5]
        neutral = preds[6]

        vtotal = enojo+felicidad+tristeza+sorpresa+neutral+miedo+asustado
        enojo2 = (enojo+asustado)/vtotal
        felicidad2 = felicidad/vtotal
        tristeza2 = (tristeza+miedo)/vtotal
        sorpresa2 = sorpresa/vtotal
        neutral2 = neutral/vtotal
        preds2 = [enojo2, felicidad2, tristeza2, sorpresa2, neutral2]

        preds = np.asarray(preds2)  # Probabilidades
        emotion_probability = np.max(preds)
        label = EMOTIONS[preds.argmax()]
        #f = open ('emo.txt','w+')
        # f.write(label)
        # f.close()

        for (i, (emotion, prob)) in enumerate(zip(EMOTIONS, preds)):
            # construct the label text
            text = "{}: {:.2f}%".format(emotion, prob * 100)
            w = int(prob * 300)
            cv2.rectangle(canvas, (7, (i * 35) + 5),
                          (w, (i * 35) + 35), (0, 255, 0), -1)
            cv2.putText(canvas, text, (10, (i * 35) + 23),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9,
                        (255, 255, 255), 2)
            cv2.putText(frameClone, label, (fX, fY - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.45, (255, 0, 0), 2)
            cv2.rectangle(frameClone, (fX, fY), (fX + fW, fY + fH),
                          (255, 0, 0), 2)

    if not success:
        pass
    else:
        return frame, frameClone, label, preds
        # concatena cada frame y muestra el resultado = Al colocar frame es la imagen original y frameClone es con la emoción

def endframes():
    cv2.VideoCapture(-1)
    False
