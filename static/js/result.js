/* ==============================================================

Project name : ChemProfiling
File name : JS script of Result.html
Author : RCDD Dujiewen
Version : v1.0.0
Created : 14 Jan  2017
Last update : 20 Feb  2017

============================================================== */
/*
**  global variable
*/

//  全局变量存储json信息
var libDetail;


//  每页加载的3dmol窗口数量:默认为15
var TDMolViewerCnt = 15;
var TDMolStartNo = 0;
var TDMolEndNo = 0;

var str_perPageMolArr = new Array();
var scaf_perPageMolArr = new Array();
var alig_perPageMolArr = new Array();
var drugs_perPageMolArr = new Array();

var str_startMolIndex=0;
var scaf_startMolIndex=0;
var scafD_startMolIndex=0;
var alig_startMolIndex=0;
var drugs_startMolIndex=0;

//  每次更新str_perPageMolArr时更新molsProperty的下标
var str_currentPage = 1;
var scaf_currentPage = 1;
var alig_currentPage = 1;
var drugs_currentPage = 1;

var str_maxPages = 1;
var scaf_maxPages = 1;
var alig_maxPages = 1;
var scafD_maxPages = 1;
var drugs_maxPages = 1;

var str_structure="structure";
var str_scaffold="scaffold";
var str_alignment="alignment";
var str_drugs = "drugs";

//  每次关闭scaffold详情弹框时重置起始分子索引
//  2.定义翻页的操作
var startScafD = 0;
var scafDCurrentPage = 1;
var scafD_MolArr= new Array();
var currentScaf= new Object();

//  定义Jobid
var JobID;

var glviewer = null;

var TDMap = getMap();
var canMap = getMap();
function getMap() {
    var map_ = new Object();    
    map_.put = function(key, value) {    
        map_[key+'_'] = value;    
    };    
    map_.get = function(key) {    
        return map_[key+'_'];    
    };    
    map_.remove = function(key) {    
        delete map_[key+'_'];  
    };     
    return map_;
}

/*  @js 辅助功能
***************************************************************************************************************/
//  @js 获取地址栏的jobid,用正则
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

