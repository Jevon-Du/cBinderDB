/*  @js 所有chemdoodle窗口初始化
***************************************************************************************************************/
function structureInitial(){
    canMap.put(0,sketcher0);
    canMap.put(1,sketcher1);
    canMap.put(2,sketcher2);
    canMap.put(3,sketcher3);
    canMap.put(4,sketcher4);
    canMap.put(5,sketcher5);
    canMap.put(6,sketcher6);
    canMap.put(7,sketcher7);
    canMap.put(8,sketcher8);
    canMap.put(9,sketcher9);
    canMap.put(10,sketcher10);
    canMap.put(11,sketcher11);
    canMap.put(12,sketcher12);
    canMap.put(13,sketcher13);
    canMap.put(14,sketcher14);
    sketcher0.clear();
    sketcher1.clear();
    sketcher2.clear();
    sketcher3.clear();
    sketcher4.clear();
    sketcher5.clear();
    sketcher6.clear();
    sketcher7.clear();
    sketcher8.clear();
    sketcher9.clear();
    sketcher10.clear();
    sketcher11.clear();
    sketcher12.clear();
    sketcher13.clear();
    sketcher14.clear();
}
function scaffoldInitial(){
    canMap.put(15,sketcher15);
    canMap.put(16,sketcher16);
    canMap.put(17,sketcher17);
    canMap.put(18,sketcher18);
    canMap.put(19,sketcher19);
    canMap.put(20,sketcher20);
    canMap.put(21,sketcher21);
    canMap.put(22,sketcher22);
    canMap.put(23,sketcher23);
    canMap.put(24,sketcher24);
    canMap.put(25,sketcher25);
    canMap.put(26,sketcher26);
    canMap.put(27,sketcher27);
    canMap.put(28,sketcher28);
    canMap.put(29,sketcher29);
    sketcher15.clear();
    sketcher16.clear();
    sketcher17.clear();
    sketcher18.clear();
    sketcher19.clear();
    sketcher20.clear();
    sketcher21.clear();
    sketcher22.clear();
    sketcher23.clear();
    sketcher24.clear();
    sketcher25.clear();
    sketcher26.clear();
    sketcher27.clear();
    sketcher28.clear();
    sketcher29.clear();
}
function scafDetailInitial(){
    canMap.put(31,sketcher31);
    canMap.put(32,sketcher32);
    canMap.put(33,sketcher33);
    canMap.put(34,sketcher34);
    sketcher31.clear();
    sketcher32.clear();
    sketcher33.clear();
    sketcher34.clear();
}
function refMolInitial(){
    canMap.put(35,sketcher35);
    canMap.put(36,sketcher36);
    canMap.put(37,sketcher37);
    canMap.put(38,sketcher38);
    canMap.put(39,sketcher39);
    canMap.put(40,sketcher40);
    canMap.put(41,sketcher41);
    canMap.put(42,sketcher42);
    canMap.put(43,sketcher43);
    canMap.put(44,sketcher44);
    canMap.put(45,sketcher45);
    canMap.put(46,sketcher46);
    canMap.put(47,sketcher47);
    canMap.put(48,sketcher48);
    canMap.put(49,sketcher49);
    sketcher35.clear();
    sketcher36.clear();
    sketcher37.clear();
    sketcher38.clear();
    sketcher39.clear();
    sketcher40.clear();
    sketcher41.clear();
    sketcher42.clear();
    sketcher43.clear();
    sketcher44.clear();
    sketcher45.clear();
    sketcher46.clear();
    sketcher47.clear();
    sketcher48.clear();
    sketcher49.clear();
}
function drugInitial(){
    canMap.put(50,sketcher50);
    canMap.put(51,sketcher51);
    canMap.put(52,sketcher52);
    canMap.put(53,sketcher53);
    canMap.put(54,sketcher54);
    canMap.put(55,sketcher55);
    canMap.put(56,sketcher56);
    canMap.put(57,sketcher57);
    canMap.put(58,sketcher58);
    canMap.put(59,sketcher59);
    canMap.put(60,sketcher60);
    canMap.put(61,sketcher61);
    canMap.put(62,sketcher62);
    canMap.put(63,sketcher63);
    canMap.put(64,sketcher64);
    sketcher50.clear();
    sketcher51.clear();
    sketcher52.clear();
    sketcher53.clear();
    sketcher54.clear();
    sketcher55.clear();
    sketcher56.clear();
    sketcher57.clear();
    sketcher58.clear();
    sketcher59.clear();
    sketcher60.clear();
    sketcher61.clear();
    sketcher62.clear();
    sketcher63.clear();
    sketcher64.clear();
}

