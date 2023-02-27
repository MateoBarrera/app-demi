"""Webcam file

This module includes the image preprocessing and classification tools with Keras.
Webcam frames and endframes methods are called from scrip.evaluation in HTTP requests for DEMI. 
 
Returns:
    web cam files: frame, frame clone, predictions

@Author: Mateo Barrera
@Date: 12-07-2022 
"""

import imutils  # pylint: disable=import-error
import cv2  # pylint: disable=import-error
from keras.models import load_model  # pylint: disable=import-error
from keras.preprocessing.image import img_to_array  # pylint: disable=import-error
import numpy as np  # pylint: disable=import-error

detection_model_path = 'app/lib/files/face.xml'
emotion_model_path = 'app/lib/files/trained.hdf5'
face_detection = cv2.CascadeClassifier(detection_model_path)
emotion_classifier = load_model(emotion_model_path, compile=False)
emotions = ['Enojo', 'Felicidad', 'Tristeza', 'Sorpresa', 'Neutral']


def frames(frame):
    """_summary_

    Args:
        frame (_type_): _description_

    Returns:
        _type_: _description_
    """
    label = 'No se reconoce'
    preds = list()
    success = True
    if not frame.any():
        success = False
    # Captura frame por frame
    frame = imutils.resize(frame, width=300)
    # frame2 = cv2.cvtColor(frame, cv2.IMREAD_COLOR)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_detection.detectMultiScale(
        gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30), flags=cv2.CASCADE_SCALE_IMAGE)
    canvas = np.zeros((250, 300, 3), dtype="uint8")
    frame_clone = frame.copy()

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
        # emotion_probability = np.max(preds)
        label = emotions[preds.argmax()]
        # f = open ('emo.txt','w+')
        # f.write(label)
        # f.close()

        for (i, (emotion, prob)) in enumerate(zip(emotions, preds)):
            # construct the label text
            text = "{}: {:.2f}%".format(emotion, prob * 100)
            w = int(prob * 300)
            cv2.rectangle(canvas, (7, (i * 35) + 5),
                          (w, (i * 35) + 35), (0, 255, 0), -1)
            cv2.putText(canvas, text, (10, (i * 35) + 23),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9,
                        (255, 255, 255), 2)
            cv2.putText(frame_clone, label, (fX, fY - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.45, (255, 0, 0), 2)
            cv2.rectangle(frame_clone, (fX, fY), (fX + fW, fY + fH),
                          (255, 0, 0), 2)

    if not success:
        pass
    else:
        return frame, frame_clone, label, preds
        # concatena cada frame y muestra el resultado = Al colocar frame es la imagen original y frame_clone es con la emoción


def endframes():
    """_summary_
    """
    cv2.VideoCapture(-1)
    # alse
