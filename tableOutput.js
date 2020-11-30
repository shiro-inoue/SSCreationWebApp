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
    let cell6 = row.insertCell(-1);
    let cell7 = row.insertCell(-1);
    let cell8 = row.insertCell(-1);
    let cell9 = row.insertCell(-1);
    let cell10 = row.insertCell(-1);
    // セルの内容入力
    cell1.innerHTML = index + '<br><br><input type="button" value="+" id="insertRow" onclick="insertRow(this)"><br><input type="button" value="-" id="deleteRow" onclick="deleteRow(this)"><br><input type="checkbox" id="hideRow" onchange="hideRow(this)">行を非表示<br><br>';
    cell2.innerHTML = '<input name="startMonth" type="month" min="1970-04" onBlur="setDate(this, 0)">' + '<br>～' + '<input name="endMonth" type="month" min="1970-04" onBlur="setDate(this, 1)">' + '<br>(0ヶ月)';
    cell3.innerHTML = '<textarea rows="10" class = "outPutText" cols="50" style="width: 100%; height: 100%; resize: none" onchange="verifyText(this, ' + ONEPROJECT_MAX_CHARNUM + ')"></textarea>';
    cell4.innerHTML = '<textarea rows="10"class = "outPutText"  cols="17" style="width: 99%; height: 100%; resize: none" onchange="verifyText(this, ' + KEYWORD_MAX_CHARNUM + ')"></textarea>';
    cell5.innerHTML = '<input type="checkbox" id="check1">';
    cell6.innerHTML = '<input type="checkbox" id="check2">';
    cell7.innerHTML = '<input type="checkbox" id="check3">';
    cell8.innerHTML = '<input type="checkbox" id="check4">';
    cell9.innerHTML = '<input type="checkbox" id="check5">';
    cell10.innerHTML = '<textarea class = "outPutText" rows="10" cols="25" style="width: 99%; height: 100%; resize: none"></textarea>';
    row = outputTable.insertRow(-1);
    cell1 = row.insertCell(-1);
    cell1.innerHTML = '<span style="font-weight : bold">資格</span>';
    cell1.innerHTML += '<img src="./img/help.gif" class="StyleOutputTable" onmouseover="showHelpPopUp(\'help_qualification_msg\', \'help_qualification\', event)" onmouseout="hideHelpPopUp(\'help_qualification\')"><div id="help_qualification"></div><div id="help_qualification_msg" class="hidden">資格：情報処理やパソコン関係の資格、または無線や電気工事関係の資格をお持ちの方は記載して下さい。<br>また、語学についてもなんらかの資格をお持ちの方は記載して下さい。<br>（TOEICの場合は点数も明記すること）<br><br>※1行の最大は半角92文字、最大行数は51行の制限があります。<br>　1行半角51文字(全角26文字)以降、カーソルが移動したときに削除されます。</div><br>';
    cell1.colSpan = 10;

    row = outputTable.insertRow(-1);
    cell1 = row.insertCell(-1);
    cell1.innerHTML = '<textarea class = "outPutText" rows="10" cols="92" style="width: 100%; height: 100%; resize: none" onchange="verifyText(this, ' + QUALIFICATION_MAX_CHARNUM + ')"></textarea>';
    cell1.colSpan = 10;
}