function alignmentInitial(){
    canMap.put(65,sketcher65);
    canMap.put(66,sketcher66);
    canMap.put(67,sketcher67);
    canMap.put(68,sketcher68);
    canMap.put(69,sketcher69);
    canMap.put(70,sketcher70);
    sketcher65.clear();
    sketcher66.clear();
    sketcher67.clear();
    sketcher68.clear();
    sketcher69.clear();
    sketcher70.clear();
}

function hoverMolInitial(){
    canMap.put(71,sketcher71);
    canMap.put(72,sketcher72);
    sketcher71.clear();
    sketcher72.clear();
    
}
function selectMolInitial(){
    canMap.put(73,sketcher73);
    canMap.put(74,sketcher74);
    sketcher73.clear();
    sketcher74.clear();
}

//  单个chemdoodle窗口初始化
function chemdoodleInitial(data){
    var molFile = data;
    var molecule = ChemDoodle.readMOL(molFile);
    ChemDoodle.informatics.removeH(molecule);
    stickTransformer.loadMolecule(molecule);
}

//  清空前一页的所有3dMol数据
function clear3DMol(){
    //  原生3DMol拥有一个clear函数，可以清空，但需由对象调用。
    //  故直接删除DOM元素
    $(".frame .image").children("canvas").remove();   
}

//  @js 骨架：chemdoodle窗口全部显示
function scafDeatilShow(){
    for (var m = 0; m < 4; m++) {
        scafDetailInitial();
        $(".scafD-" + m).show();
    }
}

//set default style
function structureStyle(transformer){
    transformer.specs.atoms_useJMOLColors = true;
    // make bonds thicker
    transformer.specs.bonds_width_2D = 1;
    // don't draw atoms
    transformer.specs.atoms_display = true;
    // change the background color to black
    //transformer.specs.backgroundColor = '#fbfcfd';
    transformer.specs.backgroundColor = '#fff';
    // clear overlaps to show z-depth
    transformer.specs.bonds_clearOverlaps_2D = true;
}

