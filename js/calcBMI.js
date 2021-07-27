// 綁 DOM & 全域變數
var calcBtn = document.getElementById('calcBtn');
var BMIrecordList = document.getElementById('BMIrecordList');
var BMIDate = JSON.parse(localStorage.getItem('BMIItem')) || [];
var body = document.body;
var delBMIData = document.getElementById('delBMIData');
var BMICalcResult = document.getElementById('BMICalcResult');
var btnLoop = document.getElementById('btnLoop');

// 監聽
calcBtn.addEventListener('click', addBMIList, false);
btnLoop.addEventListener('click', btnReset, true);
body.addEventListener('keydown', enterAddBMIList, false);
upDateBMIList(BMIDate);
delBMIData.addEventListener('click', delAllBMIData, false);


// 新增 list 並更新 網頁 跟 localStorage
function addBMIList(){
    reset();
    var today = new Date();
    var BMIObj = {
        result: '',
        BMI: 0,
        weightNum: 0,
        tallNum: 0,
        year: '',
        month: '',
        date: '',
        className: '',
    }

    BMIObj.weightNum = document.getElementById('weightNum').value;
    BMIObj.tallNum = document.getElementById('tallNum').value;
    BMIObj.year = today.getFullYear();
    BMIObj.month = today.getMonth() + 1;
    BMIObj.date = today.getDate();

    if(BMIObj.weightNum == 0 || BMIObj.tallNum == 0){
        alert('請輸入身高體重');
    }else{
        //計算
        var decimalTallNum = BMIObj.tallNum / 100;
        BMIObj.BMI = BMIObj.weightNum / (decimalTallNum * decimalTallNum);
        BMIObj.BMI = Math.round(BMIObj.BMI * 100) / 100; //小數點幾位就除幾個 0
        calcBtn.classList.add('btnResultStyle');

        if(BMIObj.BMI < 16 || BMIObj.BMI >= 16 && BMIObj.BMI <= 18.5){
            BMIObj.result = '過輕';
            BMICalcResult.innerHTML = '過輕';
            BMIObj.className = 'liColor-green';
            calcBtn.classList.add('btnResultStyleGreen');
            calcBtn.dataset.contentafter = '過輕';
        }else if(BMIObj.BMI >= 18.5 && BMIObj.BMI <= 25){
            BMIObj.result = '理想';
            BMICalcResult.innerHTML = '理想';
            BMIObj.className = 'liColor-blue';
            calcBtn.classList.add('btnResultStyleBlue');
            calcBtn.dataset.contentafter = '理想';
        }else if(BMIObj.BMI >= 25.1 && BMIObj.BMI <= 30){
            BMIObj.result = '過重';
            BMICalcResult.innerHTML = '過重';
            BMIObj.className = 'liColor-orange';
            calcBtn.classList.add('btnResultStyleOrange');
            calcBtn.dataset.contentafter = '過重';
        }else if(BMIObj.BMI >= 30.1 && BMIObj.BMI <= 35){
            BMIObj.result = '輕度肥胖';
            BMICalcResult.innerHTML = '輕度肥胖';
            BMIObj.className = 'liColor-darkOrange';
            calcBtn.classList.add('btnResultStyleDarkOrange');
            calcBtn.dataset.contentafter = '輕度肥胖';
        }else if(BMIObj.BMI >= 35.1 && BMIObj.BMI <= 40){
            BMIObj.result = '中度肥胖';
            BMICalcResult.innerHTML = '中度肥胖';
            BMIObj.className = 'liColor-darkOrange';
            calcBtn.classList.add('btnResultStyleDarkOrange');
            calcBtn.dataset.contentafter = '中度肥胖';
        }else if(BMIObj.BMI >= 40.1){
            BMIObj.result = '重度肥胖';
            BMICalcResult.innerHTML = '重度肥胖';
            BMIObj.className = 'liColor-red';
            calcBtn.classList.add('btnResultStyleRed');
            calcBtn.dataset.contentafter = '重度肥胖';
        }

        BMIDate.push(BMIObj);
        upDateBMIList(BMIDate); // 更新網頁
        localStorage.setItem('BMIItem', JSON.stringify(BMIDate)); // 存到 localStorage

        document.getElementById('weightNum').value = '';
        document.getElementById('tallNum').value = '';

        BMICalcResult.innerHTML = BMIObj.BMI;
    }
}

function enterAddBMIList(e){
    switch(e.keyCode){
        case 13:
            addBMIList();
    }
}

// 把 array 顯示在畫面上
function upDateBMIList(e){
    var BMIString = '';
    var BMIListLen = e.length;
    for(var i = 0; i < BMIListLen; i++){
        BMIString += '<li><div id="liStyle" class="'+ BMIDate[i].className +'" data-num="'+ i +'"></div><p>'+ BMIDate[i].result  +'</p><p><span>BMI</span>'+ BMIDate[i].BMI +'</p><p><span>weight</span>'+ BMIDate[i].weightNum +'</p><p><span>height</span>'+ BMIDate[i].tallNum +'</p><p><span>'+ BMIDate[i].year +'-'+ BMIDate[i].month +'-'+ BMIDate[i].date +'</span></p></li>';
    }
    BMIrecordList.innerHTML = BMIString;
}

// 歸零
function reset(){
    calcBtn.classList.remove('btnResultStyle');
    calcBtn.classList.remove('btnResultStyleGreen');
    calcBtn.classList.remove('btnResultStyleBlue');
    calcBtn.classList.remove('btnResultStyleOrange');
    calcBtn.classList.remove('btnResultStyleDarkOrange');
    calcBtn.classList.remove('btnResultStyleRed');
    BMICalcResult.innerHTML = '看結果';
}

// 按鈕歸零
function btnReset(e){
    e.stopPropagation();
    reset();
}

// 刪除所有記錄
function delAllBMIData(){
    BMIDate = [];
    upDateBMIList(BMIDate); // 更新網頁
    localStorage.setItem('BMIItem', JSON.stringify(BMIDate)); // 存到 localStorage
    reset();
}

