from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np
import os

app = Flask(__name__)

# Load trained model
model_path = os.path.join(os.path.dirname(__file__), "../models/habitability_model.pkl")
model = joblib.load(model_path)


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")



@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get form values
        features = [
            float(request.form["pl_orbper"]),
            float(request.form["pl_orbsmax"]),
            float(request.form["pl_bmasse"]),
            float(request.form["pl_eqt"]),
            float(request.form["st_teff"]),
            float(request.form["st_rad"]),
            float(request.form["st_mass"]),
            float(request.form["st_lum"]),
        ]

        features_array = np.array([features])

        prediction = model.predict(features_array)[0]

        if prediction == 1:
            result = "Potentially Habitable 🌍"
        else:
            result = "Not Habitable ❌"

        return render_template("index.html", prediction_text=result)

    except Exception as e:
        return str(e)


if __name__ == "__main__":
    app.run(debug=True)