Array.prototype.removeByValue = function(val) {
  for(var i=0; i<this.length; i++) {
    if(this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
}
/*  @js 数据加载
***************************************************************************************************************/
$(function(){
    JobID = GetQueryString("jobid");
    //  @TODO:  添加loading效果
    //maskInitial();
    //  @js 请求分析结果
    $.ajax({
        url:"profiling",
        type: "POST",
        timeout:180000,
        data: {
            jobid: JobID
        },
        dataType: "html",
        error: function(jqXHR, textStatus, errorThrown){
            if(textStatus=="timeout"){
                alert("Request timeout, please resubmit the task.");
            }else{
                alert(textStatus);
            }
        }
    }).done(loadData);
});
//  @js 处理返回的数据
function loadData(msg){
    var tempDetail = JSON.parse(msg);
    var date1 = new Date();
    console.log("loadData=====" + date1.getMinutes() + date1.getSeconds() + "__" + date1.getMilliseconds());
    if (tempDetail.State != "success") {        
        alert("No data returned from the server.");
        $(".inner").hide();
        $(".errorTips").show();
        $(".returnPreview").on('click',function(event) {
            event.preventDefault();
            window.history.go(-1);
            /* Act on the event */
        });
        //  @todo: 返回上一个页面，即带有输入文件的service页面
    } else {
        libDetail = tempDetail.Data;
        var jobType = libDetail.job.JobType;
        console.log(libDetail);
        if (jobType.indexOf("structure")>=0){
            var molCount = libDetail.mols.length;
            // 向每页的mol数组中添加结构数据
            if (TDMolViewerCnt<=molCount) {
                for (var i = 0; i < TDMolViewerCnt; i++) {
                    str_perPageMolArr.push(libDetail.mols[i]);
                }
                //endMolIndex = TDMolViewerCnt-1;
            } else {
                for (var i = 0; i < molCount; i++) {
                    str_perPageMolArr.push(libDetail.mols[i]);
                }
                //endMolIndex = molCount-1;
            }
            
            addMolInfo(str_perPageMolArr,str_structure);
            //初始化翻页组件
            //  @js jqPagination初始化
            if (molCount%TDMolViewerCnt===0) {
                str_maxPages = molCount/TDMolViewerCnt
            } else {
                str_maxPages = Math.ceil(molCount/TDMolViewerCnt);
            }
            str_currentPage = 1;
            $(".str_pagination").jqPagination({            
                current_page: str_currentPage, 
                max_page    : str_maxPages, 
                paged   : function(page) {
                    //点击页码要做的操作                
                    page = parseInt(page, 10);
                    str_currentPage = page;   
                    var startMol = (page-1)*TDMolViewerCnt;
                    var endMol = page*TDMolViewerCnt -1;
                    if (endMol<=molCount) {
                        str_perPageMolArr = [];
                        str_perPageMolArr = libDetail.mols.slice(startMol,endMol+1);
                        str_startMolIndex = startMol;
                        addMolInfo(str_perPageMolArr,str_structure);
                    } else {
                        str_perPageMolArr = [];
                        str_perPageMolArr = libDetail.mols.slice(startMol);
                        str_startMolIndex = startMol;
                        addMolInfo(str_perPageMolArr,str_structure);
                    }
                }
            });
            $(".inner").hide();
            $(".tab-group").show();
            $("label[data-name='structure'], section[data-name='structure']").show();
        }
        if (jobType.indexOf("diversity")>=0) {
            $("label[data-name='diversity']").show();
            for (var i = 0,MW_length = libDetail.des.MolWeight.length; i < MW_length; i++) {
                libDetail.des.MolWeight[i] = Math.round(libDetail.des.MolWeight[i]);
            }
            var imgRelation = {
                MW: "#distribution-chart0",
                Alogp: "#distribution-chart1",
                Hba: "#distribution-chart2",
                Hbd: "#distribution-chart3",
                Tpsa: "#distribution-chart4",
                Rb: "#distribution-chart5",
                HeatMap: "#heatMap"
            };
            generateUniformHistogram(10,libDetail.des.MolWeight,imgRelation.MW);
            generateUniformHistogram(10,libDetail.des.Alogp,imgRelation.Alogp);
            generateUniformHistogram(10,libDetail.des.Hba,imgRelation.Hba);
            generateUniformHistogram(10,libDetail.des.Hbd,imgRelation.Hbd);
            generateUniformHistogram(10,libDetail.des.Tpsa,imgRelation.Tpsa);
            generateUniformHistogram(10,libDetail.des.RotBonds,imgRelation.Rb);

            var heatMapFileUrl = "jobs/" + JobID + "/distance.csv";
            generateHeatmap(imgRelation.HeatMap,heatMapFileUrl);

            var pcaFileUrl = "jobs/" + JobID + "/pca.csv";
            generateScatterplot("#pcaPlot",pcaFileUrl);
        }
        if (jobType.indexOf("scaffold")>=0) { 
            $("label[data-name='scaffold']").show();       
            var scafCount = libDetail.scaffold.length;
            if (scafCount) {
                // 向每页的mol数组中添加结构数据
                if (TDMolViewerCnt<=scafCount) {
                    for (var i = 0; i < TDMolViewerCnt; i++) {
                        scaf_perPageMolArr.push(libDetail.scaffold[i]);
                    }
                } else {
                    for (var i = 0; i < scafCount; i++) {
                        scaf_perPageMolArr.push(libDetail.scaffold[i]);
                    }
                }
                addMolInfo(scaf_perPageMolArr,str_scaffold);
                //初始化翻页组件
                //  @js jqPagination初始化
                if (scafCount%TDMolViewerCnt===0) {
                    scaf_maxPages = scafCount/TDMolViewerCnt
                } else {
                    scaf_maxPages = Math.ceil(scafCount/TDMolViewerCnt);
                }
                scaf_currentPage = 1;
                $(".scaf_pagination").jqPagination({
                    current_page: scaf_currentPage, 
                    max_page    : scaf_maxPages, 
                    paged   : function(page) {
                        //点击页码要做的操作                
                        page = parseInt(page, 10);
                        scaf_currentPage = page;   
                        var startMol = (page-1)*TDMolViewerCnt;
                        var endMol = page*TDMolViewerCnt -1;
                        if (endMol<=scafCount) {
                            scaf_perPageMolArr = [];
                            scaf_perPageMolArr = libDetail.scaffold.slice(startMol,endMol+1);
                            scaf_startMolIndex = startMol;
                            addMolInfo(scaf_perPageMolArr,str_scaffold);
                        } else {
                            scaf_perPageMolArr = [];
                            scaf_perPageMolArr = libDetail.scaffold.slice(startMol);
                            scaf_startMolIndex = startMol;
                            addMolInfo(scaf_perPageMolArr,str_scaffold);
                        }
                    }
                });
            } else {
                $(".scaffold-display .grid").hide();
                $(".scaffold-display .JQ_pagination").hide();
                $(".scaffold-display .noResultTips").show();
            }          
        }
        if (jobType.indexOf("target")>=0) {
            $("label[data-name='target']").show();
            var columns = [
                [{
                    field:"Molchembl_id",
                    title:"Mol",
                    colspan: 1,
                    rowspan: 2,
                    sortable: true,
                    switchable: true,
                    align: "center",
                    valign: "middle"
                },{
                    field:"Pref_name",
                    title:"Target",
                    colspan: 1,
                    rowspan: 2,
                    sortable: true,
                    switchable: true,
                    align: "center",
                    valign: "middle"
                },{
                    field:"Organism",
                    title:"Organism",
                    colspan: 1,
                    rowspan: 2,
                    sortable: true,
                    align: "center",
                    valign: "middle"
                },{
                    field:"Target_type",
                    title:"Target type",
                    colspan: 1,
                    rowspan: 2,
                    sortable: true,
                    visible: false,
                    align: "center",
                    valign: "middle"
                },{
                    field:"Chembl_id",
                    title:"Target ID",
                    colspan: 1,
                    rowspan: 2,
                    sortable: true,
                    visible: false,
                    align: "center",
                    valign: "middle"
                },{
                    title:"Activity",
                    colspan: 4,
                    rowspan: 1,
                    align: "center"
                },{
                    field:"Pubmed_id",
                    title:"Pubmed",
                    colspan: 1,
                    rowspan: 2,
                    sortable: true,
                    visible: false,
                    align: "center",
                    valign: "middle"
                },{
                    field:"Reference",
                    title:"Reference",
                    colspan: 1,
                    rowspan: 2,
                    sortable: true,
                    align: "center",
                    valign: "middle"
                }],
                [{
                    field:"Standard_type",
                    title:"Type",
                    colspan: 1,
                    rowspan: 1,
                    sortable: true,
                    align: "center"
                },{
                    field:"Standard_relation",
                    title:"Relation",
                    colspan: 1,
                    rowspan: 1,
                    align: "center"
                },{
                    field:"Standard_value",
                    title:"Value",
                    colspan: 1,
                    rowspan: 1,
                    sortable: true,
                    align: "center"
                },{
                    field:"Standard_units",
                    title:"Unit",
                    colspan: 1,
                    rowspan: 1,
                    sortable: true,
                    align: "center"
                }]   
            ];
            if (!libDetail.targets) {
                console.info("NO target");
                $(".tatgetTable").bootstrapTable({
                    data: "",
                    columns: columns
                });
            } else {
                $(".tatgetTable").bootstrapTable({
                    data: libDetail.targets,
                    columns: columns
                });
            }
        }
        if (jobType.indexOf("drugs")>=0) {
            $("label[data-name='drugs']").show();      
            var drugsCount = libDetail.drugs.length;
            // 向每页的mol数组中添加结构数据
            if (TDMolViewerCnt<=drugsCount) {
                for (var i = 0; i < TDMolViewerCnt; i++) {
                    drugs_perPageMolArr.push(libDetail.drugs[i]);
                }
            } else {
                for (var i = 0; i < drugsCount; i++) {
                    drugs_perPageMolArr.push(libDetail.drugs[i]);
                }
            }
            addDrugsInfo(drugs_perPageMolArr);
            //初始化翻页组件
            //  @js jqPagination初始化
            if (drugsCount%TDMolViewerCnt===0) {
                drugs_maxPages = drugsCount/TDMolViewerCnt
            } else {
                drugs_maxPages = Math.ceil(drugsCount/TDMolViewerCnt);
            }
            drugs_currentPage = 1;
            $(".drugs_pagination").jqPagination({
                current_page: drugs_currentPage, 
                max_page    : drugs_maxPages, 
                paged   : function(page) {
                    //点击页码要做的操作                
                    page = parseInt(page, 10);
                    drugs_currentPage = page;   
                    var startMol = (page-1)*TDMolViewerCnt;
                    var endMol = page*TDMolViewerCnt -1;
                    if (endMol<=drugsCount) {
                        drugs_perPageMolArr = [];
                        drugs_perPageMolArr = libDetail.drugs.slice(startMol,endMol+1);
                        drugs_startMolIndex = startMol;
                        addDrugsInfo(drugs_perPageMolArr,str_drugs);
                    } else {
                        drugs_perPageMolArr = [];
                        drugs_perPageMolArr = libDetail.drugs.slice(startMol);
                        drugs_startMolIndex = startMol;
                        addDrugsInfo(drugs_perPageMolArr,str_drugs);
                    }
                }
            });
        }
        if (jobType.indexOf("alignment")>=0) {
            $("label[data-name='alignment']").show();
            $(".mainMol input").iCheck({
                checkboxClass: 'icheckbox_flat-orange',
                radioClass: 'iradio_flat-orange',
                increaseArea: '20%' // optional
            });
            var element1 = $(".TDMol-content");
            var config1 = { backgroundColor: 'white' };
            glviewer = $3Dmol.createViewer( element1, config1 );

            var aligCount = libDetail.alignment.length;
            if (aligCount) {
                // 向每页的mol数组中添加结构数据
                if (6<=aligCount) {
                    for (var i = 0; i < 6; i++) {
                        alig_perPageMolArr.push(libDetail.alignment[i]);
                    }
                } else {
                    for (var i = 0; i < aligCount; i++) {
                        alig_perPageMolArr.push(libDetail.alignment[i]);
                    }
                }
                addMolInfo(alig_perPageMolArr,str_alignment);

                // checkbox选中状态
                var selectedMols = new Array();
                $(".mainMol input").on('ifChecked', function(event){
                    var molIndex = $(this).parents(".image").attr("data-index");
                    if ($.inArray(molIndex, selectedMols)<0) {
                        selectedMols.push(molIndex);
                        $(".js-viewSelectedMol .dropdown-menu").append("<li class='dj_" + molIndex + "'><a style='position: relative;'><span>" + libDetail.alignment[molIndex].MolName
                            + "</span></a></li>");
                        var v = glviewer.addAsOneMolecule( libDetail.alignment[molIndex].Mol + "$$$$\n", "sdf");
                        /*if (molStyle == "line") {
                            v.setStyle({},{line:{colorscheme:"orangeCarbon",radius:0.1}});
                        } else {
                            v.setStyle({},{stick:{radius:0.1}});
                        }*/
                        glviewer.zoomTo();
                        glviewer.render();
                        return;
                    }  
                });
                // checkbox取消选中状态
                $(".mainMol input").on('ifUnchecked', function(event) {
                    var molIndex = $(this).parents(".image").attr("data-index");
                    selectedMols.removeByValue(molIndex);
                    $(".js-viewSelectedMol .dropdown-menu .dj_" + molIndex).remove();
                    //更新glviewer
                    glviewer.removeAllModels();
                    for (var i = 0, len = selectedMols.length; i < len; i++) {
                        var v = glviewer.addAsOneMolecule( libDetail.alignment[selectedMols[i]].Mol + "$$$$\n", "sdf");
                        /*if (molStyle == "line") {
                            v.setStyle({},{line:{colorscheme:"orangeCarbon",radius:0.1}});
                        } else {
                            v.setStyle({},{stick:{radius:0.1}});
                        }*/
                    }
                    glviewer.render();
                });

                //初始化翻页组件
                if (aligCount%6===0) {
                    alig_maxPages = aligCount/6;
                } else {
                    alig_maxPages = Math.ceil(aligCount/6);
                }
                alig_currentPage = 1;
                $(".alig_pagination").jqPagination({
                    current_page: alig_currentPage, 
                    max_page    : alig_maxPages,
                    paged   : function(page) {
                        //点击页码要做的操作                
                        page = parseInt(page, 10);
                        alig_currentPage = page;   
                        var startMol = (page-1)*6;
                        var endMol = page*6 -1;
                        if (endMol<=aligCount) {
                            alig_perPageMolArr = [];
                            alig_perPageMolArr = libDetail.alignment.slice(startMol,endMol+1);
                            alig_startMolIndex = startMol;
                            addMolInfo(alig_perPageMolArr,str_alignment);
                        } else {
                            alig_perPageMolArr = [];
                            alig_perPageMolArr = libDetail.alignment.slice(startMol);
                            alig_startMolIndex = startMol;
                            addMolInfo(alig_perPageMolArr,str_alignment);
                        }
                        //  1.移除所有checkBox的checked状态 
                        //$(".mainMol input").iCheck('uncheck');
                        //  2.检测当前页的元素是否以前选中过,选中则增加checked状态,未选中过则移除check状态
                        for (var m = 0; m < 6; m++) {
                            var _index = startMol+m+"";             
                            if (!($.inArray(_index, selectedMols)<0)){
                               $("#alig-" + m +" input").iCheck('check');
                            } else {
                                $("#alig-" + m +" input").iCheck('uncheck');
                            }
                        }   
                    }
                });

                /*  @js 3DMol分子样式改变
                **************************************************************************************************************/
                var colorSS = function(viewer) {
                    //color by secondary structure
                    var m = viewer.getModel();
                    m.setColorByFunction({}, function(atom) {
                        if(atom.ss == 'h') return "aqua";
                        else if(atom.ss == 's') return "aqua";
                        else return "aqua";
                    });
                    viewer.render();
                }
                $("button[value='Stick']").on({
                    click:function(){
                        molStyle = "stick";
                        glviewer.setStyle({},{stick:{radius:0.1}});
                        glviewer.render();
                    }
                });
                $("button[value='Line']").on({
                    click:function(){
                        molStyle = "line";
                        glviewer.setStyle({},{line:{colorscheme:"orangeCarbon",radius:0.2}});
                        glviewer.render();
                    }
                });
                $("button[value='Recenter']").on({
                    click:function(){
                        glviewer.zoomTo();
                    }
                });
            
            } else {
            }            
        }       
    }   
}