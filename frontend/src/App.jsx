import FoodScanner from "./FoodScanner";
import { useEffect, useState } from "react";
import "./App.css";
const API_URL = "http://localhost:5000/api/children";

const EXISTING_CHILDREN = [
  {
    name: "Aarav Kumar",
    poshanId: "KA-AWC-001",
    dob: "2024-04-18",
    gender: "Male",
    parentGuardian: "Ravi Kumar",
    anganwadiCenter: "AWC-104, Nelamangala",
    currentWeight: 14.2,
    currentHeight: 98,
    nutritionStatus: "Normal",
  },
  {
    name: "Ananya R",
    poshanId: "KA-AWC-002",
    dob: "2024-02-10",
    gender: "Female",
    parentGuardian: "Ramesh",
    anganwadiCenter: "AWC-104, Nelamangala",
    currentWeight: 11.8,
    currentHeight: 91,
    nutritionStatus: "Normal",
  },
  {
    name: "Vihaan S",
    poshanId: "KA-AWC-003",
    dob: "2024-01-25",
    gender: "Male",
    parentGuardian: "Suresh",
    anganwadiCenter: "AWC-104, Nelamangala",
    currentWeight: 13.1,
    currentHeight: 96,
    nutritionStatus: "MAM",
  },
  {
    name: "Diya Gowda",
    poshanId: "KA-AWC-004",
    dob: "2024-02-07",
    gender: "Female",
    parentGuardian: "Manjunath",
    anganwadiCenter: "AWC-104, Nelamangala",
    currentWeight: 12.9,
    currentHeight: 95,
    nutritionStatus: "Normal",
  },
  {
    name: "Advik M",
    poshanId: "KA-AWC-005",
    dob: "2024-01-15",
    gender: "Male",
    parentGuardian: "Mahesh",
    anganwadiCenter: "AWC-104, Nelamangala",
    currentWeight: 10.9,
    currentHeight: 88,
    nutritionStatus: "MAM",
  },
  {
    name: "Ishita N",
    poshanId: "KA-AWC-006",
    dob: "2024-09-03",
    gender: "Female",
    parentGuardian: "Nagaraj",
    anganwadiCenter: "AWC-104, Nelamangala",
    currentWeight: 15.0,
    currentHeight: 101,
    nutritionStatus: "Normal",
  },
  {
    name: "Reyansh K",
    poshanId: "KA-AWC-007",
    dob: "2024-03-21",
    gender: "Male",
    parentGuardian: "Kiran",
    anganwadiCenter: "AWC-104, Nelamangala",
    currentWeight: 11.4,
    currentHeight: 90,
    nutritionStatus: "SAM",
  },
  {
    name: "Saanvi P",
    poshanId: "KA-AWC-008",
    dob: "2024-09-12",
    gender: "Female",
    parentGuardian: "Prakash",
    anganwadiCenter: "AWC-104, Nelamangala",
    currentWeight: 12.1,
    currentHeight: 92,
    nutritionStatus: "Normal",
  },
];

const today = new Date();
const todayFormatted = today.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});
function calculateAge(dob) {
  if (!dob) return "—";

  const birthDate = new Date(dob);

  if (Number.isNaN(birthDate.getTime())) return "—";

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();

  if (
    months < 0 ||
    (months === 0 && today.getDate() < birthDate.getDate())
  ) {
    years--;
  }

  if (years < 1) {
    const totalMonths =
      (today.getFullYear() - birthDate.getFullYear()) * 12 +
      (today.getMonth() - birthDate.getMonth());

    return `${Math.max(totalMonths, 0)} months`;
  }

  return `${years} ${years === 1 ? "year" : "years"}`;
}

function getInitial(name) {
  if (!name) return "?";
  return name.charAt(0).toUpperCase();
}


