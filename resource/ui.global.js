'use strict';

//utils module
;(function (win, doc, undefined) {

	'use strict';

	const global = 'HyperloungeUI';

	win[global] = {};

	const Global = win[global];
	const UA = navigator.userAgent.toLowerCase();
	const deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'windows','samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'];

	//components state 
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
		breakPoint: 980,
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

				el_html.classList.add(clsMobile);
			
				const w = window.innerWidth;

				clearTimeout(timerWin);
				timerWin = setTimeout(function(){
					el_html.classList.remove('size-desktop');
					el_html.classList.remove('size-mobile');

					if (w < Global.state.breakPoint) {
						Global.state.browser.size = 'mobile';
						el_html.classList.add('size-mobile');
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

	Global.parallax = {
		options: {
			psValue: [],
			page : 'service'
		},
		init: function(v) {
			// position: fixed 사용시 ie 떨림 현상 방지
			if( navigator.userAgent.match(/Trident\/7\./) ){
				document.querySelector('body').addEventListener("mousewheel", function(){
					event.preventDefault();

					var wheelDelta = event.wheelDelta,
						currentScrollPosition = window.pageYOffset;

					window.scrollTo(0, currentScrollPosition - wheelDelta);
				});
			}
			
			const el_area = window;
			const el_parallax = doc.querySelector('.ui-parallax');
			const el_wraps = el_parallax.querySelectorAll('.ui-parallax-item');
            const el_body = doc.querySelector('body');

			history.scrollRestoration = "manual";
			Global.parallax.options.page = v;
			el_body.removeAttribute('class');
			el_body.classList.add('step0');
			
			function calc(){
				Global.parallax.options.psValue = [];
				win.scrollTop = 0;

				for (let i = 0, len = el_wraps.length; i < len; i++) {
					const that = el_wraps[i];
					let areaT = Math.floor(window.pageYOffset);

					if (v === 'overview' && i === 2) {
						areaT = areaT - 140;
					}
					
					Global.parallax.options.psValue.push((that.getBoundingClientRect().top + areaT).toFixed(0));
				}
			}

			if (v === 'service') {
				setTimeout(function(){
					doc.querySelector('.srv-item.n1 .line').classList.add('act');
					setTimeout(function(){
						doc.querySelector('.page-service').classList.add('scroll');
					},600);
				},2400);
				
			}

			setTimeout(function(){
				calc();
				win.addEventListener('resize', calc);
				Global.parallax.act();
				el_area.addEventListener('scroll', Global.parallax.act);
			},100);
		},
		act: function(){
            const el_body = doc.querySelector('body');
			const el_html = doc.querySelector('html');
			const clsname = el_body.getAttribute('class');
			const wH = window.innerHeight;
			const wT = Math.floor(window.pageYOffset);
			const cutline = wT + wH;
			const psValue = Global.parallax.options.psValue;
			const page = Global.parallax.options.page;
			let nowPs = 0; 

			for (let i = 1, len = psValue.length; i < len; i++) {
				if (cutline < psValue[i]){
					nowPs = i;
					break;
				} else if (cutline > psValue[len - 1]) {
					nowPs = len;
					break;
				}
			}
			
			el_body.dataset.n = nowPs - 1;
			
			if (clsname !== 'step' + (nowPs - 1)) {
				el_body.classList.remove(clsname);
				el_body.classList.add('step' + (nowPs - 1));
			}
			
			const scrollarrow = doc.querySelector('.scroll-arrow');

			(wT > 100) ? scrollarrow.classList.add('off') : scrollarrow.classList.remove('off');
			//service.html
			if (page === 'service') {
				service(cutline, nowPs);
			} else if (page === 'overview' || page === 'apply') {
				(wT > wH - 120) ?
					el_html.classList.add('is-bar'):
					el_html.classList.remove('is-bar');

				overview();
			}

			function overview(){
				const parallax = doc.querySelector('.ui-parallax');
				const st = window.scrollY || document.documentElement.scrollTop;
				const item = parallax.querySelectorAll('.unit-item');
				const vh = window.innerHeight;
				
				for (let i = 0, len = item.length; i < len; i++) {
					const that = item[i];
					const itemTop = that.getBoundingClientRect().top + st;
					const n = st - (itemTop - vh);
					const s = 150;
					const nn = s - n;

					if (i === 0) {
						if (st + (itemTop) > itemTop) {
							that.style.transform = 'translateY('+ (st /2) +'px)';
						}
					} else {
						if (st > itemTop - vh && st < itemTop - vh + s ) {
							that.style.transform = 'translateY('+ nn +'px)';
						} else if (st > itemTop - vh + s )  {
							that.style.transform = 'translateY(0px)';
						}
					}
				}
                  
            }

			function service(cutline, n){
				const parallax = doc.querySelector('.ui-parallax');
				const wrap = doc.querySelector('.ui-parallax-item.n' + n);
				const wrapPrev = doc.querySelector('.ui-parallax-item.n' + (n - 1 < 0 ? 0 : n-1));
				const wrapNext = doc.querySelector('.ui-parallax-item.n' + (n + 1));
				const header = doc.querySelector('.base-header');
				const unitwrap = wrap.querySelector('.unit-wrap');
				const item = wrap.querySelector('.unit-item');
                const unit = item.querySelectorAll('.unit');
                const line = item.querySelector('.line');
				const vw = window.innerWidth;
				const pH = parallax.offsetHeight;
                const maxH = Math.floor(psValue[n - 1]) + wH;
                let minH =  Math.floor(wrap.offsetHeight);
                let scene;
				let cutpoint;
				let l;
				let itemMotion;
				let itemMotion2;
				let itemMotion3;
				let itemMotion4;

				const isOn = wrap.classList.contains('on');
				const isReady = wrap.classList.contains('ready');
				const isReadyNext = wrapNext ? wrapNext.classList.contains('ready') : '';
				const half = (wH / 2);

				switch (n) {
					case 1:
						if (cutline < minH) {
							if (isReadyNext) {
								wrapNext.classList.remove('ready');
							}
						} 
						if (cutline > wH) {
							if (!isOn) {
								wrap.classList.add('on');
							}
						} else {
							if (!!isOn) {
								wrap.classList.remove('on');
							}
						}
						break;

					case 2:

						if (cutline > maxH - wH) {
							if (!isReady) {
								wrap.classList.add('ready');
							}
						} 
						if (cutline < maxH + minH) {
							if (isReadyNext) {
								wrapNext.classList.remove('ready');
							}
						} 

						if (cutline > maxH) {
							if (!isOn) {
								wrapPrev.classList.add('off');
								wrap.classList.remove('off');
								wrap.classList.add('on');
							}
						} else {
							if (!!isOn) {
								wrapPrev.classList.remove('off');
								wrap.classList.remove('on');
							}
						}

						cutpoint = maxH;
						l = (cutline - cutpoint);
						itemMotion = l * 0.005;
						itemMotion2 = (l - 300) * 0.005;
						itemMotion3 = (l - 600) * 0.005;

						itemMotion < 0 ? 
							itemMotion = 0 : itemMotion > 1 ? itemMotion = 1 : '';
						itemMotion2 < 0 ? 
							itemMotion2 = 0 : itemMotion2 > 1 ? itemMotion2 = 1 : '';
						itemMotion3 < 0 ? 
							itemMotion3 = 0 : itemMotion3 > 1 ? itemMotion3 = 1 : '';

						unit[0].style.opacity = itemMotion + 0.1;
						unit[1].style.opacity = itemMotion2 + 0.1;
						unit[2].style.opacity = itemMotion3 + 0.1;	

						break;

					case 3:
						
						if (cutline > maxH - wH) {
							if (!isReady) {
								wrap.classList.add('ready');
							}
						} 
						if (cutline < maxH + minH) {
							if (isReadyNext) {
								wrapNext.classList.remove('ready');
								Global.number.counterReset('counter1');
								header.classList.remove('type-b');
							}
						} 
						if (cutline > maxH) {
							if (!isOn) {
								wrapPrev.classList.add('off');
								wrap.classList.remove('off');
								wrap.classList.add('on');
							}
						} else {
							if (!!isOn) {
								wrapPrev.classList.remove('off');
								wrap.classList.remove('on');
							}
						}

						cutpoint = maxH;
						l = (cutline - cutpoint);
						itemMotion = l * 0.005;
						itemMotion2 = (l - 300) * 0.005;
						itemMotion3 = (l - 600) * 0.005;

						itemMotion < 0 ? 
							itemMotion = 0 : itemMotion > 1 ? itemMotion = 1 : '';
						itemMotion2 < 0 ? 
							itemMotion2 = 0 : itemMotion2 > 1 ? itemMotion2 = 1 : '';
						itemMotion3 < 0 ? 
							itemMotion3 = 0 : itemMotion3 > 1 ? itemMotion3 = 1 : '';

						unit[0].style.opacity = itemMotion + 0.1;
						unit[1].style.opacity = itemMotion2 + 0.1;
						unit[2].style.opacity = itemMotion3 + 0.1;

						break;

					case 4 :
						
						if (cutline > maxH - wH) {
							if (!isReady) {
								wrap.classList.add('ready');
								unitwrap.classList.remove('datainfo2');
								unitwrap.classList.remove('datainfo3');
								unitwrap.classList.add('datainfo1');
							}
						} 
						if (cutline < maxH + minH) {
							if (isReadyNext) {
								wrapNext.classList.remove('ready');
								header.classList.add('type-b');
								header.classList.remove('type-c');
							}
						} 
						if (cutline > maxH) {
							if (!isOn) {
								wrapPrev.classList.add('off');
								wrap.classList.remove('off');
								wrap.classList.add('on');
								header.classList.add('type-b');
							}
						} else {
							if (!!isOn) {
								wrapPrev.classList.remove('off');
								wrap.classList.remove('on');
								header.classList.remove('type-b');
							}
						}

						cutpoint = maxH;
						l = (cutline - cutpoint);
												
						if (cutline > cutpoint - half && cutline < cutpoint + (half * 2)) {
							unitwrap.classList.remove('datainfo2');
							unitwrap.classList.remove('datainfo3');
							unitwrap.classList.add('datainfo1');

							Global.number.counterReset('counter2');
							Global.number.counter('counter1', 100);

						} 

						if (cutline > cutpoint + (half * 2) + 1 && cutline < cutpoint + (half * 4)) {
							unitwrap.classList.remove('datainfo1');
							unitwrap.classList.remove('datainfo3');
							unitwrap.classList.add('datainfo2');
							
							Global.number.counterReset('counter3');
							Global.number.counter('counter2', 600);

							header.classList.add('type-b');
							header.classList.remove('type-c');
						}

						if (cutline > cutpoint + (half * 4) + 1 && cutline < cutpoint + (half * 6)) {
							unitwrap.classList.remove('datainfo1');
							unitwrap.classList.remove('datainfo2');
							unitwrap.classList.add('datainfo3');

							Global.number.counter('counter3', 90);

							header.classList.add('type-c');
							header.classList.remove('type-b');
						}
						console.log(cutline, cutpoint + half);


						break;

					case 5:
						
						if (cutline > maxH - wH) {
							if (!isReady) {
								wrap.classList.add('ready');
								console.log(1);
								// header.classList.remove('type-c');
							}
						} 
						if (cutline < maxH + minH) {
							if (isReadyNext) {
								wrapNext.classList.remove('ready');
								console.log(2);
							}
						} 
						if (cutline > maxH) {
							if (!isOn) {
								wrapPrev.classList.add('off');
								wrap.classList.remove('ready');
								wrap.classList.remove('off');
								wrap.classList.add('on');

								header.classList.add('type-b');
								header.classList.remove('type-c');
								console.log(3);
							}
						} else {
							if (!!isOn) {
								wrapPrev.classList.remove('ready');
								wrapPrev.classList.remove('off');
								wrap.classList.remove('on');
								header.classList.add('type-c');
								header.classList.remove('type-b');
								console.log(4);
							}
						}

						cutpoint = maxH;

						if (cutline < cutpoint - wH + 10) {
							header.classList.add('type-c');
							console.log(5);
						}

						itemMotion = (wH / 5) - ((cutline - cutpoint) * 3);
						itemMotion2 = (wH / 3) - ((cutline - cutpoint) * 2);
						itemMotion3 = (wH / 2) - ((cutline - cutpoint) * 1.2);
						itemMotion4 = (wH / 2) - ((cutline - cutpoint) * 0.8);

						itemMotion < 0 ? itemMotion = 0 : itemMotion > wH ? itemMotion = wH: '';
						itemMotion2 < 0 ? itemMotion2 = 0 : itemMotion2 > wH ? itemMotion2 = wH: '';
						itemMotion3 < 0 ? itemMotion3 = 0 : itemMotion3 > wH ? itemMotion3 = wH: '';
						itemMotion4 < 0 ? itemMotion4 = 0 : itemMotion4 > wH ? itemMotion4 = wH: '';
							
						unit[0].style.transform = 'translate(0,'+ itemMotion +'px)';
						unit[1].style.transform = 'translate(0,'+ itemMotion2 +'px)';
						unit[2].style.transform = 'translate(0,'+ itemMotion3 +'px)';
						unit[3].style.transform = 'translate(0,'+ itemMotion4 +'px)';
						
						break;

					case 6:
						
						if (cutline > maxH - wH) {
							if (!isReady) {
								wrap.classList.add('ready');
								console.log(1);
								// header.classList.remove('type-c');
							}
						} 
						if (cutline < maxH + minH) {
							if (isReadyNext) {
								wrapNext.classList.remove('ready');
								console.log(2);
							}
						} 
						if (cutline > maxH) {
							if (!isOn) {
								wrapPrev.classList.add('off');
								wrap.classList.remove('ready');
								wrap.classList.remove('off');
								wrap.classList.add('on');

								header.classList.add('type-b');
								header.classList.remove('type-c');
								console.log(3);
							}
						} else {
							if (!!isOn) {
								wrapPrev.classList.remove('ready');
								wrapPrev.classList.remove('off');
								wrap.classList.remove('on');
								header.classList.add('type-c');
								header.classList.remove('type-b');
								console.log(4);
							}
						}

						cutpoint = maxH;

						itemMotion = (wH / 5) - ((cutline - cutpoint) * 3);
						itemMotion2 = (wH / 3) - ((cutline - cutpoint) * 2);
			

						itemMotion < 0 ? itemMotion = 0 : itemMotion > wH ? itemMotion = wH: '';
						itemMotion2 < 0 ? itemMotion2 = 0 : itemMotion2 > wH ? itemMotion2 = wH: '';
						
							
						unit[0].style.transform = 'translate(0,'+ itemMotion +'px)';
						unit[1].style.transform = 'translate(0,'+ itemMotion2 +'px)';
					
						
						break;

					case 7:
						
						if (cutline > maxH - wH) {
							if (!isReady) {
								wrap.classList.add('ready');
								header.classList.remove('type-c');
								header.classList.add('type-b');	
							}
						} 
						if (cutline < maxH + minH) {
							if (isReadyNext) {
								wrapNext.classList.remove('ready');
								header.classList.add('type-b');	
								header.classList.remove('type-c');	
							}
						}

						if (cutline > maxH) {
							if (!isOn) {
								wrapPrev.classList.add('off');
								wrap.classList.remove('ready');
								wrap.classList.remove('off');
								wrap.classList.add('on');
							}
						} else {
							if (!!isOn) {
								wrapPrev.classList.remove('ready');
								wrapPrev.classList.remove('off');
								wrap.classList.remove('on');
							}
						}

						cutpoint = maxH;
						itemMotion = (wH / 3) - ((cutline - cutpoint) * 3);
						itemMotion2 = (wH / 2) - ((cutline - cutpoint) * 2);

						itemMotion < 0 ? itemMotion = 0 : itemMotion > wH ? itemMotion = wH: '';
						itemMotion2 < 0 ? itemMotion2 = 0 : itemMotion2 > wH ? itemMotion2 = wH: '';
							
						unit[0].style.transform = 'translate(0,'+ itemMotion +'px)';
						unit[1].style.transform = 'translate(0,'+ itemMotion2 +'px)';
						break;

					case 8:
						scene = (minH - wH) / 10;

						const card = item.querySelector('.card-list');
						let cardw = 1010;

						if (cutline > maxH - wH) {
							if (!isReady) {
								wrap.classList.add('ready');
							}
						} 
						if (cutline < maxH + minH) {
							if (isReadyNext) {
								wrapNext.classList.remove('ready');
							}
						} 
						if (cutline > maxH) {
							if (!isOn) {
								wrapPrev.classList.add('off');
								wrap.classList.remove('ready');
								wrap.classList.remove('off');
								wrap.classList.add('on');
							}
						} else {
							if (!!isOn) {
								wrapPrev.classList.remove('ready');
								wrapPrev.classList.remove('off');
								wrap.classList.remove('on');
							}
						}

						console.log(card, cardw)
						
						cutpoint = maxH;
						card.style.transform = 'translateX('+ (cardw * 0) +')';

						if (cutline > cutpoint + (scene * 2)) {
							card.style.transform = 'translateX('+ (cardw * -1) +'px)';
						} 
						if (cutline > cutpoint + (scene * 4)) {
							card.style.transform = 'translateX('+ (cardw * -2) +'px)';
						}
						if (cutline > cutpoint + (scene * 6)) {
							card.style.transform = 'translateX('+ (cardw * -3) +'px)';
						}
						if (cutline > cutpoint + (scene * 8)) {
							card.style.transform = 'translateX('+ (cardw * -4) +'px)';
						}
						break;

					case 9:
						//scene = (pH - maxH - wH) / 10;

						if (cutline > maxH - wH) {
							if (!isReady) {
								wrap.classList.add('ready');
							}
						} 
						
						if (cutline > maxH) {
							if (!isOn) {
								wrapPrev.classList.add('off');
								wrap.classList.remove('ready');
								wrap.classList.remove('off');
								wrap.classList.add('on');

								header.classList.remove('type-b');
							}
						} else {
							if (!!isOn) {
								wrapPrev.classList.remove('ready');
								wrapPrev.classList.remove('off');
								wrap.classList.remove('on');

								header.classList.add('type-b');
							}
						}

						break;
					
				}
                  
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
