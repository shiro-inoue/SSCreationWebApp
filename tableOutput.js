window.onload = function () {
    initTable();
};

function initTable() {
    let outputTable = document.getElementById("outputTable");
    let index = 1;
    let row = outputTable.insertRow(index);
    //td分追加
    let cell1 = row.insertCell(-1);
    let cell2 = row.insertCell(-1);
    let cell3 = row.insertCell(-1);
    let cell4 = row.insertCell(-1);
    let cell5 = row.insertCell(-1);
    // セルの内容入力
    cell1.innerHTML = index + '<br><br><input type="button" value="+" id="insertRow" onclick="insertRow(this)"><br><input type="button" value="-" id="deleteRow" onclick="deleteRow(this)">';
    cell2.innerHTML = '<input name="startMonth" type="month">' + '<br>～' + '<input name="endMonth" type="month">' + '<br>(XXヶ月)';
    cell3.innerHTML = '<textarea rows="10" cols="50"></textarea>';
    cell4.innerHTML = '<textarea rows="10" cols="26"></textarea>';
    cell5.innerHTML = '<input type="checkbox" id="check1">管理<input type="checkbox" id="check2">設計<input type="checkbox" id="check3">開発<input type="checkbox" id="check4">評価<input type="checkbox" id="check5">他';

    row = outputTable.insertRow(-1);
    cell1 = row.insertCell(-1);
    cell1.innerHTML = '<textarea rows="10" cols="160"></textarea>';
    cell1.colSpan = 5; // セル結合のつもりだけど、うまく効かない
}

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

function createTable(jsonParse) {
    if (!window.confirm("表が初期化されますが、JSONファイルを読み込みますか？")) {
        return;
    }

    let outputTable = document.getElementById("outputTable");
    let row;
    let html = "";

    let tableHeaderRowCount = 1;
    let rowCount = outputTable.rows.length;
    for (let i = tableHeaderRowCount; i < rowCount; i++) {
        outputTable.deleteRow(tableHeaderRowCount);
    }

    // console.log("id = " + jsonParse.id);
    // console.log("name = " + jsonParse.name);
    // console.log("romaji = " + jsonParse.romaji);
    // console.log("project.length = " + jsonParse.project.length);
    // console.log("jsonParse.project[0].length = " + jsonParse.project[0].length);

    for (i = 0; i < jsonParse.project.length; i++) {
        row = outputTable.insertRow(-1);
        cell1 = row.insertCell(-1);
        cell1.innerHTML = i + 1 + '<br>' + '<br><br><input type="button" value="+" id="insertRow" onclick="insertRow(this)"><br><input type="button" value="-" id="deleteRow" onclick="deleteRow(this)">';

        jsonParse.project[i].forEach((prj, i) => {
            console.log("prj.title = " + prj.title);
            html = "";
            switch (prj.title) {
                case "期間":
                    // console.log("prj.start = " + prj.start);
                    // console.log("prj.end = " + prj.end);
                    let period = calcMonth(prj.start, prj.end);
                    // console.log("period = " + period);
                    cell2 = row.insertCell(-1);
                    cell2.innerHTML = '<input name="startMonth" type="month" value=' + prj.start + '>' + '<br>～' + '<input name="endMonth" type="month" value=' + prj.end + '>' + '<br>(' + period + 'ヶ月)';
                    break;
                case "経歴":
                    cell3 = row.insertCell(-1);
                    // console.log("prj.career = " + prj.career);
                    cell3.innerHTML = '<textarea rows="10" cols="50">' + prj.career + '</textarea>';
                    break;
                case "技術キーワード":
                    cell4 = row.insertCell(-1);
                    // console.log("prj.keyword = " + prj.keyword);
                    cell4.innerHTML = '<textarea rows="10" cols="26">' + prj.keyword + '</textarea>';
                    break;
                case "業務種別":
                    // console.log("prj.management  = " + prj.management);
                    // console.log("prj.design      = " + prj.design);
                    // console.log("prj.development = " + prj.development);
                    // console.log("prj.evaluation  = " + prj.evaluation);
                    // console.log("prj.other       = " + prj.other);
                    managementChecked = (prj.management) ? "checked = true" : "";
                    designChecked = (prj.design) ? "checked = true" : "";
                    developmentChecked = (prj.development) ? "checked = true" : "";
                    evaluationChecked = (prj.evaluation) ? "checked = true" : "";
                    otherChecked = (prj.other) ? "checked = true" : "";
                    cell5 = row.insertCell(-1);
                    cell5.innerHTML = '<input type="checkbox" id="check1"' + managementChecked + '>管理<input type="checkbox" id="check2"' + designChecked + '>設計<input type="checkbox" id="check3"' + developmentChecked + '>開発<input type="checkbox" id="check4"' + evaluationChecked + '>評価<input type="checkbox" id="check5"' + otherChecked + '>他';
                    break;
                default:

            }
        });

    }
    // console.log("jsonParse.qualification = " + jsonParse.qualification);
    row = outputTable.insertRow(-1);
    cell1 = row.insertCell(-1);
    cell1.innerHTML = '<textarea rows="10" cols="160">' + jsonParse.qualification + '</textarea>';
    cell1.colSpan = 5; // セル結合のつもりだけど、うまく効かない
}