function createTable(jsonParse) {
    if (!window.confirm("表が初期化されますが、JSONファイルを読み込みますか？")) {
        return;
    }

    let infoTable = document.getElementById("infoTable");
    let outputTable = document.getElementById("outputTable");
    let row;
    let cells;
    let html = "";

    let tableHeaderRowCount = 1;
    let rowCount = outputTable.rows.length;
    for (let i = tableHeaderRowCount; i < rowCount; i++) {
        outputTable.deleteRow(tableHeaderRowCount);
    }

    // console.log("id = " + jsonParse.id);
    // console.log("name = " + jsonParse.name);
    // console.log("romaji = " + jsonParse.romaji);
    cells = infoTable.rows[0].cells[1];
    cells.getElementsByTagName("input")[0].value = jsonParse.id;
    cells = infoTable.rows[1].cells[1];
    let array_name = jsonParse.name.split(" ");
    cells.getElementsByTagName("input")[0].value = array_name[0];
    cells.getElementsByTagName("input")[1].value = array_name[1];
    cells = infoTable.rows[2].cells[1];
    array_name = jsonParse.romaji.split(" ");
    cells.getElementsByTagName("input")[0].value = array_name[0];
    cells.getElementsByTagName("input")[1].value = array_name[1];

    // console.log("project.length = " + jsonParse.project.length);
    // console.log("jsonParse.project[0].length = " + jsonParse.project[0].length);

    for (i = 0; i < jsonParse.project.length; i++) {
        row = outputTable.insertRow(-1);
        cell1 = row.insertCell(-1);
        cell1.innerHTML = i + 1 + '<br><br><input type="button" value="+" id="insertRow" onclick="insertRow(this)"><br><input type="button" value="-" id="deleteRow" onclick="deleteRow(this)"><br><input type="checkbox" id="hideRow" onchange="hideRow(this)">行を非表示<br><br>';

        jsonParse.project[i].forEach((prj, i) => {
            // console.log("prj.title = " + prj.title);
            html = "";
            switch (prj.title) {
                case "期間":
                    // console.log("prj.start = " + prj.start);
                    // console.log("prj.end = " + prj.end);
                    let period = calcPeriod(prj.start, prj.end);
                    // console.log("period = " + period);
                    cell2 = row.insertCell(-1);
                    cell2.innerHTML = '<input name="startMonth" type="month" min="1970-04" onBlur="setDate(this, 0)" value=' + prj.start + '>' + '<br>～' + '<input name="endMonth" type="month" min="1970-04" onBlur="setDate(this, 1)" value=' + prj.end + '>' + '<br>(' + period + 'ヶ月)';
                    break;
                case "経歴":
                    cell3 = row.insertCell(-1);
                    // console.log("prj.career = " + prj.career);
                    cell3.innerHTML = '<textarea class = "outPutText" rows="10" cols="50" style="width: 100%; height: 100%; resize: none" onchange="verifyText(this, ' + ONEPROJECT_MAX_CHARNUM + ')">' + prj.career + '</textarea>';
                    break;
                case "技術キーワード":
                    cell4 = row.insertCell(-1);
                    // console.log("prj.keyword = " + prj.keyword);
                    cell4.innerHTML = '<textarea class = "outPutText" rows="10" cols="17" style="width: 99%; height: 100%; resize: none"  onchange="verifyText(this, ' + KEYWORD_MAX_CHARNUM + ')">' + prj.keyword + '</textarea>';
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
                    cell6 = row.insertCell(-1);
                    cell7 = row.insertCell(-1);
                    cell8 = row.insertCell(-1);
                    cell9 = row.insertCell(-1);
                    cell5.innerHTML = '<input type="checkbox" id="check1"' + managementChecked + '>';
                    cell6.innerHTML = '<input type="checkbox" id="check2"' + designChecked + '>';
                    cell7.innerHTML = '<input type="checkbox" id="check3"' + developmentChecked + '>';
                    cell8.innerHTML = '<input type="checkbox" id="check4"' + evaluationChecked + '>';
                    cell9.innerHTML = '<input type="checkbox" id="check5"' + otherChecked + '>';
                    break;
                case "メモ":
                    cell10 = row.insertCell(-1);
                    // console.log("prj.memo = " + prj.memo);
                    cell10.innerHTML = '<textarea class = "outPutText" rows="10" cols="26" style="width: 99%; height: 100%; resize: none">' + prj.memo + '</textarea>';
                    break;
                default:

            }
        });

    }
    // console.log("jsonParse.qualification = " + jsonParse.qualification);
    row = outputTable.insertRow(-1);
    cell1 = row.insertCell(-1);
    cell1.innerHTML = '<span style="font-weight : bold">資格</span>';
    cell1.innerHTML += '<img src="./img/help.gif" onmouseover="showHelpPopUp(\'help_qualification_msg\', \'help_qualification\', event)" onmouseout="hideHelpPopUp(\'help_qualification\')"><div id="help_qualification"></div><div id="help_qualification_msg" class="hidden">資格：情報処理やパソコン関係の資格、または無線や電気工事関係の資格をお持ちの方は記載して下さい。<br>また、語学についてもなんらかの資格をお持ちの方は記載して下さい。<br>（TOEICの場合は点数も明記すること）<br><br>※1行の最大は半角92文字、最大行数は51行の制限があります。<br>　1行半角51文字(全角26文字)以降、カーソルが移動したときに削除されます。</div><br>';
    cell1.colSpan = 10;

    row = outputTable.insertRow(-1);
    cell1 = row.insertCell(-1);
    cell1.innerHTML = '<textarea class = "outPutText" rows="10" cols="92" style="width: 100%; height: 100%; resize: none" onchange="verifyText(this, ' + QUALIFICATION_MAX_CHARNUM + ')">' + jsonParse.qualification + '</textarea>';
    cell1.colSpan = 10;
}