function App() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeReport, setActiveReport] = useState("");

  const [showAddChild, setShowAddChild] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "Male",
    parentGuardian: "",
    poshanId: "",
    anganwadiCenter: "AWC-104",
    currentWeight: "",
    currentHeight: "",
  });

  const loadChildren = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to connect to the child API.");
      }

      const data = await response.json();
      setChildren(data.length ? data : EXISTING_CHILDREN);
    } catch (err) {
      console.error("Failed to load children:", err);

      // Show the existing demo children if the backend is unavailable
      setChildren(EXISTING_CHILDREN);
      setError("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadChildren();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const alertCount = children.filter(
  (child) =>
    child.nutritionStatus === "MAM" ||
    child.nutritionStatus === "SAM"
).length;

const normalCount = children.filter(
  (child) => child.nutritionStatus === "Normal"
).length;

const handleInputChange = (event) => {
  const { name, value } = event.target;

  setFormData((previous) => ({
    ...previous,
    [name]: value,
  }));
};
  
  const handleAddChild = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setFormMessage("");

      const payload = {
        name: formData.name,
        dob: formData.dob,
        gender: formData.gender,
        parentGuardian: formData.parentGuardian,
        poshanId: formData.poshanId,
        anganwadiCenter: formData.anganwadiCenter,
        currentWeight:
          formData.currentWeight === ""
            ? null
            : Number(formData.currentWeight),
        currentHeight:
          formData.currentHeight === ""
            ? null
            : Number(formData.currentHeight),
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add child.");
      }

      setFormMessage("Child registered successfully.");

      setFormData({
        name: "",
        dob: "",
        gender: "Male",
        parentGuardian: "",
        poshanId: "",
        anganwadiCenter: "AWC-104",
        currentWeight: "",
        currentHeight: "",
      });

      await loadChildren();

      setTimeout(() => {
        setShowAddChild(false);
        setFormMessage("");
      }, 800);
    } catch (err) {
      console.error("Failed to add child:", err);
      setFormMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app">

      {/* ================= HEADER ================= */}
      <header className="top-header">
        <div className="header-inner">

          <div className="brand">
            <div className="brand-logo" aria-hidden="true">
              🌱
            </div>

            <div>
              <h1>Anganwadi Diet & Nutrition</h1>
              <p>Child Nutrition Awareness & Management Tool</p>
            </div>
          </div>

          <div className="worker-profile">
            <div className="profile-avatar">L</div>

            <div className="profile-text">
              <span>Anganwadi Worker</span>
              <strong>Lakshmi Devi</strong>
            </div>
          </div>

        </div>
      </header>

      {/* ================= NAVIGATION ================= */}
      <nav className="navbar" aria-label="Main navigation">
        <div className="nav-inner">

          <a href="#dashboard" className="nav-link active">
            Dashboard
          </a>

          <a href="#children" className="nav-link">
            Children
          </a>

          <a href="#meal" className="nav-link">
            Meal Menu
          </a>

          <a href="#nutrition" className="nav-link">
            Nutrition
          </a>

          <a href="#reports" className="nav-link">
            Reports
          </a>

        </div>
      </nav>

      <main className="main-container">

        {/* ================= CENTRE INFO ================= */}
        <section className="centre-banner" id="dashboard">

          <div>
            <span className="eyebrow">ANGANWADI CENTRE</span>

            <h2>Anganwadi Centre 104</h2>

            <p>
              📍 Nelamangala, Bengaluru Rural, Karnataka
            </p>
          </div>

          <div className="date-card">
            <span>Today's Record</span>
            <strong>{todayFormatted}</strong>
          </div>

        </section>

        {/* ================= DASHBOARD TITLE ================= */}
        <section className="section-heading">

          <div>
            <span className="eyebrow">OVERVIEW</span>
            <h2>Today's Dashboard</h2>
            <p>
              Quick view of children, nutrition alerts and daily meals.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() => setShowAddChild(true)}
          >
            <span aria-hidden="true">＋</span>
            Add Child
          </button>

        </section>

        {/* ================= STAT CARDS ================= */}
        <section className="stats-grid" aria-label="Dashboard statistics">

          <div className="stat-card green">
            <div className="stat-icon">👧</div>

            <div>
              <span>Total Children</span>

              <strong>
                {loading ? "..." : children.length}
              </strong>

              <small>Registered children</small>
            </div>
          </div>

          <div className="stat-card orange">
            <div className="stat-icon">🍱</div>

            <div>
              <span>Meals Served</span>
              <strong>{children.length}</strong>
              <small>Today's meal records</small>
            </div>
          </div>

          <div className="stat-card red">
            <div className="stat-icon">⚠️</div>

            <div>
              <span>Nutrition Alerts</span>
              <strong>{loading ? "..." : alertCount}</strong>
              <small>MAM / SAM follow-up</small>
            </div>
          </div>

          <div className="stat-card blue">
            <div className="stat-icon">✓</div>

            <div>
              <span>Normal Status</span>
              <strong>{loading ? "..." : normalCount}</strong>
              <small>Children currently normal</small>
            </div>
          </div>

        </section>

        {/* ================= CHILDREN ================= */}
        <section className="content-section" id="children">

          <div className="section-heading compact">

            <div>
              <span className="eyebrow">CHILD RECORDS</span>

              <h2>Children Details</h2>

              <p>
                Registered children at this Anganwadi centre.
              </p>
            </div>

            <button
              className="secondary-button"
              onClick={loadChildren}
              disabled={loading}
            >
              ↻ Refresh
            </button>

          </div>

          {loading && (
            <div className="message-card">
              <div className="spinner"></div>
              <p>Loading children from MongoDB...</p>
            </div>
          )}

          {!loading && error && (
            <div className="error-card">
              <strong>Unable to load children</strong>
              <p>{error}</p>

              <button
                className="secondary-button"
                onClick={loadChildren}
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && children.length === 0 && (
            <div className="empty-card">
              <div className="empty-icon">👶</div>

              <h3>No children registered yet</h3>

              <p>
                Add the first child to start building your nutrition
                records.
              </p>

              <button
                className="primary-button"
                onClick={() => setShowAddChild(true)}
              >
                ＋ Add First Child
              </button>
            </div>
          )}

          {!loading && !error && children.length > 0 && (
            <div className="children-grid">

              {children.map((child) => (

                <article
                  className="child-card"
                  key={child._id || child.poshanId}
                >

                  <div className="child-card-header">

                    <div className="child-identity">

                      <div className="avatar">
                        {getInitial(child.name)}
                      </div>

                      <div>
                        <h3>{child.name}</h3>

                        <span className="child-id">
                          Poshan ID: {child.poshanId}
                        </span>
                      </div>

                    </div>

                    <span className={`status-badge ${child.nutritionStatus.toLowerCase()}`}>
                    {child.nutritionStatus === "MAM"
                    ? "MAM – Moderate Acute Malnutrition"
                    : child.nutritionStatus === "SAM"
                    ? "SAM – Severe Acute Malnutrition"
                    : child.nutritionStatus === "Normal"
                    ? "Normal"
                    : "Unknown"}
                  </span>

                  </div>

                  <div className="child-details">

                    <div>
                      <span>Age</span>
                      <strong>{calculateAge(child.dob)}</strong>
                    </div>

                    <div>
                      <span>Gender</span>
                      <strong>{child.gender || "—"}</strong>
                    </div>

                    <div>
                      <span>Weight</span>
                      <strong>
                        {child.currentWeight
                          ? `${child.currentWeight} kg`
                          : "—"}
                      </strong>
                    </div>

                    <div>
                      <span>Height</span>
                      <strong>
                        {child.currentHeight
                          ? `${child.currentHeight} cm`
                          : "—"}
                      </strong>
                    </div>

                  </div>

                  <div className="child-footer">
                    <span>
                      🏠 {child.anganwadiCenter || "AWC-104"}
                    </span>

                    <button className="text-button">
                      View Details →
                    </button>
                  </div>

                </article>

              ))}

            </div>
          )}

        </section>
        <FoodScanner />

        {/* ================= TWO COLUMN AREA ================= */}
        <section className="two-column">

          {/* ================= MEAL ================= */}
          <div className="panel" id="meal">

            <div className="panel-header">

              <div>
                <span className="eyebrow">TODAY'S MEAL</span>

                <h2>Hot Cooked Meal</h2>

                <p>Balanced Anganwadi meal</p>
              </div>

              <span className="meal-badge">
                Today's Menu
              </span>

            </div>

            <div className="meal-plate">

              <div className="food-item">
                <span>🍚</span>
                <strong>Rice</strong>
              </div>

              <div className="food-item">
                <span>🥣</span>
                <strong>Mixed Dal</strong>
              </div>

              <div className="food-item">
                <span>🥚</span>
                <strong>Egg</strong>
              </div>

              <div className="food-item">
                <span>🍲</span>
                <strong>Sambar</strong>
              </div>

              <div className="food-item">
                <span>🥬</span>
                <strong>Vegetable Palya</strong>
              </div>

            </div>

            <div className="meal-content">

              <h3>
                Rice + Mixed Dal + Egg + Sambar + Vegetable Palya
              </h3>

              <p>
                A balanced meal containing cereals, pulses, egg
                and vegetables.
              </p>

              <div className="meal-stats">

                <div>
                  <strong>575</strong>
                  <span>Calories</span>
                </div>

                <div>
                  <strong>17.2 g</strong>
                  <span>Protein</span>
                </div>

                <div>
                  <strong>Good</strong>
                  <span>Meal Quality</span>
                </div>

              </div>

            </div>

            <div className="ingredients">

              <h3>Ingredients</h3>

              <div className="ingredient-list">
                <span>🍚 Rice</span>
                <span>🫘 Mixed Dal</span>
                <span>🥚 Egg</span>
                <span>🍲 Sambar</span>
                <span>🥬 Vegetable Palya</span>
              </div>

            </div>

          </div>

          {/* ================= NUTRITION ================= */}
          <div className="panel" id="nutrition">

            <div className="panel-header">

              <div>
                <span className="eyebrow">NUTRITION</span>

                <h2>Nutrition Check</h2>

                <p>Today's meal nutrition overview</p>
              </div>

              <span className="check-badge">
                ✓ Checked
              </span>

            </div>

            <div className="nutrition-score">

              <div className="score-circle">
                <strong>92%</strong>
                <span>Balanced</span>
              </div>

              <div>
                <h3>Good nutritional balance</h3>

                <p>
                  The meal includes a combination of cereals,
                  pulses, egg and vegetables.
                </p>
              </div>

            </div>

            <div className="nutrition-list">

              <div className="nutrition-item">

                <div className="nutrition-label">
                  <span>🔥 Energy</span>
                  <strong>575 kcal</strong>
                </div>

                <div className="progress">
                  <i style={{ width: "95%" }}></i>
                </div>

              </div>

              <div className="nutrition-item">

                <div className="nutrition-label">
                  <span>💪 Protein</span>
                  <strong>17.2 g</strong>
                </div>

                <div className="progress">
                  <i style={{ width: "86%" }}></i>
                </div>

              </div>

              <div className="nutrition-item">

                <div className="nutrition-label">
                  <span>🥬 Vegetables</span>
                  <strong>Good</strong>
                </div>

                <div className="progress">
                  <i style={{ width: "90%" }}></i>
                </div>

              </div>

              <div className="nutrition-item">

                <div className="nutrition-label">
                  <span>🥚 Protein Source</span>
                  <strong>Included</strong>
                </div>

                <div className="progress">
                  <i style={{ width: "88%" }}></i>
                </div>

              </div>

            </div>

            <div className="nutrition-note">
              ✓ Meal contains cereal + pulse + egg + vegetable
              combination.
            </div>

          </div>

        </section>

        {/* ================= REPORTS ================= */}
        <section className="report-section" id="reports">

          <div>
            <span className="eyebrow">REPORTS</span>

            <h2>Nutrition & Growth Reports</h2>

            <p>
              Review children's growth records, meal completion
              and nutrition alerts.
            </p>
          </div>

         <div className="report-buttons">

  <button onClick={() => setActiveReport("growth")}>
    📊 Growth Report
  </button>

  <button onClick={() => setActiveReport("meal")}>
    🍽️ Meal Report
  </button>

  <button onClick={() => setActiveReport("nutrition")}>
    📋 Nutrition Summary
  </button>

</div> 
{activeReport === "growth" && (
  <div className="report-result">
    <h3>📊 Growth Report</h3>
    <p>Review children's weight, height and nutrition status.</p>

    {children.map((child) => (
      <p key={child.poshanId || child.name}>
        <strong>{child.name}</strong> — Weight: {child.currentWeight ?? "--"} kg,
        Height: {child.currentHeight ?? "--"} cm
      </p>
    ))}
  </div>
)}

{activeReport === "meal" && (
  <div className="report-result">
    <h3>🍽️ Meal Report</h3>
    <p>Total meals served: {children.length}</p>
    <p>Meal records are available for the registered children.</p>
  </div>
)}

{activeReport === "nutrition" && (
  <div className="report-result">
    <h3>📋 Nutrition Summary</h3>
    <p>
      Normal:{" "}
      {children.filter((child) => child.nutritionStatus === "Normal").length}
    </p>
    <p>
      MAM:{" "}
      {children.filter((child) => child.nutritionStatus === "MAM").length}
    </p>
    <p>
      SAM:{" "}
      {children.filter((child) => child.nutritionStatus === "SAM").length}
    </p>
  </div>
)}
</section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">

        <div>
          <strong>Anganwadi Diet & Nutrition</strong>
          <span>
            Child Nutrition Awareness & Management Tool
          </span>
        </div>

        <span>
          Karnataka State Pilot
        </span>

      </footer>

      {/* ================= ADD CHILD MODAL ================= */}
      {showAddChild && (

        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowAddChild(false);
            }
          }}
        >

          <div className="modal">

            <div className="modal-header">

              <div>
                <span className="eyebrow">CHILD REGISTRATION</span>
                <h2>Add New Child</h2>
              </div>

              <button
                className="close-button"
                onClick={() => setShowAddChild(false)}
                aria-label="Close"
              >
                ×
              </button>

            </div>

            <form onSubmit={handleAddChild}>

              <div className="form-grid">

                <label>
                  Child Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter child name"
                    required
                  />
                </label>

                <label>
                  Date of Birth
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    required
                  />
                </label>

                <label>
                  Gender
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </label>

                <label>
                  Poshan ID
                  <input
                    type="text"
                    name="poshanId"
                    value={formData.poshanId}
                    onChange={handleInputChange}
                    placeholder="Example: KA-9421"
                    required
                  />
                </label>

                <label>
                  Parent / Guardian
                  <input
                    type="text"
                    name="parentGuardian"
                    value={formData.parentGuardian}
                    onChange={handleInputChange}
                    placeholder="Guardian name"
                    required
                  />
                </label>

                <label>
                  Anganwadi Centre
                  <input
                    type="text"
                    name="anganwadiCenter"
                    value={formData.anganwadiCenter}
                    onChange={handleInputChange}
                    required
                  />
                </label>

                <label>
                  Current Weight (kg)
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    name="currentWeight"
                    value={formData.currentWeight}
                    onChange={handleInputChange}
                    placeholder="Example: 12.4"
                  />
                </label>

                <label>
                  Current Height (cm)
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    name="currentHeight"
                    value={formData.currentHeight}
                    onChange={handleInputChange}
                    placeholder="Example: 92"
                  />
                </label>

              </div>

              {formMessage && (
                <div
                  className={
                    formMessage.includes("successfully")
                      ? "form-success"
                      : "form-error"
                  }
                >
                  {formMessage}
                </div>
              )}

              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowAddChild(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Register Child"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}
</main>
    </div>
  );
}

export default App;