function calcMonth(start, end) {
    let startYear = start.substr(0, 4);
    let startMonth = start.substr(5, 2);
    let endYear = end.substr(0, 4);
    let endMonth = end.substr(5, 2);
    // console.log("startYear = " + startYear);
    // console.log("startMonth = " + startMonth);
    // console.log("endYear = " + endYear);
    // console.log("endMonth = " + endMonth);
    let year = endYear - startYear;
    let month = endMonth - startMonth + 1;
    if (month < 0) {
        month += 12;
    }
    return month + year * 12;
}

function insertRow(obj) {
    if (!window.confirm("行を挿入しますか？")) {
        return;
    }

    let outputTable = document.getElementById("outputTable");
    // 挿入ボタンを押下された行を取得
    tr = obj.parentNode.parentNode;
    let index = tr.sectionRowIndex + 1;
    let row = outputTable.insertRow(index);
    //td分追加
    let cell1 = row.insertCell(-1);
    let cell2 = row.insertCell(-1);
    let cell3 = row.insertCell(-1);
    let cell4 = row.insertCell(-1);
    let cell5 = row.insertCell(-1);
    // セルの内容入力
    cell1.innerHTML = index + '<br><br><input type="button" value="+" id="insertRow" onclick="insertRow(this)"><br><input type="button" value="-" id="deleteRow" onclick="deleteRow(this)">';
    cell2.innerHTML = '<input name="startMonth" type="month">' + '<br>～' + '<input name="endMonth" type="month">' + '<br>(XXヶ月)';
    cell3.innerHTML = '<textarea rows="10" cols="50"></textarea>';
    cell4.innerHTML = '<textarea rows="10" cols="26"></textarea>';
    cell5.innerHTML = '<input type="checkbox" id="check1">管理<input type="checkbox" id="check2">設計<input type="checkbox" id="check3">開発<input type="checkbox" id="check4">評価<input type="checkbox" id="check5">他';

    renumTable();
}

function deleteRow(obj) {
    if (!window.confirm("行を削除しますか？")) {
        return;
    }

    // 削除ボタンを押下された行を取得
    tr = obj.parentNode.parentNode;
    // trのインデックスを取得して行を削除する
    tr.parentNode.deleteRow(tr.sectionRowIndex);

    renumTable();
}

function outputPDF() {
    alert("outputPDF() 未実装");
}

function renumTable() {
    let outputTable = document.getElementById("outputTable");
    // console.log("outputTable.rows.length = " + outputTable.rows.length);

    for (let i = 1; i < outputTable.rows.length - 1; i++) {
        let cells = outputTable.rows[i].cells[0];
        // console.log("cells.firstChild.nodeValue = " + cells.firstChild.nodeValue);
        cells.firstChild.nodeValue = i;
    }
}