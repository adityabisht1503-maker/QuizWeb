const { DataModel } = require("../model/Datamodel");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

let adddata = async (req, res) => {
  try {
    const { Name, Score, Quizname } = req.body;

    // Save / update quiz data
    const data = await DataModel.findOneAndUpdate(
      { Name, Quizname },
      { $set: { Score } },
      { new: true, upsert: true }
    );

    // Generate certificate info
    const certificateId =
      "CERT-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    const date = new Date().toLocaleDateString();

    // Load certificate template (backend)
    const templatePath = path.join(
      __dirname,
      "certificate.html"
    );

    let html = fs.readFileSync(templatePath, "utf8");

    // Inject DB data
    html = html
      .replace("{{NAME}}", Name)
      .replace("{{QUIZ_NAME}}", Quizname)
      .replace("{{SCORE}}", getGrade(Score))
      .replace("{{DATE}}", date)
      .replace("{{CERT_ID}}", certificateId);

    // Generate PDF
    function getGrade(score) {
  const numericScore = Number(score) * 10; // if your Score is like 7 → 70

  if (numericScore >= 90) return "A+";
  else if (numericScore >= 80) return "A";
  else if (numericScore >= 70) return "B+";
  else if (numericScore >= 60) return "B";
  else if (numericScore >= 50) return "C+";
  else if (numericScore >= 40) return "C";
  else if (numericScore >= 30) return "D+";
  
}

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true
    });

    await browser.close();

    // Send PDF response
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${Name}_certificate.pdf`
    });

    return res.send(pdf); // ✅ SINGLE RESPONSE

  } catch (err) {
    console.error(err);

    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already submitted this quiz"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error generating certificate"
    });
  }
};

module.exports = { adddata };
