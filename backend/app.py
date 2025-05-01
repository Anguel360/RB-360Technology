from flask import Flask, request, send_file
from flask_cors import CORS
from rembg import remove
import io
from PIL import Image

app = Flask(__name__)
CORS(app)  # Permite solicitudes desde el frontend (Netlify, localhost, etc.)

@app.route('/remove-background', methods=['POST'])
def remove_background():
    if 'image' not in request.files:
        return {'error': 'No image provided'}, 400

    image_file = request.files['image']
    input_image = Image.open(image_file.stream)
    output_image = remove(input_image)

    buffer = io.BytesIO()
    output_image.save(buffer, format='PNG')
    buffer.seek(0)

    return send_file(buffer, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)