
var desiredWidth;
var imageStr = "/static/image/placeholder.png";
var degree = 0;
var cropper_switch = false;
$(document).ready(function() {
    ///////////// mathjax setting ////////////////////
    MathJax.Hub.Register.StartupHook("MathEvents Ready", function () {
        var HUB = MathJax.Hub, MENUSETTINGS = HUB.config.menuSettings;
        var EVENT = MathJax.Extension.MathEvents.Event;
        var MENU = MathJax.Menu;
        EVENT.Click = function(event) {
            if (MENU) {
              var jax = HUB.getJaxFor(this);     
              var latex = jax.originalText;
              var beg_pos = latex.indexOf("}{");
              latex = latex.substring(beg_pos+2,latex.length-1);         
              msg = "latex: " + latex;
              alert(msg);
            } else {
              MathJax.Callback.Queue(
                ["Require",MathJax.Ajax,"[MathJax]/extensions/MathMenu.js"],
                ["Click",this,{}]
              );
            }
            return EVENT.False(event);
        }
        if (MENUSETTINGS.zoom === "Click") MENUSETTINGS.zoom = "None";
        MathJax.Hub.Register.StartupHook("MathMenu Ready", function () {
            MENU = MathJax.Menu;
            MENU.menu.Find("Math Settings", "Zoom Trigger","Click").disabled = true;
        });
    });
    $("#takePictureField").on("change", function(event){
       file = event.target.files
       gotPic(file);
    });
    desiredWidth = window.innerWidth;
 
    if(!("url" in window) && ("webkitURL" in window)) {
        window.URL = window.webkitURL;   
    }
 
    $("#capture_image").attr("src", imageStr);

    $('#submit').click(ev_submit);
    $('#submit_webkit').click(ev_submit_webkit);
    $('#submit_paisou').click(ev_submit_paisou);
    //$('#logout').click(ev_logout);    
    $('#turn_left').click(ev_turn_left);    
    $('#turn_right').click(ev_turn_right);
    $('#mode_switch').click(mode_switch_event);


    $("#image_area").on('dragenter', function(event) {
    });
    $("#image_area").on('dragover', function(event) {
        event.preventDefault()
    });
    $("#image_area").on('dragleave', function(event) {
    });
    $("#image_area").on('drop', function(event) {
        event.preventDefault();
        event.dataTransfer = event.originalEvent.dataTransfer;
        file = event.dataTransfer.files;
        gotPic(file);
         
    });
    $("#getCroppedCanvas").hide();
    $("#submit_paisou").hide();

    // window.addEventListener('paste', ... or
    document.onpaste = function(event){
        var items = event.clipboardData.items;
        var blob = items[0].getAsFile();
        var reader = new FileReader();
        reader.onload = function(event){
            imageStr = event.target.result;
            $("#capture_image").attr("src",imageStr);
            $("#debug_image").attr("src",'');
            $('#recognize_text').html('');
        }; 
        reader.readAsDataURL(blob);
    };
    if (cropper_switch){
        cropper();
    }
});

/**
* Rotates base64 image string iether 
* clockwise or counterclockwise
*
* @param isClockwise - true or false
*
* WARNING!!! Method not null save - assumes all input data are valid
*/
function rotateBase64Image90deg(base64Image, isClockwise) {
    // create an off-screen canvas
    var offScreenCanvas = document.createElement('canvas');
    offScreenCanvasCtx = offScreenCanvas.getContext('2d');
    var cropper_switch = false;
    // cteate Image
    var img = new Image();
    img.src = base64Image;

    // set its dimension to rotated size
    offScreenCanvas.height = img.width;
    offScreenCanvas.width = img.height;

    // rotate and draw source image into the off-screen canvas:
    if (isClockwise) { 
        offScreenCanvasCtx.rotate(90 * Math.PI / 180);
        offScreenCanvasCtx.translate(0, -offScreenCanvas.width);
    } else {
        offScreenCanvasCtx.rotate(-90 * Math.PI / 180);
        offScreenCanvasCtx.translate(-offScreenCanvas.height, 0);
    }
    offScreenCanvasCtx.drawImage(img, 0, 0);

    // encode image to data-uri with base64
    return offScreenCanvas.toDataURL();
}


function ev_turn_left(ev){
    if(imageStr != null && imageStr.length > 0 ){
        $('#turn_left').prop("disabled", true);
        $('#recognize_text').html('正在旋转...')
        imageStr = rotateBase64Image90deg(imageStr, false);
        $("#capture_image").attr("src", imageStr);
        $('#recognize_text').html('旋转完成.');
        $('#turn_left').prop("disabled", false);
    }
}

function ev_turn_right(ev){
    if(imageStr != null && imageStr.length > 0 ){
        $('#turn_right').prop("disabled", true);
        $('#recognize_text').html('正在旋转...');
        imageStr = rotateBase64Image90deg(imageStr, true);
        $("#capture_image").attr("src", imageStr);
        $('#recognize_text').html('旋转完成.');
        $('#turn_right').prop("disabled", false);
    }
}
function gotPic(files) {
    if(files.length == 1 && 
       files[0].type.indexOf("image/") == 0) {

        var reader = new FileReader();
        reader.onload = function(e){
            imageStr = e.target.result;
            $("#capture_image").attr("src",imageStr);
            if (cropper_switch){
                $('#capture_image').cropper('replace', imageStr);
            }
            $("#debug_image").attr("src",'');
            $('#recognize_text').html('');
        };
        reader.readAsDataURL(files[0]);
    }
    $("#takePictureField").val("");
}

