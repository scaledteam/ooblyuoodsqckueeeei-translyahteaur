var MAX_AUTOTRANSLATE_COUNT = 200;

var chars_ubludan = [
	"qckue","sche","qckh","tsch","yuoo","yeo","scz","eau",
	"phf","tcs","sch","yee","yeh","yah","zh","ei","oo","а",
	"b","v","g","d","e","ee","l","m","n","p","r","s","t","''","'"
];

var chars_ru = [
	"к","щ","х","ч","ю","ё","з","о","ф","ц",
	"ш","ы","э","я","ж","й","у","а",
	"б","в","г","д","е","и","л","м",
	"н","п","р","с","т","ъ","ь"
];


function getIndex(array,value){
	for(var i=0;i<array.length;i++){
		if(array[i]==value) {
			return i;
		}
	}
	return -1;
}

function translateTo(isAuto){
	var str = $("#input").val();
	if(isAuto){
		if(!$("#input").is(':focus')){
			return;
		}
		if(str.length>MAX_AUTOTRANSLATE_COUNT){
			$("#button").show();
			return;
		}else{
			$("#button").hide();
		}
	}
	var newstr = '';
	str = str.toLowerCase();
	for(i=0;i<str.length;i++){
		var index = getIndex(chars_ru,str[i]);
		if(index>-1){
			newstr += chars_ubludan[index];
		}else{
			newstr += str[i];
		}
	}
	$("#output").val(newstr);
}

function translateFrom(isAuto){
	var str = $("#output").val();
	var inp = $("#input");
	if(isAuto){
		if(!$("#output").is(':focus')){
			$("#output").data("first",true);
			return;
		}else{
			if($("#output").data("first")){
				$("#output").data("first",false);
				$("#input").val("");
			}
		}
		if(inp.val().length>MAX_AUTOTRANSLATE_COUNT){
			$("#button").show();
			return;
		}else{
			$("#button").hide();
		}
	}
	var newstr = '';
	var trpos = 0;
	while(trpos<str.length){
		var changed = false;
		for(i=0;i<chars_ubludan.length;i++){
			var ubludan_char = chars_ubludan[i];
			var check = str.substr(trpos,ubludan_char.length);
			if(ubludan_char===check){
				var index = getIndex(chars_ubludan,ubludan_char);
				newstr += chars_ru[index];
				trpos += ubludan_char.length - 1;
				changed = true;
				break;
			}
		}
		if(!changed){
			if(str.charCodeAt(trpos)!=39){
				newstr += str[trpos];
				changed = true;
			}
			trpos++;
		}else{
			trpos++;
		}
	}
	inp.val(newstr);
}

function translate() {
	if(!$("#input").val()){
		translateFrom();
	}else{
		translateTo();
	}
}

$(function(){
	$("#actionButton").on("click",translate);
	$("#output").data("first",true);
});
