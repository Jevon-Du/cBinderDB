/*
**  2017-01-10
**  作者：RCDD杜杰文
**  功能：文件上传,分析功能选择
**
*/
//  @bug:拖拽上传文件
//  @js section1:文件上传插件初始化
$("#molsFile").fileinput({
    uploadUrl: '/',
    maxFileCount: 1,
    showUpload:false,
    overwriteInitial: false,
    maxFileSize: 5000,
    fileType: "any",
    initialPreviewAsData: false, // allows you to set a raw markup
    dropZoneTitle:"Upload SD/TXT file here …",
    previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
    //allowedFileTypes: ['image', 'video', 'flash'],
    slugCallback: function(filename) {
        return filename.replace('(', '_').replace(']', '_');
    }
});

//  @js document ready function
$(function(){
    //  @js switch初始化
    $(".analysis-tool input").iCheck({
        checkboxClass: 'icheckbox_flat-orange',
        radioClass: 'iradio_flat-orange',
        increaseArea: '20%' // optional
    });
    $(".file-type input").iCheck({
        checkboxClass: 'icheckbox_flat-orange',
        radioClass: 'iradio_flat-orange',
        increaseArea: '20%' // optional
    });

    
    var el_file = document.getElementsByClassName("file-drop-zone")[0];
    //  文件拖拽监听
    var dropFlag = false;
    el_file.addEventListener("dragenter", function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

    el_file.addEventListener("dragover", function (e) {
        e.dataTransfer.dropEffect = "copy";
        e.stopPropagation();
        e.preventDefault();
    });

    el_file.addEventListener("drop", function (e) {
        dropFileObj = e.dataTransfer.files[0];
        dropFlag = true;
    });
    /******************************任务提交 条件判断********************************/
    $(".jsSubmit").on({
        click: function(){
            // 获取上传文件对象
            // @bug 拖拽的文件会报错document.getElementById("molsFile").files[0] = undefined
            var fileObj;
            if (dropFlag) {
                //  拖拽文件上传
                fileObj = dropFileObj;
            } else {
                //  浏览文件上传
                var el_file1 = document.getElementById("molsFile");
                fileObj = el_file1.files[0];
            }
            console.log(fileObj);
            var fileNameSplit;
            var formData = new FormData();
            var fileTypeIsChecked = $(".file-type input").is(':checked');
            var toolIsChecked = $(".analysis-tool input").is(':checked');
            var textareaVal = $(".paste-textarea textarea").val();

            if ( fileObj ){
                fileNameSplit = fileObj.name.toUpperCase().split(".");
                //  @js 倒叙遍历数组，来判断"."分割后最后一个字符是否含有"SD/SDF/TXT" 
                for (var i= fileNameSplit.length - 1; i>=0 ; i--){
                    if (i = fileNameSplit.length - 1) {
                        if (fileNameSplit[i] == "SD" || fileNameSplit[i] == "SDF" || fileNameSplit[i] == "TXT" || 
                            fileNameSplit[i] == "CDX" || fileNameSplit[i] == "SMI" || fileNameSplit[i] == "INCHI"){
                            break;
                        } else {
                            alert("The file format is wrong, please re-upload a SDF file or TXT File!");
                            return false;
                        }
                    }
                }
                if (!fileTypeIsChecked && !toolIsChecked) {
                    $(".file-type").removeClass("panel-danger panel-success");                   
                    $(".file-type").addClass("panel-danger");
                    $(".tools-option").removeClass("panel-danger panel-success");
                    $(".tools-option").addClass("panel-danger");
                    alert("Please choose option!");
                    return false;
                }
                if (fileTypeIsChecked && !toolIsChecked) {
                    $(".file-type").removeClass("panel-danger panel-success");
                    $(".file-type").addClass("panel-success");
                    $(".tools-option").removeClass("panel-danger panel-success");
                    $(".tools-option").addClass("panel-danger");
                    alert("Please choose option!");
                    return false;
                }
                if (!fileTypeIsChecked && toolIsChecked){
                    $(".file-type").removeClass("panel-danger panel-success");
                    $(".file-type").addClass("panel-danger");
                    $(".tools-option").removeClass("panel-danger panel-success");
                    $(".tools-option").addClass("panel-success");
                    alert("Please choose option!");
                    return false;
                }
                if (fileTypeIsChecked && toolIsChecked){                              
                    $(".file-type").removeClass("panel-danger panel-success");
                    $(".file-type").addClass("panel-success");                    
                    $(".tools-option").removeClass("panel-danger panel-success");
                    $(".tools-option").addClass("panel-success");
                    //  获取参数，提交任务
                    var fileTypeChecked = $(".file-type input[name='iCheck']:checked").attr("id").toUpperCase().split("_",1).join();
                    var toolsCheckedObj = $(".analysis-tool input[type='checkbox']:checked");
                    var toolsChecked = [];
                    toolsCheckedObj.each(function(){
                        toolsChecked.push($(this).attr("name"));
                    });
                    //  向formdata添加数据
                    formData.append("isFile",true);
                    formData.append("molFile", fileObj);                    
                    formData.append("analysisMethod", toolsChecked);
                    formData.append("fileType", fileTypeChecked);                   
                    $(".loading").show();
                    $.ajax({
                        url: "/job",
                        type: "POST",
                        data: formData,
                        dataType: "html",
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false   // 告诉jQuery不要去设置Content-Type请求头
                    }).done(HandleJob);                           
                }
                return;
            } else if ( textareaVal ){
                if (!fileTypeIsChecked && !toolIsChecked) {
                    $(".file-type").removeClass("panel-danger panel-success");                   
                    $(".file-type").addClass("panel-danger");
                    $(".tools-option").removeClass("panel-danger panel-success");
                    $(".tools-option").addClass("panel-danger");
                    alert("Please choose option!");
                    return false;
                }
                if (fileTypeIsChecked && !toolIsChecked) {
                    $(".file-type").removeClass("panel-danger panel-success");
                    $(".file-type").addClass("panel-success");
                    $(".tools-option").removeClass("panel-danger panel-success");
                    $(".tools-option").addClass("panel-danger");
                    alert("Please choose option!");
                    return false;
                }
                if (!fileTypeIsChecked && toolIsChecked){
                    $(".file-type").removeClass("panel-danger panel-success");
                    $(".file-type").addClass("panel-danger");
                    $(".tools-option").removeClass("panel-danger panel-success");
                    $(".tools-option").addClass("panel-success");
                    alert("Please choose option!");
                    return false;
                }
                if (fileTypeIsChecked && toolIsChecked){                              
                    $(".file-type").removeClass("panel-danger panel-success");
                    $(".file-type").addClass("panel-success");                    
                    $(".tools-option").removeClass("panel-danger panel-success");
                    $(".tools-option").addClass("panel-success");
                    //  获取参数，提交任务
                    var fileTypeChecked = $(".file-type input[name='iCheck']:checked").attr("id").toUpperCase().split("_",1).join();
                    var toolsCheckedObj = $(".analysis-tool input[type='checkbox']:checked");
                    var toolsChecked = [];
                    toolsCheckedObj.each(function(){
                        toolsChecked.push($(this).attr("name"));
                    });
                    //  向formdata添加数据
                    formData.append("isFile",false);
                    formData.append("molText", textareaVal);                   
                    formData.append("analysisMethod", toolsChecked);
                    formData.append("fileType", fileTypeChecked);                
                    $(".loading").show();
                    $.ajax({
                        url: "job",
                        type: "POST",
                        data: formData,
                        dataType: "html",
                        processData: false,  // 告诉jQuery不要去处理发送的数据
                        contentType: false   // 告诉jQuery不要去设置Content-Type请求头
                    }).done(HandleJob);                           
                }
            } else {
                alert("Please upload a text file containing the mol structures!");
                return false;
            }
        }
    });    
});

function HandleJob(msg){
    var jobState = JSON.parse(msg);
    console.log(jobState);
    if (jobState.State != "success"){
        alert("Failed to submit the job. Please resubmit mols File.");
        return false;
    } else {
        if (window.localStorage) {
            localStorage.setItem("jobID", jobState.Data.JobId);
        } else {
            Cookie.write("jobID", jobState.Data.JobId);
        } 
        window.location.href = "result?jobid=" + jobState.Data.JobId;
    }
}