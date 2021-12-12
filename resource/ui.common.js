;(function(win, doc, undefined) {

	'use strict';
	
	netive.common = {
		init: function(){
			
			netive.ajax.init({ 
				area: document.querySelector('.base-body'), 
				url: 'service.html', 
				page: true, 
				effect: true,
				callback: function(){
                    netive.parallax.init('service');
				}
			});

            const el_nav = doc.querySelector('.nav-link');
            const el_navbtn = el_nav.querySelectorAll('button');

            for (let i = 0, len = el_navbtn.length; i < len; i++) {
                const that = el_navbtn[i];

                that.addEventListener('click', pageGO);
            }
           

            function pageGO() {
                const that = this;
                netive.ajax.init({ 
                    area: document.querySelector('.base-body'), 
                    url: that.dataset.link + '.html', 
                    page: true, 
                    effect: true,
                    callback: function(){
                        //netive.common.pageInit(fristHref);
                        const el_body = doc.querySelector('body');
                        el_body.classList.remove('page-service');
                        el_body.classList.remove('page-overview');
                        el_body.classList.remove('page-apply');

                        el_body.classList.add('page-' + that.dataset.link);

						window.removeEventListener('scroll', netive.parallax.act);
						
                        if (that.dataset.link === 'service') {
                            netive.parallax.init('service');
                        }

                        console.log(that.dataset.link);
                       
                    }
                });


                console.log(1111, this.dataset.link);
            }

			console.log('------------------------------------------------------')	
		},
		
		header: function(){
			
			
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