function calcPeriod(start, end) {

    if (start == "" || end == "") {
        return 0;
    }
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
    // if (month < 0) {
    //     month += 12;
    // }
    return month + year * 12;
}

function setDate(obj, index) {
    // console.log("index = " + index);
    let outputTable = document.getElementById("outputTable");
    let row;
    // console.log("outputTable.children[0].children.length = " + outputTable.children[0].children.length);

    tr = obj.parentNode.parentNode;
    // console.log("tr.sectionRowIndex = " + tr.sectionRowIndex);
    row = outputTable.children[0].children[tr.sectionRowIndex];

    let start = row.cells[1].getElementsByTagName("input")[0].value;
    let end = row.cells[1].getElementsByTagName("input")[1].value;
    // console.log("start = " + start);
    // console.log("end   = " + end);
    if (start != "" && end != "") {
        let period = calcPeriod(start, end);
        // console.log("period = " + period);
        row.cells[1].innerHTML = '<input name="startMonth" type="month" min="1970-04" onBlur="setDate(this, 0)" value=' + start + '>' + '<br>～' + '<input name="endMonth" type="month" min="1970-04" onBlur="setDate(this, 1)" value=' + end + '>' + '<br>(' + period + 'ヶ月)';
        // console.log(row.cells[1].innerHTML);
    }
}

function insertRow(obj) {
    //if (!window.confirm("行を挿入しますか？")) {
    //    return;
    //}

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
    let cell6 = row.insertCell(-1);
    let cell7 = row.insertCell(-1);
    let cell8 = row.insertCell(-1);
    let cell9 = row.insertCell(-1);
    let cell10 = row.insertCell(-1);
    // セルの内容入力
    cell1.innerHTML = index + '<br><br><input type="button" value="+" id="insertRow" onclick="insertRow(this)"><br><input type="button" value="-" id="deleteRow" onclick="deleteRow(this)"><br><input type="checkbox" id="hideRow" onchange="hideRow(this)">行を非表示<br><br>';
    cell2.innerHTML = '<input name="startMonth" type="month" min="1970-04" onBlur="setDate(this, 0)">' + '<br>～' + '<input name="endMonth" type="month" min="1970-04" onBlur="setDate(this, 1)">' + '<br>(0ヶ月)';
    cell3.innerHTML = '<textarea class = "outPutText" rows="10" cols="50" style="width: 100%; height: 100%; resize: none" onchange="verifyText(this, ' + ONEPROJECT_MAX_CHARNUM + ')"></textarea>';
    cell4.innerHTML = '<textarea class = "outPutText" rows="10" cols="17" style="width: 99%; height: 100%; resize: none"  onchange="verifyText(this, ' + KEYWORD_MAX_CHARNUM + ')"></textarea>';
    cell5.innerHTML = '<input type="checkbox" id="check1">';
    cell6.innerHTML = '<input type="checkbox" id="check2">';
    cell7.innerHTML = '<input type="checkbox" id="check3">';
    cell8.innerHTML = '<input type="checkbox" id="check4">';
    cell9.innerHTML = '<input type="checkbox" id="check5">';
    cell10.innerHTML = '<textarea class = "outPutText" rows="10" cols="26" style="width: 99%; height: 100%; resize: none"></textarea>';

    renumTable();
}

