(()=>{
	const MAX_AUTO_TRANSLATE_LENGTH = 200;

	let chars_ubludan = [
		"qckue","sche","qckh","tsch","yuoo","yeo","scz","eau",
		"phf","tcs","sch","yee","yeh","yah","zh","ei","oo","a",
		"b","v","g","d","e","ee","l","m","n","p","r","s","t","''","'"
	];
	
	let chars_ru = [
		"к","щ","х","ч","ю","ё","з","о","ф","ц",
		"ш","ы","э","я","ж","й","у","а",
		"б","в","г","д","е","и","л","м",
		"н","п","р","с","т","ъ","ь"
	];

	let translateFrom = (str) => {
		let newstr = '';
		let pos = 0;

		while(pos < str.length) {
			let ok = false;
			for(let i = 0; i < chars_ubludan.length; i++) {
				let ubludan_char = chars_ubludan[i];
				if(str.indexOf(ubludan_char, pos) == pos) {
					pos += ubludan_char.length;
					newstr += chars_ru[i];
					ok = true;
					break;
				}
			}

			if(!ok) newstr += str[pos++];
		}

		return newstr;
	}
	
	let translateTo = (str) => {
		let newstr = '';

		for(let i = 0; i < str.length; i++) {
			let index = chars_ru.indexOf(str[i]);
			newstr += index < 0 ? str[i] : chars_ubludan[index];
		}

		return newstr;
	}

	window.onload = () => {
		let output_el = document.getElementById("output");
		let input_el = document.getElementById("input");
		let checkbox = document.getElementById("atcheck");
		let autotranslate = true;

		checkbox.addEventListener('change', (ev) => {
			autotranslate = ev.target.checked;
		});

		output_el.addEventListener('input', (ev) => {
			let txt = ev.target.value;
			if(autotranslate) {
				if(txt.length > MAX_AUTO_TRANSLATE_LENGTH) {
					checkbox.disabled = true;
					autotranslate = false;
				}
			} else if(txt.length < MAX_AUTO_TRANSLATE_LENGTH && checkbox.disabled) {
				checkbox.disabled = false;
				autotranslate = true;
			}
			if(autotranslate) input_el.value = translateFrom(txt);
			checkbox.checked = autotranslate;
		});

		input_el.addEventListener('input', (ev) => {
			let txt = ev.target.value;
			if(autotranslate) {
				if(txt.length > MAX_AUTO_TRANSLATE_LENGTH) {
					checkbox.disabled = true;
					autotranslate = false;
				}
			} else if(txt.length < MAX_AUTO_TRANSLATE_LENGTH && checkbox.disabled) {
				checkbox.disabled = false;
				autotranslate = true;
			}
			if(autotranslate) output_el.value = translateTo(txt);
			checkbox.checked = autotranslate;
		});
	}
})();
