window.onload = function() {
	let dBang = document.getElementById("bang");
	let dHero = document.getElementById("hero");
	let dScore = document.getElementById("score");
	let dBarLeft = document.getElementById("barLeft");
	let dBarCenter = document.getElementById("barCenter");
	let dBarRight = document.getElementById("barRight");
	let dGameMain = document.getElementById("gameMain");
	let dResult = document.getElementById("result");
	let currentInfo = {
		width: 50,
		left: 0
	}
	let nextInfo = {
		width: 50,
		left: 260
	}
	let goOn = true;
	dScore.score = 0;
	dBang.nHeight = 0;
	dBang.toLong = function() {
		this.nHeight++
		this.style.height = dBang.nHeight + 'px';
	}

	dBang.tang = function() {
		this.style.transform = 'rotate(90deg)';
	}
	dBang.hide = function() {
		this.style.transform = 'rotate(0deg)';
		this.nHeight = 0;
		this.style.height = this.nHeight;
	}

	dBang.clearTransition = function() {
		this.style.transition = "none";
	}

	dBang.addTransition = function() {
		this.style.transition = ".6s transform";
	}
	dResult.addEventListener("touchstart",e => {
		e.cancelBubble = true;
	})
	document.addEventListener("touchstart",e => {
		e.preventDefault();
		gameReset();
		clearInterval(dBang.timer);
		dBang.timer = setInterval(()=> {
			dBang.toLong();
		});
	},{passive: false})
	function canGoOn() {
		let min = dBarCenter.offsetLeft - 40;
		let max =  dBarCenter.offsetLeft - 40 + dBarCenter.offsetWidth;
		let isGoOn = (dBang.nHeight > min) && (dBang.nHeight < max);
		return isGoOn
	}
	document.addEventListener("touchend",e=> {
		clearInterval(dBang.timer);
		dHero.addTransition();
		dBang.tang();
		goOn = canGoOn();
	});

	dBang.addEventListener("webkitTransitionEnd",e=> {
		e.cancelBubble = true;
		if(goOn) {
			dHero.style.left = `${dBarCenter.offsetLeft}px`;
			currentInfo = JSON.parse(JSON.stringify(nextInfo));
			console.log(currentInfo,nextInfo);
			nextInfo.width = Math.round(Math.random() * 50 + 50);
			let minWidth = document.documentElement.clientWidth;
			let maxWidth = minWidth + dBarCenter.offsetLeft - nextInfo.width;
			
			nextInfo.left =  Math.round(Math.random() * (maxWidth - minWidth) + minWidth) ;
			dBarRight.style.width = `${nextInfo.width}px`;
			dBarRight.style.left = `${nextInfo.left}px`;
			console.log(currentInfo,nextInfo);
		} else {
			dHero.style.left = `${dBang.nHeight + 40}px`;
		}
	})
	dHero.clearTransition = function() {
		this.style.transition = "none";
	}
	dHero.addTransition = function() {
		this.style.transition = ".6s";
	}
	dHero.addEventListener("webkitTransitionEnd",e=> {
		e.cancelBubble = true;
		dBang.clearTransition();
		if(goOn) {
			dGameMain.style.left = `-${dBarCenter.offsetLeft}px`;
			dScore.score++;
			dHero.clearTransition();
			
		} else {
			dHero.style.top = "200px";
			setTimeout(()=> {
				dResult.style.display = "flex";
			},1000);
		}
		dBang.hide();
		dScore.innerHTML = dScore.score
	});
	dGameMain.addEventListener("webkitTransitionEnd",e=> {
		if(goOn)  {
			dGameMain.clearTransition();
			dGameMain.style.left = 0;
			dHero.style.left = 0;
			dBarLeft.style.left = 0;
			dBarLeft.style.width = currentInfo.width + 'px';
			dBarCenter.style.width = nextInfo.width + 'px';
			nextInfo.left = nextInfo.left - currentInfo.left
			dBarCenter.style.left = nextInfo.left + 'px';
			currentInfo = nextInfo
		}
	})
	dGameMain.clearTransition = function() {
		this.style.transition = "none";
	}
	dGameMain.addTransition = function() {
		this.style.transition = ".6s";
	}
	function gameReset() {
		dBang.addTransition();
		dGameMain.addTransition();
	}
	restart.onclick = function() {
		location.reload();
	}
}