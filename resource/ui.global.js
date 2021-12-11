'use strict';

//utils module
;(function (win, doc, undefined) {

	'use strict';

	const global = 'netive';

	win[global] = {};

	const Global = win[global];
	const UA = navigator.userAgent.toLowerCase();
	const deviceSize = [1920, 1600, 1440, 1280, 1024, 960, 840, 720, 600, 480, 400, 360];
	const deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'windows','samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'];
	//const filter = "win16|win32|win64|mac|macintel";

	//components state 
	Global.callback = {};

	Global.state = {
		device: {
			info: (function() {
				for (let i = 0, len = deviceInfo.length; i < len; i++) {
					if (UA.match(deviceInfo[i]) !== null) {
						return deviceInfo[i];
					}
				}
			})(),
			width: window.innerWidth,
			height: window.innerHeight,
			breakpoint: null,
			colClass: null,
			ios: (/ip(ad|hone|od)/i).test(UA),
			android: (/android/i).test(UA),
			app: UA.indexOf('appname') > -1 ? true : false,
			touch: null,
			mobile: null,
			os: (navigator.appVersion).match(/(mac|win|linux)/i)
		},
		browser: {
			ie: UA.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
			local: (/^http:\/\//).test(location.href),
			firefox: (/firefox/i).test(UA),
			webkit: (/applewebkit/i).test(UA),
			chrome: (/chrome/i).test(UA),
			opera: (/opera/i).test(UA),
			safari: (/applewebkit/i).test(UA) && !(/chrome/i).test(UA),	
			size: null
		},
		keys: { 
			tab: 9, 
			enter: 13, 
			alt: 18, 
			esc: 27, 
			space: 32, 
			pageup: 33, 
			pagedown: 34, 
			end: 35, 
			home: 36, 
			left: 37, 
			up: 38, 
			right: 39, 
			down: 40
		},
		scroll: {
			y: 0,
			direction: 'down'
		},
		pageName: function() {
			const page = document.URL.substring(document.URL.lastIndexOf("/") + 1);
			const pagename = page.split('?');

			return pagename[0]
		},
		breakPoint: [600, 905],
		effect: { //http://cubic-bezier.com - css easing effect
			linear: '0.250, 0.250, 0.750, 0.750',
			ease: '0.250, 0.100, 0.250, 1.000',
			easeIn: '0.420, 0.000, 1.000, 1.000',
			easeOut: '0.000, 0.000, 0.580, 1.000',
			easeInOut: '0.420, 0.000, 0.580, 1.000',
			easeInQuad: '0.550, 0.085, 0.680, 0.530',
			easeInCubic: '0.550, 0.055, 0.675, 0.190',
			easeInQuart: '0.895, 0.030, 0.685, 0.220',
			easeInQuint: '0.755, 0.050, 0.855, 0.060',
			easeInSine: '0.470, 0.000, 0.745, 0.715',
			easeInExpo: '0.950, 0.050, 0.795, 0.035',
			easeInCirc: '0.600, 0.040, 0.980, 0.335',
			easeInBack: '0.600, -0.280, 0.735, 0.045',
			easeOutQuad: '0.250, 0.460, 0.450, 0.940',
			easeOutCubic: '0.215, 0.610, 0.355, 1.000',
			easeOutQuart: '0.165, 0.840, 0.440, 1.000',
			easeOutQuint: '0.230, 1.000, 0.320, 1.000',
			easeOutSine: '0.390, 0.575, 0.565, 1.000',
			easeOutExpo: '0.190, 1.000, 0.220, 1.000',
			easeOutCirc: '0.075, 0.820, 0.165, 1.000',
			easeOutBack: '0.175, 0.885, 0.320, 1.275',
			easeInOutQuad: '0.455, 0.030, 0.515, 0.955',
			easeInOutCubic: '0.645, 0.045, 0.355, 1.000',
			easeInOutQuart: '0.770, 0.000, 0.175, 1.000',
			easeInOutQuint: '0.860, 0.000, 0.070, 1.000',
			easeInOutSine: '0.445, 0.050, 0.550, 0.950',
			easeInOutExpo: '1.000, 0.000, 0.000, 1.000',
			easeInOutCirc: '0.785, 0.135, 0.150, 0.860',
			easeInOutBack: '0.680, -0.550, 0.265, 1.550'
		}
	}
	
	Global.parts = {
		//resize state
		resizeState: function() {
			let timerWin;

			const act = function() {
				const browser = Global.state.browser;
				const device = Global.state.device;

				device.width = window.innerWidth;
				device.height = window.innerHeight;

				device.touch = device.ios || device.android || (doc.ontouchstart !== undefined && doc.ontouchstart !== null);
				device.mobile = device.touch && (device.ios || device.android);
				device.os = device.os ? device.os[0] : '';
				device.os = device.os.toLowerCase();

				device.breakpoint = device.width >= deviceSize[5] ? true : false;
				device.colClass = device.width >= deviceSize[5] ? 'col-12' : device.width > deviceSize[8] ? 'col-8' : 'col-4';

				if (browser.ie) {
					browser.ie = browser.ie = parseInt( browser.ie[1] || browser.ie[2] );
					( 11 > browser.ie ) ? support.pointerevents = false : '';
					( 9 > browser.ie ) ? support.svgimage = false : '';
				} else {
					browser.ie = false;
				}

				const clsBrowser = browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie' + browser.ie : 'other';
				const clsMobileSystem = device.ios ? "ios" : device.android ? "android" : 'etc';
				const clsMobile = device.mobile ? device.app ? 'ui-a ui-m' : 'ui-m' : 'ui-d';
				const el_html = doc.querySelector('html');

				el_html.classList.remove('col-12', 'col-8', 'col-4');
				el_html.classList.add(device.colClass, clsBrowser, clsMobileSystem, clsMobile);
			
				const w = window.innerWidth;

				clearTimeout(timerWin);
				timerWin = setTimeout(function(){
					el_html.classList.remove('size-tablet');
					el_html.classList.remove('size-desktop');
					el_html.classList.remove('size-mobile');
						el_html.classList.remove('size-desktop');

					if (w < Global.state.breakPoint[0]) {
						Global.state.browser.size = 'mobile';
						el_html.classList.add('size-mobile');
					} else if (w < Global.state.breakPoint[1]) {
						Global.state.browser.size = 'tablet';
						el_html.classList.add('size-tablet');
					} else {
						Global.state.browser.sizee = 'desktop';
						el_html.classList.add('size-desktop');
					}
				},200);
			}
			win.addEventListener('resize', act);
			act();
		},


	}
	Global.parts.resizeState();

	
	Global.loading = {
		timerShow : {},
		timerHide : {},
		options : {
			selector: null,
			message : null,
			styleClass : 'orbit' //time
		},
		show : function(option){
			//const opt = {...this.options, ...option};
			//const opt = Object.assign({}, this.options, option);
			//Global.option.join(this.options, option);
            // const {selector, styleClass, message} = opt;

            const selector = option !== undefined && option.selector !== undefined ? option.selector : null;
            const styleClass = option !== undefined && option.styleClass !== undefined ? option.styleClass : 'orbit';
            const message = option !== undefined && option.message !== undefined ? option.message : null;
			
			console.log(selector, styleClass, message);
			const el = (selector !== null) ? selector : doc.querySelector('body');
			const el_loadingHides = doc.querySelectorAll('.ui-loading:not(.visible)');

			for (let i = 0, len = el_loadingHides.length; i < len; i++) {
				el_loadingHides[i].remove();
			}

			let htmlLoading = '';

			(selector === null) ?
				htmlLoading += '<div class="ui-loading '+ styleClass +'">':
				htmlLoading += '<div class="ui-loading type-area '+ styleClass +'">';
			htmlLoading += '<div class="ui-loading-wrap">';

			(message !== null) ?
				htmlLoading += '<strong class="ui-loading-message"><span>'+ message +'</span></strong>':
				htmlLoading += '';

			htmlLoading += '</div>';
			htmlLoading += '</div>';

			clearTimeout(this.timerShow);
			clearTimeout(this.timerHide);
			this.timerShow = setTimeout(showLoading, 300);
			
			function showLoading(){
				!el.querySelector('.ui-loading') && el.insertAdjacentHTML('beforeend', htmlLoading);
				htmlLoading = null;		

				const el_loadings = doc.querySelectorAll('.ui-loading');

                for (let i = 0, len = el_loadings.length; i < len; i++) {
					el_loadings[i].classList.add('visible');
					el_loadings[i].classList.remove('close');
				}
			}
		},
		hide: function(){
			clearTimeout(this.timerShow);
			this.timerHide = setTimeout(function(){
				const el_loadings = doc.querySelectorAll('.ui-loading');

                for (let i = 0, len = el_loadings.length; i < len; i++) {
                    const that = el_loadings[i];

					that.classList.add('close');
					setTimeout(function(){
						that.classList.remove('visible')
						that.remove();
					},300);
				}
			},300);
		}
	}

	Global.ajax = {
		options : {
			page: true,
			add: false,
			prepend: false,
			effect: false,
			loading:false,
			callback: false,
			errorCallback: false,
			type: 'GET',
			cache: false,
			async: true,
			contType: 'application/x-www-form-urlencoded',
			dataType: 'html'
		},
		init : function(option){
			if (option === undefined) {
				return false;
			}

			const xhr = new XMLHttpRequest();

            const area = option.area;
            const url = option.url;

            const loading = option.loading !== undefined ? option.loading : false;
            const effect = option.effect !== undefined ? option.effect : false;
            const type = option.type !== undefined ? option.type : 'GET';
            
            const page = option.page !== undefined ? option.page : true;
            const add = option.add !== undefined ? option.add : false;
            const prepend = option.prepend !== undefined ? option.prepend : false;
            const mimeType = option.mimeType !== undefined ? option.mimeType : false;
            const contType = option.contType !== undefined ? option.contType : 'application/x-www-form-urlencoded';

			const callback = option.callback !== undefined ? option.callback : false;
			const errorCallback = option.errorCallback !== undefined ? option.errorCallback : false;
	
			loading && Global.loading.show();

			if (!!effect && !!document.querySelector(effect)) {
				area.classList.remove(effect + ' action');
				area.classList.add(effect);
			}

			xhr.open(type, url);
			xhr.setRequestHeader("n", contType);
			xhr.send();
			xhr.onreadystatechange = function () {
				if (xhr.readyState !== XMLHttpRequest.DONE) {
					return;
				}

				if (xhr.status === 200) {
					loading && Global.loading.hide();

					if (page) {
						if (add){
							prepend ? 
								area.insertAdjacentHTML('afterbegin', xhr.responseText) : 
								area.insertAdjacentHTML('beforeend', xhr.responseText);
						} else {							
							area.innerHTML = xhr.responseText;
						}

						callback && callback();
						effect && area.classList.add('action');
					} else {
						callback && callback(xhr.responseText);
					}

				} else {
					loading && Global.loading.hide();
					errorCallback ? errorCallback() : '';
				}
			};
		}
	}

	Global.scroll = {
		parallax: function(v) {
			const el_area = window;
			const el_parallax = doc.querySelector('.ui-parallax');
			const el_wraps = el_parallax.querySelectorAll('.ui-parallax-item');
            const el_body = doc.querySelector('body');
            const wH = window.innerHeight;

            let psValue = [];
            let nowPs = 0; 
           
            for (let i = 0, len = el_wraps.length; i < len; i++) {
                const that = el_wraps[i];
                const areaT = Math.floor(window.scrollY);

                psValue.push(that.getBoundingClientRect().top + areaT)
            }
           
            scrollCheck();
			el_area.addEventListener('scroll', scrollCheck);

			function scrollCheck() {
				const wH = window.innerHeight;
				const wT = Math.floor(window.scrollY);
				
                const cutline = wT + wH;

                for (let i = 0, len = psValue.length; i < len; i++) {
                    if (cutline < psValue[0]) {
                        nowPs = 0;
                        break;
                    } 
                    
                    if (cutline > psValue[len - 1]) {
                        nowPs = len - 1;
                        break;
                    }

                    if (cutline < psValue[i]){
                        nowPs = i;
                        break;
                    }
                }
                
                el_body.dataset.n = nowPs - 1;

				//service.html
                if (v === 'service') {
					service(cutline, nowPs);
                }
			}
		
            function service(cutline, n){
				const wrap = doc.querySelector('.ui-parallax-item.n' + n);
				const wrapPrev = doc.querySelector('.ui-parallax-item.n' + (n - 1 < 0 ? 0 : n-1));
                const item = wrap.querySelector('.word-item');
                const word = item.querySelectorAll('.word');
                const line = item.querySelector('.line');
				const vw = window.innerWidth;
                const maxH = psValue[n];
                const minH = maxH - wH;
                let unit = (maxH - minH) / 10;

				switch (n) {
					case 1:
						unit = (maxH - minH) / 10;
						
						

						if (cutline > minH) {
							if (!wrap.classList.contains('on')) {
								wrap.classList.add('on');
							}
						} else {
							if (!!wrap.classList.contains('on')) {
								wrap.classList.remove('on');
							}
						}

						if (cutline > 0) {
							word[0].classList.remove('on');
							word[1].classList.remove('on');
							word[2].classList.remove('on');
							word[3].classList.remove('on');
							word[4].classList.remove('on');
							line.style.width = 0;
						} 
						if (cutline > minH + (unit * 2)) {
							word[0].classList.add('on');
							word[1].classList.remove('on');
							word[2].classList.remove('on');
							word[3].classList.remove('on');
							word[4].classList.remove('on');
						} 
						if (cutline > minH + (unit * 3)) {
							const hello = item.querySelector('.hello');
						
							word[1].classList.add('on');
							word[2].classList.remove('on');
							word[3].classList.remove('on');
							word[4].classList.remove('on');

							line.style.width = (vw / 2) - (hello.offsetWidth / 2) + 'px';
						} 
						if (cutline > minH + (unit * 4)) {
							word[2].classList.add('on');
							word[3].classList.remove('on');
							word[4].classList.remove('on');
						} 
						if (cutline > minH + (unit * 5)) {
							word[3].classList.add('on');
							word[4].classList.remove('on');
						} 
						if (cutline > minH + (unit * 6)) {
							word[4].classList.add('on');
						} 
						break;
					case 2:
						unit = (maxH - minH) / 10;
						
						if (cutline > minH) {
							if (!wrap.classList.contains('on')) {
								wrapPrev.classList.add('off');
								wrap.classList.add('on');
							}
						} else {
							if (!!wrap.classList.contains('on')) {
								wrapPrev.classList.remove('off');
								wrap.classList.remove('on');
							}
						}

						if (cutline > 0) {
							word[0].classList.remove('on');
							word[1].classList.remove('on');
							word[2].classList.remove('on');
							line.style.width = 0;
						} 
						if (cutline > minH + (unit * 2)) {
							word[0].classList.add('on');
							word[1].classList.remove('on');
							word[2].classList.remove('on');
						} 
						if (cutline > minH + (unit * 3)) {
						} 
						if (cutline > minH + (unit * 4)) {
							word[1].classList.add('on');
							word[2].classList.remove('on');
						} 
						if (cutline > minH + (unit * 5)) {
							line.style.width = (vw / 2.3) + 'px';
						} 
						if (cutline > minH + (unit * 6)) {
							word[2].classList.add('on');
						} 
				
						
						break;
					case 3:
						unit = (maxH - minH) / 10;

						if (cutline > minH) {
							if (!wrap.classList.contains('on')) {
								wrapPrev.classList.add('off');
								wrap.classList.add('on');
							}
						} else {
							if (!!wrap.classList.contains('on')) {
								wrapPrev.classList.remove('off');
								wrap.classList.remove('on');
								Global.number.counterReset('counter1');
							}
						}

						if (cutline > minH) {
							wrap.classList.add('on');
						} else {
							wrap.classList.remove('on');
						}

						if (cutline > 0) {
							word[0].classList.remove('on');
							word[1].classList.remove('on');
							word[2].classList.remove('on');
							line.style.width = 0;
						} 
						if (cutline > minH + (unit * 2)) {
							word[0].classList.add('on');
							word[1].classList.remove('on');
							word[2].classList.remove('on');
							line.style.width = '10%';
						} 
						if (cutline > minH + (unit * 3)) {
							line.style.width = '22%';
						} 
						if (cutline > minH + (unit * 4)) {
							word[1].classList.add('on');
							word[2].classList.remove('on');
							line.style.width = '30%';
						} 
						if (cutline > minH + (unit * 5)) {
							line.style.width = (vw / 2.7) + 'px';
						} 
						if (cutline > minH + (unit * 6)) {
							word[2].classList.add('on');
						} 


						break;
					case 4 :
						unit = (maxH - minH) / 10;

						if (cutline > minH) {
							if (!wrap.classList.contains('on')) {
								wrapPrev.classList.add('off');
								wrap.classList.add('on');
							}
						} else {
							if (!!wrap.classList.contains('on')) {
								wrap.classList.remove('on');
								wrapPrev.classList.remove('off');
								Global.number.counterReset('counter2');
							}
						}

						if (cutline > 0) {
							word[0].classList.remove('on');
							word[1].classList.remove('on');
							
						} 
						if (cutline > minH + (unit * 1)) {
							word[0].classList.add('on');
							word[1].classList.remove('on');
						} 
						if (cutline > minH + (unit * 2)) {
							Global.number.counter('counter1', 100);
						} 
				
						if (cutline > minH + (unit * 5)) {
							word[1].classList.add('on');
						} 
						
						break;
					case 5:
						unit = (maxH - minH) / 10;

						if (cutline > minH) {
							if (!wrap.classList.contains('on')) {
								wrapPrev.classList.add('off');
								wrap.classList.add('on');
							}
						} else {
							if (!!wrap.classList.contains('on')) {
								wrapPrev.classList.remove('off');
								wrap.classList.remove('on');
								Global.number.recounterReset('counter3');
							}
						}

						if (cutline > 0) {
							word[0].classList.remove('on');
							word[1].classList.remove('on');
							
						} 
						if (cutline > minH + (unit * 1)) {
							word[0].classList.add('on');
							word[1].classList.add('on');
							Global.number.counter('counter2',900);
						} 
				
						
						break;
					case 6:
						unit = (maxH - minH) / 10;

						if (cutline > minH) {
							if (!wrap.classList.contains('on')) {
								wrapPrev.classList.add('off');
								wrap.classList.add('on');
								Global.motion.vibration();
							}
						} else {
							if (!!wrap.classList.contains('on')) {
								wrapPrev.classList.remove('off');
								wrap.classList.remove('on');
							}
						}

						if (cutline > 0) {
							word[0].classList.remove('on');
							word[1].classList.remove('on');
							
						} 
						if (cutline > minH + (unit * 3)) {
							word[0].classList.add('on');
							word[1].classList.add('on');
							Global.number.recounter('counter3', 100);
						} 
						
						break;
					case 7:
						unit = (maxH - minH) / 10;

						if (cutline > minH) {
							if (!wrap.classList.contains('on')) {
								wrapPrev.classList.add('off');
								wrap.classList.add('on');
								
							}
						} else {
							if (!!wrap.classList.contains('on')) {
								wrapPrev.classList.remove('off');
								wrap.classList.remove('on');
							}
						}

						if (cutline > 0) {
							word[0].classList.remove('on');
							word[1].classList.remove('on');
							word[2].classList.remove('on');
						} 
						if (cutline > minH + (unit * 2)) {
							word[0].classList.add('on');
							word[1].classList.remove('on');
							word[2].classList.remove('on');
						} 
						if (cutline > minH + (unit * 3)) {
						} 
						if (cutline > minH + (unit * 4)) {
							word[1].classList.add('on');
							word[2].classList.remove('on');
						} 
						if (cutline > minH + (unit * 6)) {
							word[2].classList.add('on');
						} 
						
						break;
					case 8:
						unit = (maxH - minH) / 10;

						if (cutline > minH) {
							if (!wrap.classList.contains('on')) {
								wrapPrev.classList.add('off');
								wrap.classList.add('on');
							}
						} else {
							if (!!wrap.classList.contains('on')) {
								wrapPrev.classList.remove('off');
								wrap.classList.remove('on');
							}
						}

						
						
						break;
				}
                  
            }
		}
	}
	Global.motion = {
		vibration: function(){
			const icons = doc.querySelectorAll('.srv-icon');
			let timer;

			for (let i = 0, len = icons.length; i < len; i++) {
				const icon = icons[i];
				const iconImg = icon.querySelector('img');
				act(iconImg);
			}

			function act(that) {
				function vib(){
					timer = setTimeout(function(){
						const l = Math.floor( ( Math.random() * (20 - 1) + 1 ) );
						const t = Math.floor( ( Math.random() * (20 - 1) + 1 ) );
						that.style.left = l + 'px';
						that.style.top = t + 'px';
						vib();
					}, 200);
				}
				vib();
			}
		}
	}
	Global.number = {
		counter: function(id , sp){
			const counter = doc.querySelector('#' + id);
			const speed = sp;
			const animate = function() {
				const value = +Number(counter.dataset.counter);
				const data = +counter.innerText;
				const time = value / speed;
				
				if (data < value) {
					counter.innerText = Global.number.comma(Math.ceil(data + time));
					setTimeout(animate, 1);
				}else{
					counter.innerText = Global.number.comma(value);
				}
			}

			if (!counter.dataset.state) {
				counter.innerText = 0;
				counter.dataset.state = 'ing';
				animate();
			}
		},
		recounter: function(id, sp){
			const counter = doc.querySelector('#' + id);
			const speed = sp;
			let n = counter.dataset.counter;
			const animate = function() {
				const value = +Number(counter.dataset.counter);
				const data = +n;
				const time = value / speed;

				if(parseInt(data) > 0) {
					n = Math.ceil(data - time);
					counter.innerText = Global.number.comma(Math.ceil(data - time));
					setTimeout(animate, 1);
				}else{
					counter.innerText = 0;
				}
			}

			if (!counter.dataset.state) {
				counter.innerText = Global.number.comma(counter.dataset.counter);
				counter.dataset.state = 'ing';
				animate();
			}
		},
		counterReset: function(id){
			const counter = doc.querySelector('#' + id);

			counter.innerText = 0;
			counter.removeAttribute('data-state');
		},
		recounterReset: function(id){
			const counter = doc.querySelector('#' + id);

			counter.innerText = Global.number.comma(counter.dataset.counter);
			counter.removeAttribute('data-state');
		},
		comma: function(n){
			const parts = n.toString().split(".");

			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
		}
	}

})(window, document);