function as_display_latex(content){
    //new line
    content = content.replace(new RegExp('\r?\n','g'), '<br />');
    var result = "";
    beg_token = "<tex>";
    end_token = "</tex>";
    var beg_pos = 0;
    var end_pos = 0;
    var color_list = new Array();
    color_list[0] = '#ff0000';
    color_list[1] = '#00ff00';
    color_list[2] = '#0000ff';
    var color_num = color_list.length;
    var color_index = 0;
    while(true){
        //find begin token
        beg_pos = content.indexOf(beg_token, end_pos);
        if(beg_pos == -1){
            break;
        }
        //copy content before formula
        result += content.substring(end_pos, beg_pos);
        //find end token
        end_pos = content.indexOf(end_token, beg_pos);
        if(end_pos == -1){
            break;
        }
        //replace begin token
        result += '$ \\color{' + color_list[color_index++ % color_num] + '}{ ';
        //copy formula
        result += content.substring(beg_pos + beg_token.length, end_pos)
        //replace end token
        result += ' }$';
        //move end pos
        end_pos += end_token.length
    }
    if(end_pos < content.length){
        //copy content after last formula
        result += content.substring(end_pos, content.length);
    }
    return result;
}
//submit stroke data
function ev_submit(ev){
    if(!imageStr){
        alert('image is not selected.')
        return;
    }
    $('#submit').prop("disabled", true);
    $('#recognize_text').html('正在识别...');
    $("#debug_image").attr("src",'');
    $.post('/api/ocr',
        {image: imageStr},
        function (result) { 
            result = JSON.parse(result);
//            console.log('result', result.details)
            visualize_image = result.visualize_image;
//            var base64 = new Base64();
              result_content = result.details
//            result_content = base64.decode(result.details);
//            result_content = JSON.parse(result_content).app_content;
            //for html display
            result_content = as_display_latex(result_content);
            $('#recognize_text').html(result_content);
            $('#debug_image').attr('src', visualize_image);
            MathJax.Hub.Typeset();
        }   
    ).always(function(){
        $('#submit').prop("disabled", false);
    });  
}

function ev_submit_webkit(ev){
    if(!imageStr){
        alert('image is not selected.')
        return;
    }
    
    $('#submit_webkit').prop("disabled", true);
    $('#recognize_text').html('正在识别...');
    $("#debug_image").attr("src",'');
    $.post('/api/ocr_webkit',
        {image: imageStr},
        function (result) {
            result = JSON.parse(result);
//            console.log('result', result.details)
//            visualize_image = result.visualize_image;
//            var base64 = new Base64();
              result_content = result.details
//            result_content = base64.decode(result.details);
//            result_content = JSON.parse(result_content).app_content;
            //for html display
            result_content = as_display_latex(result_content);
            $('#recognize_text').html(result_content);
//            $('#debug_image').attr('src', visualize_image);
            MathJax.Hub.Typeset();
        }
    ).always(function(){
        $('#submit_webkit').prop("disabled", false);
    });
}


function ev_submit_paisou(ev){
    if(!imageStr){
        alert('image is not selected.')
        return;
    }
    var cas=$('#capture_image').cropper('getCroppedCanvas');
    var cropper_img =cas.toDataURL();
    $('#submit_webkit').prop("disabled", true);
    $('#recognize_text').html('正在识别...');
    $("#debug_image").attr("src",'');
    $.post('/api/paisou',
        {image: cropper_img},
        function (result) {
            result = JSON.parse(result);
            var search_result = "";
            for(var item in result){
                res = "<div> <div><h4><font color=\"blue\">问题:</font></h4></div> "+result[item].stem_html
                +"<div><h4><font color=\"blue\">答案</font></h4>"+result[item].answer_original +"</div>  </div><br/>"
                search_result += res
            }
 
            result_content = as_display_latex(search_result);
            $('#recognize_text').html(result_content);
//            $('#debug_image').attr('src', visualize_image);
            MathJax.Hub.Typeset();
        }
    ).always(function(){
        $('#submit_webkit').prop("disabled", false);
    });
}


function cropper(){
    $('#capture_image').cropper({
            //aspectRatio: free,
            viewMode: 1,
            dragMode: 'none',
            preview: ".small",
            responsive: false,
            restore: false,
            ready: function () {
                console.log("ready");
                $(this).cropper('crop');
            },
            cropstart: function (e) {
                console.log(e);
                console.log("cropstart");
            },
            cropmove: function (e) {
                console.log("cropmove");
            },
            cropend: function (e) {
                console.log("cropend");
            },

            crop: function (event) {
                console.log("crop");
            },
            zoom: function (event) {
                console.log("zoom");

            },
        });
        $("#getCroppedCanvas").on("click", function () {
            var cas=$('#capture_image').cropper('getCroppedCanvas');
            var base64url=cas.toDataURL();
            $('.cavans').html(cas)
        })
}

function mode_switch_event(){
    // var mode = document.getElementById("mode_switch").innerHTML;
    var mode = $("#mode_switch").text();
    console.log("mode", mode)
    if ("OCR模式"==mode){
        $("#mode_switch").text("拍搜模式");
        cropper_switch = true;
        cropper(); 
        $("#submit").hide();
        $("#submit_webkit").hide(); 
        $("#getCroppedCanvas").show();
        $("#submit_paisou").show(); 
    }else{
        $("#mode_switch").text("OCR模式");
        cropper_switch = false;
       // $("#capture_image").attr("src", "/static/image/placeholder.png");
       $('#image_area').empty();
       var img = document.createElement("img");
       img.id = "capture_image";
       img.src = imageStr
       $('#image_area').html(img)
       $("#submit").show();
       $("#submit_webkit").show();
       $("#getCroppedCanvas").hide();
       $("#submit_paisou").hide();  
    }
}
