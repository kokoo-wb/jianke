/**
 *   Author zhuhuishao
 *   Name commonExecute
 *   
 *   功能： 解决全局用到的通用Jquery事件执行 包括Menu Nav 等
 *   描述： --------------------------------------------
 */
var commonExecute = function () {

    // 菜单展开列表枚举
    var MENU_ENUM = {
        systemCheck: [
            { name: 'E.T-Bridge（市政）', url: '/html/project_statistics.html' },
            { name: 'E.T-Bridge（公路）', url: '#' }
        ]
    };


    /**
     * [菜单展开]
     * @desc Header Menu hover show
    */
    $('.menu ul li a').mouseover(function () {
        if ($('.slide-menu').attr('data-hover') != $(this).attr('data')) {
            $('.slide-menu').slideUp().html('');

            if ($(this).attr('data')) {
                $('.slide-menu').attr('data-hover', $(this).attr('data'));
                $.each(MENU_ENUM[$(this).attr('data')], function () {
                    $('.slide-menu').append('<a href="' + this.url + '">' + this.name + '</a>');
                });
                $('.slide-menu').slideDown();
            }
            else {
                $('.slide-menu').removeAttr('data-hover');
            }
        }
    });


    /**
     * [鼠标离开菜单区域]
     * @desc 鼠标离开Menu 收起菜单
    */
    $('.header').hover(function () { }, function () {
        $('.slide-menu').removeAttr('data-hover').slideUp().html('');
    });


    /**
     * [侧边栏展开]
     * @desc 侧边栏点击展开
    */
    $('.nav-item').click(function () {
        var _this = this;
        if ($(this).attr('class').indexOf('nav-open') >= 0) {
            $(this).find('ul').slideUp(300, function () {
                $(_this).removeClass('nav-open');
            });
        }
        else {
            $('.nav-item ul').slideUp();
            $(_this).find('ul').slideDown(300, function () {
                $('.nav-item').removeClass('nav-open');
                $(_this).addClass('nav-open');
            });
        }
    });


    /**
     * [侧边栏选中]
     * @desc 点击nav 选项选中效果
    */
    $('.nav ul li').click(function () {
        $('.nav ul li').removeClass('nav-active');
        $(this).attr('class', 'nav-active');
    });


    /**
     * [点击浏览器触发事件]
     * @desc 点击浏览器触发事件
    */
    $(document).click(function () {
        $('.select ul').slideUp('fast');
        // commonPlugins.closeModal();
    });


    // body最大宽度与显示屏同宽
    $('body, .slide-menu').css({
        'max-width': $(window).width(),
        'margin': '0 auto'
    });

    $('.slide-menu').css({
        'max-width': $(window).width(),
        'left': '50%',
        'margin-left': '-' + $(window).width() / 2 + 'px'
    });

    $('.content-in').css('min-height', $(window).height());
    $('.bridge-modal-content').css('min-height', $(window).height());
}();




/**
 *   Author zhuhuishao
 *   Name commonValidate
 *   
 *   功能： 配置全局的表单校验,用于校验非空, 电话，邮箱等
 *   描述： --------------------------------------------
 */
var commonValidate = function () {

    var inputValidate = function () {
        var inputList = $('input');
        var validateResult = {
            status: true,
            message: ''
        }

        $.each(inputList, function () {
            // 校验是否为空
            if ($(this).attr('name') == 'required') {
                if ($(this).val() == '') {
                    validateResult.status = false;
                    validateResult.message = $(this).attr('data') + '不能为空';
                    return false;
                }
            }
        });

        return validateResult;
    }

    return {
        inputValidate: function () {
            return inputValidate();
        }
    }
}();





/**
 *   Author zhuhuishao
 *   Name commonPlugins
 *   
 *   功能： 提供全局公共组件 包括Modal Select Button 等
 *   描述： --------------------------------------------
 */
var commonPlugins = function () {
    /**
     * [侧边栏选中]
     * @param [type] name [desc]
     * @return [type] name [desc]
    */
    var selectInit = function () {

        // 点击下拉列表展开选项
        $('.select').click(function (event) {
            $('.select ul').slideUp('fast');
            if ($(this).find('ul').css('display') == 'block') {
                $(this).find('ul').slideUp('fast');
            }
            else {
                $(this).find('ul').slideDown('fast');
            }
            event.stopPropagation();
        });

        // 点击下拉列表选项 选中下拉列表
        $('.select ul li').click(function (event) {
            $(this).closest('.select').find('ul').slideUp('fast');
            $(this).closest('.select').find('span').text($(this).text());
            event.stopPropagation();
        });
    }


    /**
     * [展开Modal对话框]
     * @param [string] id [modal id]
     * @return [type] name [desc]
    */
    var showModal = function (id, obj) {
        var modalElement = document.getElementById(id);
        if (modalElement && $(modalElement).attr('class') == 'modal') {
            var top = $(modalElement).attr('top') || 150;

            $('body').css('overflow', 'hidden').append('<div class="modal-container"></div>');
            $('.modal-container').append('<div class="modal-content" style="top: ' + top + 'px"></div>');
            $('.modal-content').append('<div class="modal-body"></div>');
            $('.modal-body').append($('#' + id).html());
            $('.modal-body').fadeIn('fast');

            $('.modal-container').click(function (event) {
                var e = e || window.event,
                    target = e.target || e.srcElement;

                if ($(target).attr('class') == 'modal-content' || $(target).attr('class') == 'modal-container') {
                    closeModal();
                }
            });

            if (obj && obj.onOk) {
                $('.onok').on('click', function () {
                    obj.onOk();
                })
            }

            if (obj && obj.onCancel) {
                $('.oncancel').on('click', function () {
                    obj.onCancel();
                })
            }
        }
    }


    /**
     * [关闭Modal对话框]
     * @param [type] name [desc]
     * @return [type] name [desc]
    */
    var closeModal = function () {
        $('body').css('overflow', 'visible').find('.modal-container').remove();
    }


    /**
     * [退出登录]
     * @param [type] name [desc]
     * @return [type] name [desc]
    */
    var logout = function () {
        var cf = confirm("是否确认退出登录？");

        if (cf) {
            window.location.href = "#";
        }
    }

    return {
        selectInit: function () {
            return selectInit();
        },
        showModal: function (id, obj) {
            return showModal(id, obj);
        },
        closeModal: function () {
            return closeModal();
        },
        logout: function () {
            return logout();
        }
    }
}();

commonPlugins.selectInit();