// hide the div when number of molecules less than 15
function hide(cnt,present){  
    if (present==str_structure) {
        for(var i= cnt; i<TDMolViewerCnt; i++){
            var molid = "str-" + i;
            $("#"+molid).css("display","none");
        }
    } else if (present==str_scaffold) {
        for(var i= cnt; i<TDMolViewerCnt; i++){
            var molid = "scaf-" + i;
            $("#"+molid).css("display","none");
        }
    } else if (present==str_alignment) {
        for(var i= cnt; i<6; i++){
            var molid = "alig-" + i;
            $("#"+molid).css("display","none");
        }
    } else if (present==str_drugs) {
        for(var i= cnt; i<TDMolViewerCnt; i++){
            var molid = "drugs-" + i;
            $("#"+molid).css("display","none");
        }
    }
}
//  @js 所有chemdoodle窗口全部显示
function show(present){
    if (present==str_structure) {
        for(var i= 0; i<TDMolViewerCnt; i++){
            var molid = "str-" + i;
            $("#" + molid).show();
        }
    } else if (present==str_scaffold) {
        for(var i= 0; i<TDMolViewerCnt; i++){
            var molid = "scaf-" + i;
            $("#" + molid).show();
        }
    } else if (present==str_alignment) {
        for(var i= 0; i<6; i++){
            var molid = "alig-" + i;
            $("#" + molid).show();
        }
    } else if (present==str_drugs) {
        for(var i= 0; i<TDMolViewerCnt; i++){
            var molid = "drug-" + i;
            $("#" + molid).show();
        }
    }
}
/*  添加小分子的详细信息(调用结构绘制函数)
***************************************************************************************************************/ 
//  分子结构展示
function showMol (molArray,cnt,present){    
    if (present==str_structure) {
        structureInitial();
        show(present);
        hide(cnt,present);
        for (var i=0; i<cnt; i++){
            loadMolString(i,0,molArray,0,present);
        }
    } else if (present==str_scaffold) {
        scaffoldInitial();
        show(present);
        hide(cnt,present);
        for (var m=0; m<cnt; m++){
            loadMolString(m,0,molArray,15,present);
        }
    }  else if (present==str_alignment) {
        alignmentInitial();
        show(present);
        hide(cnt,present);
        for (var n=0; n<cnt; n++){
            loadMolString(n,0,molArray,65,present);
        }
    }  
}
//  @js chemdoodle加载小分子string
// 
function loadMolString(index,startNum,arr,magicNo,present){ 
    var tempCanvas = canMap.get(index+magicNo);
    var molecule = ChemDoodle.readMOL(arr[index+startNum].Mol);
    ChemDoodle.informatics.removeH(molecule);
    structureStyle(tempCanvas);
    tempCanvas.loadMolecule(molecule);
    if (!present.length) {
        //因为要添加骨架详情，所以才有了特殊的参数startNum。其余情况startNum都为0;
        $(".scafD-mol-name-" + index).text(arr[index+startNum].MolName);
    }   
}
function loaddrugsString(index,arr,magicNo){
    var tempCanvas = canMap.get(index+magicNo);
    var molecule = ChemDoodle.readMOL(arr[index].DrugMol);
    ChemDoodle.informatics.removeH(molecule);
    structureStyle(tempCanvas);
    tempCanvas.loadMolecule(molecule); 
}
//  @js 加载首页分子信息
function addMolInfo(molData,presentation){
    var currentMolCnt = molData.length;   
    //  加载mol数据
    if (presentation==str_structure) {
        showMol(molData,currentMolCnt,str_structure);
        for (var i = 0; i < currentMolCnt; i++) {
            $("#str-" + i + " .grid-molBtn .pull-left").html(libDetail.mols[str_startMolIndex+i].MolName);
            $("#str-" + i + " .js-str-molInfoPopup").attr("data-index",i);
            $("#str-" + i + " .tcell-ID").html(molData[i].Id);
            $("#str-" + i + " .tcell-Name").html(libDetail.mols[str_startMolIndex+i].MolName);
            $("#str-" + i + " .tcell-MW").html(libDetail.props[str_startMolIndex+i].MolWeight.toFixed(2));
            $("#str-" + i + " .tcell-ALogP").html(libDetail.props[str_startMolIndex+i].Alogp.toFixed(2));
            $("#str-" + i + " .tcell-HBD").html(libDetail.props[str_startMolIndex+i].Hbd);
            $("#str-" + i + " .tcell-HBA").html(libDetail.props[str_startMolIndex+i].Hba);
            $("#str-" + i + " .tcell-RB").html(libDetail.props[str_startMolIndex+i].RotBonds);
            $("#str-" + i + " .tcell-TPSA").html(libDetail.props[str_startMolIndex+i].Tpsa.toFixed(2));
            var radarChartEl = "radarChart" + i;
            var data=[libDetail.props[str_startMolIndex+i].MolWeight/1200,(libDetail.props[str_startMolIndex+i].Alogp+3)/15,libDetail.props[str_startMolIndex+i].Hbd/15,libDetail.props[str_startMolIndex+i].Hba/15,libDetail.props[str_startMolIndex+i].Tpsa/250,libDetail.props[str_startMolIndex+i].RotBonds/20];
            var dataLabel = [libDetail.props[str_startMolIndex+i].MolWeight,libDetail.props[str_startMolIndex+i].Alogp,libDetail.props[str_startMolIndex+i].Hba,libDetail.props[str_startMolIndex+i].Hbd,libDetail.props[str_startMolIndex+i].Tpsa,libDetail.props[str_startMolIndex+i].RotBonds];
            //console.log(dataLabel);
            generateRadar(data,dataLabel,radarChartEl);
        }
    } else if (presentation==str_scaffold) {
        showMol(molData,currentMolCnt,str_scaffold);
        for (var i = 0; i < currentMolCnt; i++) {
            $("#scaf-" + i + " .js-scaf-molInfoPopup").attr("data-index",i);
            $("#scaf-" + i + " .scaf-cid").html("CID: " + molData[i].Cid);
            $("#scaf-" + i + " .scaf-count").html("Mol Count: " + molData[i].Count);        
        }
    } else if (presentation==str_alignment) {
        showMol(molData,currentMolCnt,str_alignment);
        for (var i = 0; i < currentMolCnt; i++) {
            $("#alig-" + i + " .pull-right").html(libDetail.alignment[i].MolName);
            $("#alig-" + i + " .image").attr("data-index",i);       
        }
    }
}
//  @js 加载首页drug信息
function addDrugsInfo(molData){
    var currentMolCnt = molData.length;
    //1.初始化chemdoodle组件
    refMolInitial();
    drugInitial();
    show(str_drugs);
    hide(currentMolCnt,str_drugs);
    console.log(molData);
    var drugs_molArray = new Array(); 
    for (var i=0; i<currentMolCnt; i++){
        //2.添加小分子结构信息
        loaddrugsString(i,molData,50);
        var tempID = +molData[i].ReferenceId;       
        drugs_molArray.push(libDetail.mols[tempID]);
        loadMolString(i,0,drugs_molArray,35,str_drugs);
        //3.添加其余信息
        $("#drug-" + i + " .grid-molBtn .pull-left").html(molData[i].DrugbankId);
        $("#drug-" + i + " .grid-molBtn .pull-right").html("Sim: " + molData[i].Sim + "%");
        $("#drug-" + i + " .tcell-sim").html(molData[i].Sim + "%");
        $("#drug-" + i + " .tcell-cas").html(molData[i].CasNumber);
        $("#drug-" + i + " .tcell-dbID").html("<a href='https://www.drugbank.ca/drugs/" + molData[i].DrugbankId
            + "' target='_blank' rel='noopener noreferrer'>" + molData[i].DrugbankId + "</a>");
        $("#drug-" + i + " .tcell-name").html(molData[i].CommonName);
    }
    console.log(drugs_molArray);
}

