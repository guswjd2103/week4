from flask import Flask, render_template, Response, request
from werkzeug.utils import secure_filename
import os
import img_face
import cv2
from werkzeug.datastructures import ImmutableMultiDict

UPLOAD_FOLDER = 'uploaded_files'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
if not os.path.exists(UPLOAD_FOLDER): os.makedirs(UPLOAD_FOLDER)

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/hi', methods=['GET'])
def index():
    print("hello")
    return "hihi"


# Image file 받아옴
@app.route('/uploadImage', methods=['POST'])
def upload_image():
    f = request.files['img']
    fname = f.filename
    f.save("./originImage/" + secure_filename(fname))       # 파일 저장


    face_recog = img_face.FaceRecog(fname)
    print(face_recog.known_face_names)
    frame = face_recog.get_frame()
    cv2.imwrite('./mosaicImage' + fname, frame)

    print(request.files)
    return "hi"



if __name__ == '__main__':
    app.run(app.run(host='0.0.0.0', port=80, debug=True))
    # host='127.0.0.1', port=6380, debug=True