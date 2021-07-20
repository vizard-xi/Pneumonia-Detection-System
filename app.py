import io

# Imports for image procesing
from PIL import Image
from flask import Flask, request, jsonify, render_template

from flask_cors import cross_origin, CORS
# Imports for prediction
from predict import initialize, predict_image

# Imports for the REST API

app = Flask(__name__)
cors = CORS(app)
# 4MB Max image size limit
app.config['MAX_CONTENT_LENGTH'] = 4 * 1024 * 1024

# Like the CustomVision.ai Prediction service /image route handles either
#     - octet-stream image file
#     - a multipart/form-data with files in the imageData parameter
@cross_origin('http://localhost:4200')
@app.route('/image-analyses', methods=['POST'])
def predict_image_handler(project=None, publishedName=None):
    try:
        if 'imageData' in request.files:
            imageData = request.files['imageData']
        elif 'imageData' in request.form:
            imageData = request.form['imageData']
        else:
            imageData = io.BytesIO(request.get_data())

        img = Image.open(imageData)

        results = predict_image(img)

        return jsonify(results)
    except Exception as e:
        print('EXCEPTION:', str(e))
        return 'Error processing image', 500


if __name__ == '__main__':
    # Load and initialize the model
    initialize()

    # Run the server
    app.run(port=5000, debug=True)