function deleteRow(obj) {
    let outputTable = document.getElementById("outputTable");
    let row;

    if (outputTable.rows.length == 4) {
        return;
    }

    if (!window.confirm("行を削除しますか？")) {
        return;
    }

    // 削除ボタンを押下された行を取得
    tr = obj.parentNode.parentNode;
    // trのインデックスを取得して行を削除する
    tr.parentNode.deleteRow(tr.sectionRowIndex);

    renumTable();
}

function hideRow(obj) {
    let outputTable = document.getElementById("outputTable");
    let row;
    // console.log("outputTable.children[0].children.length = " + outputTable.children[0].children.length);

    tr = obj.parentNode.parentNode;
    // console.log("tr.sectionRowIndex = " + tr.sectionRowIndex);

    row = outputTable.children[0].children[tr.sectionRowIndex];
    let isHide = row.cells[0].getElementsByTagName("input")[2].checked;
    // console.log("isHide = " + isHide);
    if (isHide) {
        row.style.backgroundColor = "#9f9f9f";
    }
    else {
        row.style.backgroundColor = "#ffffff";
    }

    renumTable();
}

function renumTable() {
    let outputTable = document.getElementById("outputTable");
    // console.log("outputTable.rows.length = " + outputTable.rows.length);
    let num = 1;

    for (let i = 1; i < outputTable.rows.length - 2; i++) {
        let cells = outputTable.rows[i].cells[0];
        // console.log("cells.firstChild.nodeValue = " + cells.firstChild.nodeValue);

        let row = outputTable.children[0].children[i];
        let isHide = row.cells[0].getElementsByTagName("input")[2].checked;
        // console.log("isHide = " + isHide);
        if (isHide) {
            cells.firstChild.nodeValue = "";
        }
        else {
            cells.firstChild.nodeValue = num++;
        }
    }
}

function verifyText(obj, maxLength) {
    // console.log("obj.value = " + obj.value);
    // console.log("maxLength = " + maxLength);
    let textArray = obj.value.split(/\r\n|\r|\n/);
    // console.log("textArray.length = " + textArray.length);

    obj.value = "";
    for (let i = 0; i < textArray.length; i++) {
        // console.log("textArray[i] = " + textArray[i]);
        // console.log("textArray[i].length = " + textArray[i].length);
        overhangNum = calcOverhangCharNum(textArray[i], maxLength);
        // console.log("overhangNum = " + overhangNum);
        if (overhangNum != 0) {
            textArray[i] = textArray[i].slice(0, -(overhangNum));
        }

        obj.value += textArray[i] + "\n";

        if (i + 1 === ONEPROJECT_MAX_LINENUM) {
            break;
        }
    }
    obj.value = obj.value.slice(0, -1);
}

function calcOverhangCharNum(text, maxLength) {
    let singleByteCharNum = 0;
    let overhangNum = 0;

    for (let i = 0; i < text.length; i++) {
        let chr = text.charCodeAt(i);
        if ((chr >= 0x00 && chr < 0x81) ||
            (chr === 0xf8f0) ||
            (chr >= 0xff61 && chr < 0xffa0) ||
            (chr >= 0xf8f1 && chr < 0xf8f4)) {
            singleByteCharNum += 1;
        } else {
            singleByteCharNum += 2;
        }

        if (singleByteCharNum > maxLength) {
            overhangNum++;
        }
    }
    return overhangNum;
}