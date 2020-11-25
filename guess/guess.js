window.onload = function() {
	let arr = [];
	let successNum = 0;
	let successPos = 0;
	let resetBtn = document.getElementById("resetBtn");
	let resultList = document.getElementById("resultList");
	let sureBtn = document.getElementById("sureBtn");
	let aIpt = document.getElementById("num_box").getElementsByTagName("input");
	let user = [];
	let numci = 0;

	function resetNumber() {
		for(var i=0;i<aIpt.length;i++) {
			aIpt[i].value = "";
		}
		aIpt[0].focus();
	}

	function getCnum() {
		let str = "";
		for(var i=0;i<aIpt.length;i++) {
			let v = aIpt[i].value;
			str+=v;
		}
		return str;
	}

	function makeLog(num) {
		let t_successNum = 0;
		let t_successPos = 0;
		
		for(var i=0;i<num.length;i++) {
			let v = num[i];
			for(var j=0;j<arr.length;j++) {
				if(arr[j] == v) {
					t_successNum++;
					if(j === i) {
						t_successPos++;
					}
				}
			}
		}
		let json = {
			num,
			successNum: t_successNum,
			successPos: t_successPos
		};
		return json;
	}

	function renderResult() {
		resultList.innerHTML = "";
		for(var i=user.length ;i>0;i--) {
			let s1 = `<li>${i}. <span>${user[i-1].num}</span>： <span class="num1">${user[i-1].successNum}</span> 个数字正确，<span class="num2">${user[i-1].successPos}</span> 个位置正确。</li>`
			resultList.innerHTML += s1;
		}
		resetNumber();
	}

	function init() {
		let arr2 = [1,2,3,4,5,6,7,8,9,0];
		for(var i=0;i<10;i++) {
			let n1 = Math.round(Math.random() * (9-i));
			arr.push(arr2[n1]);
			arr2.splice(n1,1);
		};
		arr.length = 4;

		for(var i=0;i<aIpt.length;i++) {
			aIpt[i].index = i;
			aIpt[i].oninput = function() {
				if(aIpt[this.index + 1]) {
					aIpt[this.index + 1].focus();
				}
			}
		}
	}

	function yzCnum(num) {
		let tmp = [];
		for(var i=0;i<num.length;i++) {
			let code = num.charCodeAt(i);
			if(code > 57 || code < 48) {
				return false;
			} else {
				for(var j=0;j<tmp.length;j++) {
					if(tmp[j] == num[i]) {
						return false;
					} 
 				}
 				tmp.push(num[i]);
			}
		}
		return true;
	}
	
	init();
	resetBtn.onclick = resetNumber;
	sureBtn.onclick = function() {
		let cnum = getCnum();
		if(yzCnum(cnum)) {
			numci++;
			if(makeLog(cnum).successNum == 4 && makeLog(cnum).successPos == 4) {
				document.getElementById('ci').innerHTML = numci;
				document.getElementById("success").style.display = "block";
			} else {
				user.push(makeLog(cnum));
				renderResult();
			}
		} else {
			alert("必须是4个不能重复的数字！");
		}
	}
	// console.log(arr);
}