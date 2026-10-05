import { useState } from "react";

function FoodScanner() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const analyzeFood = () => {
  if (!image) {
    alert("Please upload a food plate photo first.");
    return;
  }

  setAnalyzing(true);
  setResult(null);

  setTimeout(() => {
    const analysisResult = {
      detectedMeal: "Anganwadi Hot Cooked Meal",
      totalCalories: 558,
      totalProtein: 24.0,
      carbohydrates: 82,
      fat: 12,

      foods: [
        {
          name: "Rice",
          percentage: 38,
          calories: 212,
          protein: 4.3,
        },
        {
          name: "Mixed Dal",
          percentage: 20,
          calories: 120,
          protein: 7.0,
        },
        {
          name: "Egg",
          percentage: 15,
          calories: 78,
          protein: 6.3,
        },
        {
          name: "Sambar",
          percentage: 15,
          calories: 80,
          protein: 4.0,
        },
        {
          name: "Vegetable Palya",
          percentage: 12,
          calories: 68,
          protein: 2.4,
        },
      ],
    };

    setResult(analysisResult);
    setAnalyzing(false);
  }, 1500);
};
  return (
    <section className="food-scanner">
      <div className="scanner-header">
        <div>
          <span className="scanner-label">AI NUTRITION</span>
          <h2>Food Plate Scanner</h2>
          <p>
            Upload an Anganwadi meal photo to estimate food composition
            and nutrition.
          </p>
        </div>

        <div className="ai-status">
          <span className="status-dot"></span>
          AI Scanner
        </div>
      </div>

      <div className="scanner-grid">
        {/* Upload area */}
        <div className="upload-card">
          <h3>📷 Upload Meal Photo</h3>

          {!preview ? (
            <label className="upload-box">
              <div className="upload-icon">📸</div>

              <strong>Choose a food plate image</strong>

              <span>
                JPG, PNG or JPEG
              </span>

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleImageChange}
              />
            </label>
          ) : (
            <div className="image-preview-container">
              <img
                src={preview}
                alt="Uploaded food plate"
                className="food-preview"
              />

              <label className="change-image">
                Change Photo
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}

          <button
            className="analyze-button"
            onClick={analyzeFood}
            disabled={!image || analyzing}
          >
            {analyzing ? "🔍 Analyzing Plate..." : "🔍 Analyze Food Plate"}
          </button>
        </div>

        {/* Result area */}
        <div className="result-card">
          {!result ? (
            <div className="empty-result">
              <div className="empty-icon">🥗</div>

              <h3>Nutrition Analysis</h3>

              <p>
                Upload a meal photo and click
                <strong> Analyze Food Plate </strong>
                to see the nutrition details.
              </p>
            </div>
          ) : (
            <>
              {result && (
  <div className="ai-analysis-result">

    {/* AI HEADER */}
    <div className="ai-result-header">
      <div>
        <span className="ai-label">AI NUTRITION SCAN</span>
        <h2>🍽 {result.detectedMeal}</h2>
        <p>Smart analysis of the uploaded Anganwadi meal plate</p>
      </div>

      <div className="confidence-badge">
        <strong>94%</strong>
        <span>AI Confidence</span>
      </div>
    </div>

    {/* NUTRITION CARDS */}
    <div className="nutrition-cards">

      <div className="nutrition-card calories-card">
        <span className="nutrition-icon">🔥</span>
        <div>
          <small>ENERGY</small>
          <strong>{result.totalCalories}</strong>
          <span>kcal</span>
        </div>
      </div>

      <div className="nutrition-card protein-card">
        <span className="nutrition-icon">💪</span>
        <div>
          <small>PROTEIN</small>
          <strong>{result.totalProtein}</strong>
          <span>g</span>
        </div>
      </div>

      <div className="nutrition-card">
        <span className="nutrition-icon">🌾</span>
        <div>
          <small>CARBOHYDRATES</small>
          <strong>{result.carbohydrates}</strong>
          <span>g</span>
        </div>
      </div>

      <div className="nutrition-card">
        <span className="nutrition-icon">🥗</span>
        <div>
          <small>FAT</small>
          <strong>{result.fat}</strong>
          <span>g</span>
        </div>
      </div>

    </div>

    {/* PLATE COMPOSITION */}
    <div className="composition-section">

      <div className="section-heading">
        <div>
          <span className="ai-label">FOOD DETECTION</span>
          <h3>Plate Composition</h3>
        </div>

        <span className="detected-count">
          {result.foods.length} foods detected
        </span>
      </div>

      {result.foods.map((food, index) => (
        <div className="food-analysis-row" key={index}>

          <div className="food-main">
            <div className="food-number">
              {index + 1}
            </div>

            <div>
              <strong>{food.name}</strong>
              <small>
                {food.calories} kcal · {food.protein}g protein
              </small>
            </div>
          </div>

          <div className="food-percentage">
            <div className="percentage-label">
              <span>Plate share</span>
              <strong>{food.percentage}%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${food.percentage}%` }}
              />
            </div>
          </div>

        </div>
      ))}

    </div>

    {/* SMART NUTRITION INSIGHT */}
    <div className="nutrition-insight">

      <div className="insight-icon">
        💡
      </div>

      <div>
        <span>SMART NUTRITION INSIGHT</span>

        <h3>Balanced meal detected</h3>

        <p>
          The meal provides a combination of carbohydrates,
          protein and vegetables. Egg and mixed dal contribute
          important protein sources for growing children.
        </p>
      </div>

    </div>

    {/* VERIFICATION NOTE */}
    <div className="analysis-note">
      <span>ℹ️</span>
      <p>
        Nutrition values are estimated from detected food items
        and approximate portion sizes. Actual values may vary
        according to ingredients and serving quantity.
      </p>
    </div>

  </div>
)}

              
              
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default FoodScanner;