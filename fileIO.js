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
    // alert("writeJSON() ファイル出力を行います");

    MakeJson();
}

function outputPDF() {
    canvasArr = outputSS();
    console.log("canvasArr.length = " + canvasArr.length);
    let pdf = jspdf.jsPDF('p', 'pt', 'a4');

    // A4ではwidth:595.28, height:841.89
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    console.log("pageWidth = " + pageWidth);
    console.log("pageHeight = " + pageHeight);

    let flag = true;
    canvasArr.forEach(canvas => {
        let cvsPdf = document.createElement('canvas');
        cvsPdf.width = A4_PAPER_WIDTH;
        cvsPdf.height = A4_PAPER_HEIGHT;
        let ctxPdf = cvsPdf.getContext('2d');
        console.log("cvsPdf.width = " + cvsPdf.width);
        console.log("cvsPdf.height = " + cvsPdf.height);
        ctxPdf.fillStyle = 'rgb(255,255,255)';
        ctxPdf.fillRect(0, 0, cvsPdf.width, cvsPdf.height);

        ctxPdf.drawImage(canvas, 0, 0);
        let image = cvsPdf.toDataURL('image/jpeg');
        pdf.addImage(image, 'JPG', 0, 0, pageWidth, pageHeight);
        pdf.addPage();
    });
    pdf.deletePage(canvasArr.length + 1);

    //let employeeName = getEmployeeName();
    //if (employeeName.length != 0) {
    //    pdf.save(employeeName);
    //}
    let idNum = getIDNumber();
    if (idNum.length != 0) {
        pdf.save(idNum);
    }
}

function getIDNumber() {
    let idNum;
    let infoTable = document.getElementById("infoTable");

    let cells = infoTable.rows[0].cells[1];
    let id = cells.getElementsByTagName("input")[0].value;
    cells = infoTable.rows[1].cells[1];
    let lastName = cells.getElementsByTagName("input")[0].value;
    let firstName = cells.getElementsByTagName("input")[1].value;
    cells = infoTable.rows[2].cells[1];
    let lastNameR = cells.getElementsByTagName("input")[0].value;
    let firstNameR = cells.getElementsByTagName("input")[1].value;

    idNum = lastNameR.substr(0, 2) + id + lastNameR.substr(2, 2); // ローマ字未入力でも落ちはしないが

    return idNum;
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

function MakeJson(filename) {

    let row;
    let masterJsonData = '';

    let mainObj = new Object();

    mainObj.id = "";
    mainObj.name = "";
    mainObj.romaji = "";
    mainObj.project = [];
    mainObj.qualification = "";

    let infoTable = document.getElementById("infoTable");

    let cells = infoTable.rows[0].cells[1];
    let id = cells.getElementsByTagName("input")[0].value;

    //基本データ書き込み
    filename = String(id);
    cells = infoTable.rows[1].cells[1];
    let lastName = cells.getElementsByTagName("input")[0].value;
    let firstName = cells.getElementsByTagName("input")[1].value;
    cells = infoTable.rows[2].cells[1];
    let lastNameR = cells.getElementsByTagName("input")[0].value;
    let firstNameR = cells.getElementsByTagName("input")[1].value;

    mainObj.id = id;
    mainObj.name = lastName + " "+ firstName;
    mainObj.romaji = lastNameR + " " + firstNameR;

    outputTable = document.getElementById("outputTable");
    for (let i = 1; i < outputTable.children[0].children.length - 1; i++) {
        row = outputTable.children[0].children[i];
        row.cells[1].getElementsByTagName("input")[0].value;

        let rowObj = [];

        let data1 = new Object();
        let data2 = new Object();
        let data3 = new Object();
        let data4 = new Object();
        let data5 = new Object();

        data1.title = '期間';
        data1.start = row.cells[1].getElementsByTagName("input")[0].value;
        data1.end = row.cells[1].getElementsByTagName("input")[1].value;

        data2.title = '経歴';
        data2.career = row.cells[2].getElementsByTagName("textarea")[0].value;

        data3.title = '技術キーワード';
        data3.keyword = row.cells[3].getElementsByTagName("textarea")[0].value;

        data4.title = '業務種別';
        data4.management = row.cells[4].getElementsByTagName("input")[0].checked;
        data4.design = row.cells[4].getElementsByTagName("input")[1].checked;
        data4.development = row.cells[4].getElementsByTagName("input")[2].checked;
        data4.evaluation = row.cells[4].getElementsByTagName("input")[3].checked;
        data4.other = row.cells[4].getElementsByTagName("input")[4].checked;

        data5.title = 'メモ';
        data5.memo = row.cells[5].getElementsByTagName("textarea")[0].value;

        rowObj.push(data1);
        rowObj.push(data2);
        rowObj.push(data3);
        rowObj.push(data4);
        rowObj.push(data5);

        mainObj.project.push(rowObj);
    }

    row = outputTable.children[0].children[outputTable.children[0].children.length - 1];

    mainObj.qualification = row.cells[0].getElementsByTagName("textarea")[0].value;

    masterJsonData = JSON.stringify(mainObj);

    const a = document.createElement('a');
    a.href = 'data:text/plain,' + encodeURIComponent(masterJsonData);

    id = getIDNumber();
    a.download = id + '.json';

    a.click();
};
