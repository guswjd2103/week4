import face_recognition
import cv2
# import camera
import os
import numpy as np

class FaceRecog():
    # def __init__(self):
    def __init__(self, fname):
        self.known_face_encodings = []
        self.known_face_names = []
        self.fname = fname

        # knowns 학습
        dirname = 'knowns'
        files = os.listdir(dirname)
        for filename in files:
            name, ext = os.path.splitext(filename)   # 파일 이름 == 사람 이름
            if ext == '.jpg':
                self.known_face_names.append(name)
                pathname = os.path.join(dirname, filename)
                img = face_recognition.load_image_file(pathname)     # knowns 사진에서
                face_encoding = face_recognition.face_encodings(img)[0]    # 얼굴 영역 알아냄, 68개 얼굴 특징 위치 분석(face landmarks)
                self.known_face_encodings.append(face_encoding)

        # Initialize some variables
        self.face_locations = []
        self.face_encodings = []
        self.face_names = []
        self.process_this_frame = True


    def get_frame(self):
        # frame 을 그냥 이미지 넣기
        # frame = self.camera.get_frame()
        # frame = cv2.imread('../redvel.jpg')
        frame = cv2.imread("./originImage/" + self.fname)

        # Resize frame of video to 1/4 size for faster face recognition processing 사이즈 줄임(계산량 줄임)
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]

        # Only process every other frame of video to save time
        if self.process_this_frame:
            # Find all the faces and face encodings in the current frame of video
            self.face_locations = face_recognition.face_locations(rgb_small_frame)   # 읽은 frame 에서 얼굴 영역
            self.face_encodings = face_recognition.face_encodings(rgb_small_frame, self.face_locations) # 특징 추출

            self.face_names = []
            for face_encoding in self.face_encodings:
                # See if the face is a match for the known face(s)
                # frame 에서 추출한 얼굴 특징과  knowns에 있던 사진 얼굴 특징  비교 - distance로 환산(작을 수록 가까움)
                distances = face_recognition.face_distance(self.known_face_encodings, face_encoding)
                min_value = min(distances)

                # tolerance: How much distance between faces to consider it a match. Lower is more strict.
                # 0.6 is typical best performance. 0.6 이상이면 다른 사람
                name = "Unknown"
                if min_value < 0.6:
                    index = np.argmin(distances)
                    name = self.known_face_names[index]
                    print(min_value)

                self.face_names.append(name)

        self.process_this_frame = not self.process_this_frame

        # Display the results
        for (top, right, bottom, left), name in zip(self.face_locations, self.face_names):
            # Scale back up face locations since the frame we detected in was scaled to 1/4 size
            top *= 4
            right *= 4
            bottom *= 4
            left *= 4
            print(top, right,bottom,left)
            # unknown 이면 모자이크
            if name == "Unknown":
                try:
                    mosaic_img = frame[left:bottom, left:right]         # 이미지 자르고
                    print("r-l "+str((right-left) // 30))
                    print("b-t "+str((bottom-top) // 30))

                    mosaic_img = cv2.resize(mosaic_img, ((right-left) // 30, (bottom-top) // 30))       # 지정 배율로 확대/축소
                    mosaic_img = cv2.resize(mosaic_img, (right-left, bottom-top), interpolation=cv2.INTER_AREA)     # 원래 크기로 resize
                    frame[top:bottom, left:right] = mosaic_img          # 원래 이미지에 붙이기
                except Exception as e:
                    print(str(e))

            else:
                # Draw a box around the face
                cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

            # Draw a label with a name below the face
            cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

        return frame

    def get_jpg_bytes(self):
        frame = self.get_frame()
        # We are using Motion JPEG, but OpenCV defaults to capture raw images,
        # so we must encode it into JPEG in order to correctly display the
        # video stream.
        ret, jpg = cv2.imencode('.jpg', frame)
        return jpg.tobytes()


# if __name__ == '__main__':
#     face_recog = FaceRecog()
#     print(face_recog.known_face_names)
#
#     frame = face_recog.get_frame()
#     cv2.imshow("Frame", frame)  # 이미지 출력
#
#     # cv2.imwrite("./mosaicImage/a.jpg", frame)
#     cv2.imwrite('./mosaicImage'+ self.fname, frame)
#
#
#
#     cv2.waitKey(0)
#     cv2.destroyAllWindows()
#     cv2.waitKey()
