const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// ✅ THIS LINE FIXES YOUR LOGO
app.use(express.static(path.join(__dirname, "public")));

// ==========================
// FULL FORM UI (SINGLE FILE)
// ==========================
app.get("/", (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Requisition Form</title>

<style>
@media print {

    /* REMOVE INPUT UI */
    input, select, textarea {
        border: none;
        outline: none;
        background: transparent;
        appearance: none;
        -webkit-appearance: none;
        font-size: 12px;
    }

    /* REMOVE DROPDOWN ARROWS */
    select {
        background: none;
    }

    /* REMOVE CALENDAR ICON */
    input[type="date"],
    input[type="time"] {
        appearance: none;
        -webkit-appearance: none;
    }

    /* MAKE CHECKBOXES CLEAN */
    input[type="checkbox"] {
        transform: scale(1.2);
    }

}
@media print {

    body {
        margin: 0;
        zoom: 0.95;
    }

    .row {
        display: flex;
        gap: 10px;
        page-break-inside: avoid;
    }

    .box {
        page-break-inside: avoid;
    }

    input, select, textarea {
        border: 1px solid #000;
    }

    .header {
        page-break-after: avoid;
    }
}

/* HEADER LAYOUT */
.header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    border-bottom: 1px solid #000;
    padding-bottom: 10px;
    margin-bottom: 10px;
}

/* LEFT LOGO */
.header-left {
    width: 20%;
}

/* MIDDLE CONTACT INFO */
.header-middle {
    width: 55%;
    font-size: 12px;
    line-height: 1.4;
}

/* RIGHT BARCODE */
.header-right {
    width: 20%;
    border: 1px solid #000;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

/* CONTACT TITLE */
.contact-title {
    font-weight: bold;
    margin-bottom: 5px;
}
:root {
    --blue-header: #1f4e79;
    --turquoise-header: #18a999;
}

.heading-blue {
    background: var(--blue-header);
}

.heading-turquoise {
    background: var(--turquoise-header);
}

h3 {
    margin: 0 0 8px 0;
    padding: 6px;
    font-size: 14px;
    color: white;
    border-bottom: none;
}

body {
    font-family: Arial;
    margin: 20px;
    font-size: 13px;
}

/* HEADER */
.header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.logo {
    width: 120px;
}

/* ROW LAYOUT */
.row {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

/* BOXES */
.box {
    border: 1px solid #000;
    padding: 10px;
    flex: 1;
    box-sizing: border-box;
}

/* FULL WIDTH BOX */
.full {
    width: 100%;
}




/* PID GRID */
.pid-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 3px;
    margin-top: 5px;
}

.pid-grid input {
    width: 100%;
    height: 25px;
    text-align: center;
    font-size: 12px;
}

/* FORMS */
input, select {
    font-size: 12px;
}

/* TABLES */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 8px;
}

th, td {
    border: 1px solid #000;
    padding: 6px;
    font-size: 12px;
    text-align: center;
}

/* TEXTAREA */
textarea {
    width: 100%;
    height: 80px;
    font-size: 12px;
    resize: none;
}

/* SMALL SPACING FIX */
label {
    display: block;
    margin-top: 5px;
}

</style>
</head>

<body>

<form method="POST" action="/generate-pdf">

<!-- HEADER -->
<div class="header">

    <!-- LEFT: LOGO -->
    <div class="header-left">
        <img src="/IC_Labs_Logo.png" class="logo">
    </div>

    <!-- MIDDLE: CONTACT INFO -->
    <div class="header-middle">
        <div class="contact-title">IC Labs Contact Information:</div>
        <div>021 140 7190</div>
        <div>info@iclabs.co.za</div>
        <div>
            Ground Floor Albion Springs 183 Main Road,<br>
            Rondebosch, Cape Town, Western Cape South Africa
        </div>
    </div>

    <!-- RIGHT: BARCODE -->
    <div class="header-right">
        BARCODE
    </div>

</div>

<!-- TOP SECTION -->
<div class="row">

<!-- LEFT -->
<div class="box">
<h3 class="heading-blue">Participant Demographic Section</h3>

<label>PID</label>
<div class="pid-grid">
${Array.from({ length: 12 }).map((_, i) =>
`<input name="p${i+1}" maxlength="1">`
).join("")}
</div>

<label>Gender</label>
<select name="gender">
<option>Male</option>
<option>Female</option>
</select>

<label>DOB</label>
<input type="date" name="dob">
</div>

<!-- RIGHT -->
<div class="box">
<h3 class="heading-blue">Site Information</h3>

<label><input type="radio" name="site" value="710-006"> 710-006 (Aurum Institute CRS)</label><br>
<label><input type="radio" name="site" value="710-045"> 710-045 (Wits RHI-Shandukani Research)</label><br>
<label><input type="radio" name="site" value="710-036"> 710-036 (TASK Clinical Research Centre)</label><br>
<label><input type="radio" name="site" value="710-040"> 710-040 (Centre of TB Research Initiative)</label>

</div>
</div>

<!-- SECOND ROW -->
<div class="row">

<div class="box">
<h3 class="heading-blue">Scheduled Visit</h3>

<table>
<tr><td>Visit</td><td>Week 1 Day 1 (Wk1D1)</td></tr>
<tr><td></td><td><input name="visit_extra"></td></tr>
<tr><td>LDMS</td><td>Week 1 Day 1</td></tr>
</table>

</div>

<div class="box">
<h3 class="heading-blue">Site Instructions</h3>
<textarea name="instructions"></textarea>
</div>

</div>

<!-- SPECIMEN COLLECTION -->
<div class="row">
<div class="box full">

<h3 class="heading-turquoise">Specimen Collection (as per protocol)</h3>

<table>
<tr>
<th>Evaluation</th>
<th>Specimen Type</th>
<th>Collection Date</th>
<th>Time</th>
<th>Accession</th>
<th>Refrigerated</th>
</tr>

<tr>
<td>Spot Sputum</td>
<td>
<label><input type="checkbox" name="expectorated"> Expectorated</label><br>
<label><input type="checkbox" name="induced"> Induced</label>
</td>
<td><input type="date" name="col_date"></td>
<td><input type="time" name="col_time"></td>
<td><input name="accession"></td>
<td><input name="refrig"></td>
</tr>
</table>

</div>
</div>

<!-- COLLECTION INFO -->
<div class="row">
<div class="box full">

<h3 class="heading-turquoise">Specimen Collection Information</h3>

<p>Collector Signature: __________________________</p>

<table>
<tr>
<th>Vial Type</th>
<th>Expected</th>
<th>Actual Collected</th>
<th>Actual Received</th>
</tr>

<tr>
<td>Expectorated / Induced Sputum</td>
<td>1</td>
<td><input name="actual_col"></td>
<td><input name="actual_rec"></td>
</tr>
</table>

</div>
</div>

<!-- FINAL SECTION -->
<div class="row">

<div class="box">
<h3 class="heading-blue">Site Specific Comments for IC Labs</h3>
<textarea name="comments"></textarea>
</div>

<div class="box">
<h3 class="heading-blue">IC Labs Specific Instructions</h3>
<textarea name="lab_instructions"></textarea>

<h3>IC Labs Use Only</h3>

Packed By <input name="packed_by"><br>
Packed Date <input type="date" name="packed_date"><br>
QC By <input name="qc_by"><br>
QC Date <input type="date" name="qc_date"><br>
Received <input name="received">
</div>

</div>

<br>
<button type="submit">Submit</button>

</form>

</body>
</html>
`);
});
// ==========================
// FORM HANDLER
// ==========================
app.post("/generate-pdf", async (req, res) => {
    try {

const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport || null,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
});
    const page = await browser.newPage();

    await page.goto(`http://127.0.0.1:${PORT}`, {
        waitUntil: "networkidle0"
    });

    // =========================
    // FILL FORM WITH DATA
    // =========================
    await page.evaluate((data) => {

        // PID
        for (let i = 1; i <= 12; i++) {
            const field = document.querySelector(`input[name="p${i}"]`);
            if (field) field.value = data[`p${i}`] || "";
        }

        // Gender
        const gender = document.querySelector('select[name="gender"]');
        if (gender) gender.value = data.gender;

        // DOB
        const dob = document.querySelector('input[name="dob"]');
        if (dob) dob.value = data.dob;

        // Site (radio buttons)
        const site = document.querySelector(`input[name="site"][value="${data.site}"]`);
        if (site) site.checked = true;

        // Text fields
        const fields = [
            "visit_extra", "instructions", "accession",
            "col_date", "col_time", "refrig",
            "comments", "lab_instructions",
            "packed_by", "packed_date",
            "qc_by", "qc_date", "received",
            "actual_col", "actual_rec"
        ];

        fields.forEach(name => {
            const el = document.querySelector(`[name="${name}"]`);
            if (el) el.value = data[name] || "";
        });

        // Checkboxes
        if (data.expectorated) {
            const ex = document.querySelector('[name="expectorated"]');
            if (ex) ex.checked = true;
        }

        if (data.induced) {
            const ind = document.querySelector('[name="induced"]');
            if (ind) ind.checked = true;
        }

    }, req.body);