/* @js  分子属性添加
***************************************************************************************************************/
//  @js 单个分子详细信息弹框
$(".js-str-molInfoPopup").on({
    mouseenter: function() {
        var molIndex= parseInt($(this).attr("data-index"));
        var elMolID = $(this).parent().find(".grid-molBtn .pull-left").html();
        var currentMol = str_perPageMolArr[molIndex];
        // @monitor mol对象监控
        if (!currentMol) {
            //alert("Failed to load the data");
            //console.log("currentMolObj not find! ==== event: ('.js-str-molInfoPopup').mouseenter();");
            return false;
        } else {
            structureStyle(sketcher30);
            var molecule1 = ChemDoodle.readMOL(currentMol.Mol);
            ChemDoodle.informatics.removeH(molecule1);
            sketcher30.loadMolecule(molecule1);

            $(".modal-title").text(libDetail.props[str_startMolIndex+molIndex].MolName);
            //chemdoodleInitial(currentMol.Mol);
            var radarChartEl = "selectRadar";
            var data=[libDetail.props[str_startMolIndex+molIndex].MolWeight/1200,(libDetail.props[str_startMolIndex+molIndex].Alogp+3)/15,libDetail.props[str_startMolIndex+molIndex].Hba/15,libDetail.props[str_startMolIndex+molIndex].Hbd/15,libDetail.props[str_startMolIndex+molIndex].Tpsa/250,libDetail.props[str_startMolIndex+molIndex].RotBonds/20];
            var dataLabel = [libDetail.props[str_startMolIndex+molIndex].MolWeight,libDetail.props[str_startMolIndex+molIndex].Alogp,libDetail.props[str_startMolIndex+molIndex].Hba,libDetail.props[str_startMolIndex+molIndex].Hbd,libDetail.props[str_startMolIndex+molIndex].Tpsa,libDetail.props[str_startMolIndex+molIndex].RotBonds];
            //console.log(dataLabel);
            generateRadar(data,dataLabel,radarChartEl);

            $(".singleMolInfo .singleMol_MW").text(libDetail.props[str_startMolIndex+molIndex].MolWeight.toFixed(2));
            $(".singleMolInfo .singleMol_RB").text(libDetail.props[str_startMolIndex+molIndex].RotBonds);
            $(".singleMolInfo .singleMol_HBD").text(libDetail.props[str_startMolIndex+molIndex].Hbd);
            $(".singleMolInfo .singleMol_HBA").text(libDetail.props[str_startMolIndex+molIndex].Hba);
            $(".singleMolInfo .singleMol_Alogp").text(libDetail.props[str_startMolIndex+molIndex].Alogp.toFixed(2));
            $(".singleMolInfo .singleMol_tpsa").text(libDetail.props[str_startMolIndex+molIndex].Tpsa.toFixed(2));
            $(".singleMolInfo .singleMol_note").text("There is no data");
        }
    },
    click: function(){
        // 弹出分子的详细信息框
        $('#myModal').modal('show');
        $(".scaffold-detail").hide();
        $(".mol-detail").show();
    }    
});

