const { DataModel } = require("../model/Datamodel");
const fs = require("fs");
const path = require("path");

const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

let adddata = async (req, res) => {
  try {
    const { Name, Score, Quizname } = req.body;

    await DataModel.findOneAndUpdate(
      { Name, Quizname },
      { $set: { Score } },
      { new: true, upsert: true }
    );

    const certificateId =
      "CERT-" + Math.random().toString(36).substring(2, 10).toUpperCase();

    const date = new Date().toLocaleDateString();

    const templatePath = path.join(__dirname, "certificate.html");

    let html = fs.readFileSync(templatePath, "utf8");

    function getGrade(score) {
      const numericScore = Number(score) * 10;

      if (numericScore >= 90) return "A+";
      if (numericScore >= 80) return "A";
      if (numericScore >= 70) return "B+";
      if (numericScore >= 60) return "B";
      if (numericScore >= 50) return "C+";
      if (numericScore >= 40) return "C";
      if (numericScore >= 30) return "D+";

      return "F";
    }

    html = html
      .replace("{{NAME}}", Name)
      .replace("{{QUIZ_NAME}}", Quizname)
      .replace("{{SCORE}}", getGrade(Score))
      .replace("{{DATE}}", date)
      .replace("{{CERT_ID}}", certificateId);

    console.log("1. Starting certificate generation");

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });

    console.log("2. Browser launched");

    const page = await browser.newPage();

    console.log("3. Page created");

    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    console.log("4. HTML loaded");

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    console.log("5. PDF generated");

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=${Name}_certificate.pdf`,
    });

    return res.send(pdf);
  } catch (err) {
    console.error("Certificate Error:");
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { adddata };