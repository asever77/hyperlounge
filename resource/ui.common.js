;(function(win, doc, undefined) {

	'use strict';
	
	HyperloungeUI.common = {
		init: function(){
			const el_body = doc.querySelector('body');
			const el_html = doc.querySelector('html');
			const el_header = doc.querySelector('.base-header');
			const el_nav = doc.querySelector('.nav-link');
            const el_navbtn = el_nav.querySelectorAll('button');
			const el_home = doc.querySelector('.logo button');
			const el_appstore = doc.querySelector('#appstoreToggle');
			const el_appstore2 = doc.querySelector('#appstoreToggle2');
			const btn_menu = doc.querySelector('.btn-menu');
			const btn_close = doc.querySelector('.btn-close');
			const firstpage = 'service';

			HyperloungeUI.ajax.init({ 
				area: document.querySelector('.base-body'), 
				url: firstpage + '.html', 
				page: true, 
				effect: true,
				callback: function(){
                    HyperloungeUI.parallax.init(firstpage);
					el_html.classList.add('page-' + firstpage);
					Splitting();
					setTimeout(function(){
						doc.querySelector('.service-item.n1 .line').classList.add('act');
						setTimeout(function(){
							doc.querySelector('.page-service').classList.add('scroll');
						},600);
					},2500);
				}
			});

			btn_menu.addEventListener('click', HyperloungeUI.common.naveOpen);
			btn_close.addEventListener('click', HyperloungeUI.common.naveClose);
			el_appstore && el_appstore.addEventListener('click', appStoreDiv);
			el_appstore2 && el_appstore2.addEventListener('click', appStoreDiv);
			el_home.addEventListener('click', pageGO);
			
            for (let i = 0, len = el_navbtn.length; i < len; i++) {
                const that = el_navbtn[i];

                that.addEventListener('click', pageGO);
            }

			function appStoreDiv(e) {
				const btn = e.currentTarget;
				const toggle = btn.dataset.toggle;
				const wrap = doc.querySelector('.appstore[data-toggle="'+toggle+'"]');

				wrap.classList.toggle('on');
			}
			
            function pageGO() {
                const that = this;
                HyperloungeUI.ajax.init({ 
                    area: document.querySelector('.base-body'), 
                    url: that.dataset.link + '.html', 
                    page: true, 
                    effect: true,
                    callback: function(){
						el_body.dataset.n = 0;
						el_body.removeAttribute('class');
						el_body.classList.add('step0');
						el_html.classList.remove('is-bar');
                        el_html.classList.remove('page-service');
                        el_html.classList.remove('page-overview');
                        el_html.classList.remove('page-apply');
						el_html.classList.remove('scroll');
                        el_html.classList.add('page-' + that.dataset.link);
						el_header.classList.remove('type-b');
						el_header.classList.remove('type-c');
						HyperloungeUI.common.naveClose();
						window.removeEventListener('scroll', HyperloungeUI.parallax.act);
						HyperloungeUI.parallax.init(that.dataset.link);

						if (that.dataset.link === 'service') {
							Splitting();
							setTimeout(function(){
								doc.querySelector('.service-item.n1 .line').classList.add('act');
								setTimeout(function(){
									doc.querySelector('.page-service').classList.add('scroll');
								},600);
							},2400);
						}  
						window.scrollTo({
							top: 0,
							left: 0
						});                       
                    }
                });
            }
		},
		naveOpen: function(){
			const el_html = doc.querySelector('html');

			el_html.classList.add('nav-open');
		},
		naveClose: function(){
			const el_html = doc.querySelector('html');

			el_html.classList.remove('nav-open');
		}
	};

    document.addEventListener("DOMContentLoaded", function(){
        HyperloungeUI.common.init(); 
    });

})(window, document);
