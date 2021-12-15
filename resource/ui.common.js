;(function(win, doc, undefined) {

	'use strict';
	
	netive.common = {
		naveOpen: function(){
			const el_html = doc.querySelector('html');

			el_html.classList.add('nav-open');
		},
		naveClose: function(){
			const el_html = doc.querySelector('html');

			el_html.classList.remove('nav-open');
		},
		init: function(){
			const el_body = doc.querySelector('body');
			const el_html = doc.querySelector('html');
			const el_header = doc.querySelector('.base-header');
			const firstpage = 'service';

			netive.ajax.init({ 
				area: document.querySelector('.base-body'), 
				url: firstpage + '.html', 
				page: true, 
				effect: true,
				callback: function(){
                    netive.parallax.init(firstpage);
					el_html.classList.add('page-' + firstpage);
				}
			});

            const el_nav = doc.querySelector('.nav-link');
            const el_navbtn = el_nav.querySelectorAll('button');
			const el_appstore = doc.querySelector('#appstoreToggle');
			const btn_menu = doc.querySelector('.btn-menu');
			const btn_close = doc.querySelector('.btn-close');
			
			btn_menu.addEventListener('click', netive.common.naveOpen);
			btn_close.addEventListener('click', netive.common.naveClose);
			el_appstore.addEventListener('click', appStoreDiv);

			

            for (let i = 0, len = el_navbtn.length; i < len; i++) {
                const that = el_navbtn[i];

                that.addEventListener('click', pageGO);
            }

			function appStoreDiv() {
				const wrap = doc.querySelector('.appstore');

				wrap.classList.toggle('on');
			}

            function pageGO() {
                const that = this;
                netive.ajax.init({ 
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
                        el_html.classList.add('page-' + that.dataset.link);
						el_header.classList.remove('type-b');
						el_header.classList.remove('type-c');
						netive.common.naveClose();
						window.removeEventListener('scroll', netive.parallax.act);
                    
						netive.parallax.init(that.dataset.link);

						window.scrollTo({
							top: 0,
							left: 0,
							behavior: 'smooth'
						});                       
                    }
                });
            }
		},
		pageInit: function(v){
			let jsName = null;

			if (!!doc.querySelector('#uiJsName')) {
				jsName = doc.querySelector('#uiJsName').value;
				netive.page[jsName]();
			}

			if(typeof(history.pushState) == 'function') {
				let renewURL = location.href;
				renewURL = renewURL.replace(/\&page=([0-9]+)/ig,'');
				renewURL = renewURL.split('/netiveUI/');
				renewURL = renewURL[0];
				renewURL = renewURL + v;

				let paraUrl = v.split('.');
				paraUrl = paraUrl[0].split('/');
				paraUrl = paraUrl[paraUrl.length - 1];

				const indexUrl = '/netiveUI/html/index.html?page=' + paraUrl;
   
				history.pushState(false, 'loading', indexUrl);
			}


			
		}
	};

	//modal
	

	//page 
	netive.page = {}

	//callback
	netive.callback = {
		modal: function(modalId){
			switch(modalId) {
				case 'modalID':
					break;  
			}
		}
	}

    document.addEventListener("DOMContentLoaded", function(){

        netive.common.init(); 

		
        
    });

})(window, document);
