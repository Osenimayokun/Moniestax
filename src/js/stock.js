import { dates } from "./dates.js";
import { GEMINI_API } from "../../lo.js";
import { POLYGON_API } from "../../lo.js";
const predictionInputArr = [];

const predictionForm = document.getElementById("prediction-form");
const predictionFormInput = document.getElementById("ticker-symbol");
const predictionGenerateBtn = document.querySelector(".generate-button");
const predictionDescription = document.querySelector(".prediction-description");
const predictionPlace = document.querySelector(".ticker-placeholder");
const loadingArea = document.querySelector(".loading-panel");
const apiMessage = document.getElementById("api-message");
const predictionInputs = document.querySelector(".prediction-inputs");
const generateReport = document.querySelector(".generate-button");

const renderPrediction = function () {
  predictionPlace.innerHTML = " ";
  predictionPlace.textContent = predictionInputArr.join(", ");
};

predictionForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("hello");
  if (predictionFormInput.value.length > 2) {
    predictionGenerateBtn.disabled = false;
    const predictionFormInputValue = predictionFormInput.value;
    predictionInputArr.push(predictionFormInputValue.toUpperCase());
    predictionFormInput.value = "";
    renderPrediction();
  } else {
    predictionDescription.style.color = "red";
    predictionDescription.textContent =
      "You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g TSLA for Tesla.";
  }
});

const fetchStockData = async function () {
  predictionInputs.style.display = "none";
  loadingArea.style.display = "block";
  try {
    const stockData = await Promise.all(
      predictionInputArr.map(async (input) => {
        const url = `https://api.polygon.io/v2/aggs/ticker/${input}/range/1/day/${dates.startDate}/${dates.endDate}?adjusted=true&sort=asc&limit=120&apiKey=${POLYGON_API}`;
        const res = await fetch(url);
        const stockData = await res.text();
        console.log(stockData);
        if (res.status === 200) {
          apiMessage.textContent = "Loading Data....";
          return stockData;
        }
      })
    );
    fetchReport(stockData.join(""));
  } catch (err) {
    loadingArea.innerText = "There was an error fetching stock data.";
    console.error("error: ", err);
  }
};

generateReport.addEventListener("click", fetchStockData);

async function fetchReport(dataparam) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Let Assume you are a financial guru broker. Analyze each stock and give the following for each over 3 days not more than 150 words:
 Whether to buy, sell, or hold.  A brief explanation (trend, risk, or momentum), Mention any potential risks or volatility noticed 
 , don't add any * sign again . ${dataparam} `,
                },
              ],
            },
          ],
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    renderReport(data?.candidates?.[0]?.content?.parts?.[0]?.text);
    console.log(data?.candidates?.[0]?.content?.parts?.[0]?.text);
  } catch (err) {
    console.error(err);
  }
}

// callGemini();

function renderReport(output) {
  loadingArea.style.display = "none";
  const outputArea = document.querySelector(".prediction-analysis");
  outputArea.style.display = "block";
  document.querySelector(".prediction-analysis-content").textContent = output;
}
