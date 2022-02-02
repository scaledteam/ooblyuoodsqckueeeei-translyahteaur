(()=>{
	const MAX_AUTO_TRANSLATE_LENGTH = 200;

	let chars_ubludan = [
		"qckue","sche","qckh","tsch","yuoo","yeo","scz","eau",
		"phf","tcs","sch","yee","yeh","yah","zh","ei","oo","a",
		"b","v","g","d","ee","e","l","m","n","p","r","s","t","''","'"
	];
	
	let chars_ru = [
		"к","щ","х","ч","ю","ё","з","о","ф","ц",
		"ш","ы","э","я","ж","й","у","а",
		"б","в","г","д","и","е","л","м",
		"н","п","р","с","т","ъ","ь"
	];

	let capitalize = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	let translateFrom = (str) => {
		let newstr = '';
		let pos = 0;

		while(pos < str.length) {
			let ok = false;
			for(let i = 0; i < chars_ubludan.length; i++) {
				let ubludan_char = chars_ubludan[i];
				let test = str.substr(pos, ubludan_char.length);
				let lowertest = test.toLowerCase();
				let islower = test === lowertest;
				if(lowertest == ubludan_char) {
					let newchar = chars_ru[i];
					pos += ubludan_char.length;
					newstr += islower ? newchar : newchar.toUpperCase();
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
			let letter = str[i];
			let lowerletter = letter.toLowerCase();
			let index = chars_ru.indexOf(lowerletter);
			let newchar = chars_ubludan[index];
			let islower = lowerletter == letter;
			newstr += index < 0 ? letter : (islower ? newchar : capitalize(newchar));
		}

		return newstr;
	}

	window.onload = () => {
		let output_el = document.getElementById("output");
		let input_el = document.getElementById("input");
		let checkbox = document.getElementById("atcheck");
		let atbutton = document.getElementById("atbtn");
		let autotranslate = true;
		let lastused = null;

		let updateButtonState = () => {
			atbutton.style.display = autotranslate ? 'none' : '';
		}

		let setAutoTranslateState = (state) => {
			autotranslate = state;
			checkbox.disabled = !state;
			checkbox.checked = state;
			updateButtonState();
		}

		checkbox.addEventListener('change', (ev) => {
			autotranslate = ev.target.checked;
			updateButtonState();
		});

		atbutton.addEventListener('click', (ev) => {
			if(lastused == output_el) {
				let txt = output_el.value;
				input_el.value = translateFrom(txt);
			} else if(lastused == input_el) {
				let txt = input_el.value;
				output_el.value = translateTo(txt);
			}
		});

		output_el.addEventListener('input', (ev) => {
			let txt = ev.target.value;
			if(autotranslate) {
				if(txt.length > MAX_AUTO_TRANSLATE_LENGTH) {
					setAutoTranslateState(false);
				}
			} else if(txt.length < MAX_AUTO_TRANSLATE_LENGTH && checkbox.disabled) {
				setAutoTranslateState(true);
			}
			if(autotranslate) input_el.value = translateFrom(txt);
			lastused = ev.target;
		});

		input_el.addEventListener('input', (ev) => {
			let txt = ev.target.value;
			if(autotranslate) {
				if(txt.length > MAX_AUTO_TRANSLATE_LENGTH) {
					setAutoTranslateState(false);
				}
			} else if(txt.length < MAX_AUTO_TRANSLATE_LENGTH && checkbox.disabled) {
				setAutoTranslateState(true);
			}
			if(autotranslate) output_el.value = translateTo(txt);
			lastused = ev.target;
		});

		setAutoTranslateState(output_el.value.length < MAX_AUTO_TRANSLATE_LENGTH);
		updateButtonState();
	}
})();
