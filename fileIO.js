function readJSON() {
    const fileSelect = document.getElementById("readJSON");
    if (fileSelect.files.length == 0) {
        return;
    }

    let reader = new FileReader();
    reader.readAsText(fileSelect.files[0]);
    reader.onloadend = () => {
        console.log(reader.result);
        block_id = JSON.parse(reader.result);
        createTable(block_id);
    }
}

function writeJSON() {
    alert("writeJSON() 未実装");
}

function outputPDF() {

    canvasArr = outputSS();

    let cvsPdf = document.createElement('canvas');
    cvsPdf.width = A4_PAPER_WIDTH;
    cvsPdf.height = A4_PAPER_HEIGHT * canvasArr.length;
    let ctxPdf = cvsPdf.getContext('2d');
    console.log("cvsPdf.width = " + cvsPdf.width);
    console.log("cvsPdf.height = " + cvsPdf.height);
    // ctxPdf.clearRect(0, 0, cvsPdf.width, cvsPdf.height);
    // let drawOffset = 0;
    // console.log("canvasArr.length = " + canvasArr.length);
    // canvasArr.forEach(canvas => {
    //     mainContext.drawImage(canvas, 0, drawOffset);
    //     drawOffset += A4_PAPER_HEIGHT;
    // });


    // // let cvsPreview = document.getElementById('previewCanvas');
    // let cvsPdf = document.createElement('canvas');
    // cvsPdf.width = A4_PAPER_WIDTH;
    // cvsPdf.height = A4_PAPER_HEIGHT;
    // let ctxPdf = cvsPdf.getContext('2d');
    let pdf = jspdf.jsPDF('p', 'pt', 'a4');

    // // A4ではwidth:595.28, height:841.89
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    console.log("pageWidth = " + pageWidth);
    console.log("pageHeight = " + pageHeight);

    // // サイズは暫定
    // cvsPdf.width = pageWidth;
    // cvsPdf.height = pageHeight;
    ctxPdf.fillStyle = 'rgb(255,255,255)';
    ctxPdf.fillRect(0, 0, cvsPdf.width, cvsPdf.height);

    let drawOffset = 0;
    console.log("canvasArr.length = " + canvasArr.length);
    // let image = cvsPdf.toDataURL('image/jpeg');
    canvasArr.forEach(canvas => {
        ctxPdf.drawImage(canvas, 0, drawOffset);
        // ctxPdf.drawImage(canvas, 0, 0, A4_PAPER_WIDTH, A4_PAPER_HEIGHT, 0, 0, pageWidth, drawOffset);
        // ctxPdf.drawImage(canvas, 0, 0, 600, 900, 0, 0, cvsPdf.width, cvsPdf.height);
        // ctxPdf.drawImage(canvas, 0, 0, cvsPreview.width, cvsPreview.height, 0, 0, cvsPdf.width, cvsPdf.height);
        // pdf.addImage(image, 'JPG', 0, 0, pageWidth, drawOffset);
        // pdf.addPage();
        drawOffset += pageHeight;
        // drawOffset += A4_PAPER_HEIGHT;
        console.log("drawOffset = " + drawOffset);
    });
    console.log("drawOffset = " + drawOffset);

    let image = cvsPdf.toDataURL('image/jpeg');
    pdf.addImage(image, 'JPG', 0, 0, pageWidth, drawOffset);
    // pdf.addImage(image, 'JPG', 0, 0, cvsPdf.width, drawOffset);
    pdf.addPage();
    // pdf.addImage(image, 'JPG', (pageWidth - cvsPdf.width) / 2, (pageHeight - cvsPdf.height) / 2, cvsPdf.width, cvsPdf.height);
    let employeeName = getEmployeeName();
    if (employeeName.length != 0) {
        pdf.save(employeeName);
    }
}

function getEmployeeName() {
    let employeeName;
    let infoTable = document.getElementById("infoTable");

    cells = infoTable.rows[1].cells[1];
    let lastName = cells.getElementsByTagName("input")[0].value;
    let firstName = cells.getElementsByTagName("input")[1].value;

    employeeName = lastName + firstName;
    if (employeeName.length == 0) {
        alert("氏名を入力してください");
    }
    return employeeName;
}