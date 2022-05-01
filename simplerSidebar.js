/* simpler-sidebar v1.2.0 (http://dcdeiv.github.io/simpler-sidebar)
 * Copyright 2015-2015 and licensed under GPLv2 (https://github.com/dcdeiv/simpler-sidebar/blob/master/LICENSE)
强化修改1.0.0
 */
(function ($) {
    $.fn.simplerSidebar = function (options) {
        insertSidebar(options.editText);
        var cfg = $.extend(true, $.fn.simplerSidebar.settings, options);
        let $sidebar = $('#dowebok'),
        duration = cfg.animation.duration,
        sbMaxW = cfg.sidebar.width,
        gap = cfg.sidebar.gap,
        winMaxW = sbMaxW + gap,
        w = $(window).width();

        let baseAnimation = {
            duration: duration,
            easing: cfg.animation.easing
        }

        let activate = {
            ...baseAnimation,
            complete: function () {
                $('body, html').css('overflow', 'hidden');
            }
        };
        let deactivate = {
            ...baseAnimation,
            complete: function () {
                $('body, html').css('overflow', 'auto');
            }
        };

        let attrKey = 'data-' + cfg.attr;
        let $mask = $('<div>').attr(attrKey, 'mask');
        let align = cfg.sidebar.align || 'right';
        let sbw = w < winMaxW ? w - gap : sbMaxW;

        let ssbInit = {
            position: 'fixed',
            top: cfg.top,
            bottom: 0,
            width: sbw
        };

        let status;
        if (cfg.show) {
            ssbInit[align] = 0;
            status = 'active';
            cfg.implant && $('body').css('margin-' + align, sbw + 'px');
        } else {
            ssbInit[align] = -sbw;
            status = 'disabled';
        }

        $sidebar.css({
            ...ssbInit,
            ...cfg.sidebar.css
        }).attr(attrKey, status);

        //Mask style
        var maskInit = {
            position: 'fixed',
            top: cfg.top,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: cfg.sidebar.css.zIndex - 1,
            display: 'none'
        };
        cfg.mask.display && $mask.appendTo('body').css({
            ...maskInit,
            ...cfg.mask.css
        });
        cfg.opener && $(cfg.opener).click(toggleShow);

        function toggleShow() {
            let isWhat = $sidebar.attr(attrKey);

            if (isWhat === 'disabled') {
                $sidebar.animate({
                    [align]: 0
                }, activate).attr(attrKey, 'active');

                $mask.fadeIn(duration);
                cfg.implant && $('body').animate({
                    ['margin-' + align]: $sidebar.width() + 'px'
                }, activate);
            } else if (isWhat === 'active') {
                close();
            }
        }

        $sidebar.find('span#closeSidebar').on('click', close);
        $sidebar.find('span#sidebarEdit').on('click', cfg.editCb);
        $mask.click(close);
        let link = cfg.sidebar.closingLinks;
        link && $sidebar.on('click', $(link), close);

        function close() {
            if ($sidebar.attr(attrKey) === 'active') {
                $sidebar.animate({
                    [align]: -$sidebar.width()
                }, deactivate).attr(attrKey, 'disabled');
                colseMask();

            }
        }

        function colseMask() {
            $mask.fadeOut(duration);
            cfg.implant && $('body').animate({
                ['margin-' + align]: '0'
            }, deactivate);
        }

        0 && $(window).resize(function () {
            $sidebar.attr(attrKey, 'disabled').css({
                width: sbw,
                [align]: -sbw
            });

            colseMask();
            $('body, html').css({
                overflow: 'auto'
            });
        });

        this.updateData = function (dataArr) {
            let $ul = $sidebar.find('ul');
            $ul.empty();
            dataArr.map((v, i) => $ul.append(`<li class="${v.active?'active':''}"><a href="javascript:void(0)" index="${i}">${v.title}</a></li>`));
            cfg.itemCb && $ul.find('li>a').on('click', async e => {
                let index = $(e.target).attr('index') * 1;
                let res = await cfg.itemCb(dataArr[index], index);
                if (res) {
                    $('li.active').removeClass('active');
                    $(e.target).parent().addClass('active');
                }
            });
        }
        this.toggleShow = toggleShow;
        this.close = close;
        return this;
    };

    $.fn.simplerSidebar.settings = {
        attr: 'simplersidebar',
        show: false,
        top: 0,
        animation: {
            duration: 500,
            easing: 'swing'
        },
        sidebar: {
            width: 350,
            gap: 64,
            // closingLinks: 'a',
            css: {
                zIndex: 3000
            }
        },
        mask: {
            display: true,
            css: {
                backgroundColor: 'black',
                opacity: 0.5,
                filter: 'Alpha(opacity=50)'
            }
        }
    };
    function insertSidebar(actionText) {

        $('body').append(`<style>
		.sidebar-wrapper {
			position: relative;
			height: 100%;
			overflow: auto;
		}

		#dowebok {
			position: fixed;
			left: -250px;
			top: 0;
			bottom: 0;
			width: 250px;
			background-color: #084887;
		}

		#dowebok .nav {
			
			margin-top: 15px;
			line-height: 40px;
			list-style-type: none;
			padding:0;
			margin-left:5px;
		}
		
		#dowebok .nav>li.active {
			background:orange;
		}
		#dowebok .nav a {
			
			display: block;
			padding: 0 5px;
			color: #fff;
			text-decoration: none;
		}

		#dowebok .nav a:hover {
			background-color: #0883fd;
		}

		[data-simplersidebar='active'] {
			box-shadow: 3px 0px 3px 0px rgba(0, 0, 0, 0.5);
		}</style>
		<div class="sidebar" id="dowebok" data-simplersidebar="active" style="position: fixed; top: 0px; bottom: 0px; width: 250px; left: 0px; z-index: 3000;">
		<span style="width: 40px;padding: 5px;color: white;font-size: 20px;" id="closeSidebar">&lt;&lt;</span><span style="float:right;width: 40px;padding: 5px;color: white;font-size: 16px;" id="sidebarEdit">${actionText||''}</span>
			<ul class="nav">
				<!--<li><a href="javascript:void(0)">dowebok</a></li>
				<li><a href="javascript:void(0)">代码</a></li>-->
			</ul>
		</div>
		</div>`);

    }

})(jQuery);
