const PDFDocument = require("pdfkit");
const { DataModel } = require("../model/Datamodel");

const adddata = async (req, res) => {
  try {
    const { Name, Score, Quizname } = req.body;

    await DataModel.findOneAndUpdate(
      { Name, Quizname },
      { $set: { Score } },
      { new: true, upsert: true }
    );

    const grade = getGrade(Score);
    const date = new Date().toLocaleDateString();

    const doc = new PDFDocument({
      size: "A4",
      layout: "landscape",
      margin: 50,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${Name}_certificate.pdf`
    );

    doc.pipe(res);

    // Outer Border
    doc
      .lineWidth(6)
      .rect(20, 20, 802, 555)
      .stroke();

    // Inner Border
    doc
      .lineWidth(2)
      .rect(35, 35, 772, 525)
      .stroke();

    // Title
    doc
      .fontSize(18)
      .text("QUIZ MASTER PLATFORM", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(32)
      .text("Certificate of Completion", {
        align: "center",
      });

    doc.moveDown(2);

    doc
      .fontSize(18)
      .text("This certificate is proudly presented to", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(30)
      .text(Name.toUpperCase(), {
        align: "center",
        underline: true,
      });

    doc.moveDown(2);

    doc
      .fontSize(18)
      .text("For successfully completing the quiz", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(24)
      .text(Quizname, {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(18)
      .text(`Grade: ${grade}`, {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(16)
      .text(`Date: ${date}`, {
        align: "center",
      });

    // Signatures

    doc.fontSize(18);

    doc.text("__________________", 120, 470);
    doc.text("Aditya Bisht", 130, 495);
    doc.text("Director", 155, 520);

    doc.text("__________________", 560, 470);
    doc.text("Tarun Shrivastava", 545, 495);
    doc.text("Head of Department", 530, 520);

    doc.end();
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Error generating certificate",
    });
  }
};

function getGrade(score) {
  const s = Number(score) * 10;

  if (s >= 90) return "A+";
  if (s >= 80) return "A";
  if (s >= 70) return "B+";
  if (s >= 60) return "B";
  if (s >= 50) return "C+";
  if (s >= 40) return "C";
  if (s >= 30) return "D+";

  return "F";
}

module.exports = { adddata };