//  @js 单个骨架详细信息弹框
$(".js-scaf-molInfoPopup .fa").on({
    mouseenter: function() {
        $(".nextPage").parent().removeClass("disabled");
        $(".previousPage").parent().removeClass("disabled");


        // scafIndex代表当前骨架对象在整个骨架数组中的索引
        // currentScaf代表当前骨架对象
        scafD_MolArr=[];
        currentScaf=null;
        var scafIndex = parseInt($(this).parent().parent().attr("data-index"));      
        currentScaf = scaf_perPageMolArr[scafIndex];
        if (currentScaf.Count % 4 == 0) {
            scafD_maxPages = currentScaf.Count/4;
        } else {
            scafD_maxPages = Math.ceil(currentScaf.Count/4);
        }
        for (var i = 0; i < currentScaf.Count; i++) {
            var index = currentScaf.MolList[i]-1;
            scafD_MolArr.push(libDetail.mols[index]);
        }      
        // 初始化4个分子窗口
        scafDeatilShow();
        $(".modal-title").text("CID: " + libDetail.scaffold[scafIndex].Cid);
        //  只有一页分子
        if (currentScaf.Count<=4) {
            $(".previousPage").parent().addClass("disabled");
            $(".nextPage").parent().addClass("disabled");
            for(var i= currentScaf.Count; i<4; i++){
                $(".scafD-" + i).css("display","none");
            }
            for (var i=0; i<currentScaf.Count; i++){
                loadMolString(i,0,scafD_MolArr,31,"");
            }
        } else {
            $(".previousPage").parent().addClass("disabled");
            //  两页以上分子
            for (var i=0; i<4; i++){
                loadMolString(i,0,scafD_MolArr,31,"");
            }
        }
        
        
    },
    click: function(){
        // 弹出分子的详细信息框
        $('#myModal').modal('show');
        $(".mol-detail").hide();
        $(".scaffold-detail").show();
    }  
});
//  @js 骨架分子翻页 
$(".nextPage").click(function(e){
    //  @bug 添加disabled属性只是禁止点击，但点击事件依然在触发
    if ($(this).parent().hasClass("disabled")) {
        //只有一页或者已经到了最后一页
        e.preventDefault();
    } else {
        // 判断是不是首页
        //多页并且未到最后一页
        scafDCurrentPage += 1;
        startScafD = (scafDCurrentPage-1)*4;          
        if (scafDCurrentPage==scafD_maxPages) {
            // 最后一页
            $(".previousPage").parent().removeClass("disabled");
            $(this).parent().addClass("disabled");
            scafDeatilShow();                    
            for(var i1=(currentScaf.Count-startScafD) ; i1<4; i1++){                        
                $(".scafD-" + i1).css("display","none");                    }
            for (var i2=0; i2<(currentScaf.Count-startScafD); i2++){
                loadMolString(i2,startScafD,scafD_MolArr,31,"");
            }
        }
        if (scafDCurrentPage<scafD_maxPages) {
            e.preventDefault();
            // 非最后一页
            $(".previousPage").parent().removeClass("disabled");
            scafDeatilShow();
            for (var i3=0; i3<4; i3++){
                loadMolString(i3,startScafD,scafD_MolArr,31,"");
            }    
        }
    }
});

$(".previousPage").click(function(e){
    if ($(this).parent().hasClass("disabled")) {
        //只有一页或者已经到了第一页
        e.preventDefault();
    } else {
        e.preventDefault();
        scafDCurrentPage -= 1;
        startScafD = (scafDCurrentPage-1)*4;
        if(scafDCurrentPage==1) {
            $(this).parent().addClass("disabled");
            $(".nextPage").parent().removeClass("disabled");
        } 
        //非第一页
        if(scafDCurrentPage>1){                    
            $(".nextPage").parent().removeClass("disabled");    
        }
        //  全部加载初始化
        scafDeatilShow();
        for (var i4=0; i4<4; i4++){
            loadMolString(i4,startScafD,scafD_MolArr,31,"");
        }   
    }
});


/* @js  chemdoodle窗口下载功能
  @bug  ajax 不能下载文件 
***************************************************************************************************************/
//  所有分子下载
$(".js-dloadAllMol").on({
    click: function() {
        var url = "downloadLib?job_id=" + JobID;
        window.location.href=url;
    }
});

//  叠合后的所有分子下载
$(".js-dloadAlignMol").on({
    click: function() {
        var url = "ddownloadAlignedLib?job_id=" + JobID;
        window.location.href=url;
    }
});