await page.evaluate(() => {

    // Convert all inputs to text
    document.querySelectorAll("input").forEach(input => {

        if (input.type === "checkbox") {
            if (input.checked) {
                const span = document.createElement("span");
                span.innerText = "✔";
                input.parentNode.replaceChild(span, input);
            } else {
                input.remove();
            }
        }

        else if (input.type !== "radio") {
            const span = document.createElement("span");
            span.innerText = input.value || "";
            input.parentNode.replaceChild(span, input);
        }
    });

    // Convert selects
    document.querySelectorAll("select").forEach(select => {
        const span = document.createElement("span");
        span.innerText = select.options[select.selectedIndex]?.text || "";
        select.parentNode.replaceChild(span, select);
    });

    // Convert textareas
    document.querySelectorAll("textarea").forEach(textarea => {
        const div = document.createElement("div");
        div.innerText = textarea.value || "";
        textarea.parentNode.replaceChild(div, textarea);
    });

});
    // =========================
    // GENERATE PDF
    // =========================
    const filePath = path.join(__dirname, "saved-records", "form.pdf");

    await page.pdf({
        path: filePath,
        format: "A4",
        printBackground: true,
        landscape: false
    });

    await browser.close();

    res.download(filePath);

    } catch (err) {
        console.error("PDF ERROR:", err);
        res.status(500).send("Error generating PDF");
    }
});
// ==========================
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});