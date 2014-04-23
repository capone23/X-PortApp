var myApp = new Framework7({
    onBeforePageInit: function (page) {
    },
    onPageInit: function (page) {
    },
    onPageAfterAnimation: function (page) {
    },
    onPageBeforeAnimation: function (page) {
    }
});

var $$ = myApp.$;

var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});
var rightView = myApp.addView('.view-right', {
    dynamicNavbar: true
});

// Events for specific pages when it initialized
$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    if (page.name === 'modals') {
        $$('.demo-alert').tap(function () {
            myApp.alert('Hello!');
        });
        $$('.demo-confirm').tap(function () {
            myApp.confirm('Are you feel good today?', function () {
                myApp.alert('Great!');
            });
        });
        $$('.demo-prompt').tap(function () {
            myApp.prompt('What is your name?', function (data) {
                myApp.confirm('Are you sure that your name is ' + data + '?', function () {
                    myApp.alert('Ok, your name is ' + data + ' ;)');
                });
            });
        });
    }
    //Preloader page events
    if (page.name === 'preloader') {
        $$('.demo-indicator').tap(function () {
            myApp.showIndicator();
            setTimeout(function () {
                myApp.hideIndicator();
            }, 2000);
        });
        $$('.demo-preloader').tap(function () {
            myApp.showPreloader();
            setTimeout(function () {
                myApp.hidePreloader();
            }, 2000);
        });
        $$('.demo-preloader-custom').tap(function () {
            myApp.showPreloader('My text...');
            setTimeout(function () {
                myApp.hidePreloader();
            }, 2000);
        });
    }
    //Swipe to delete events callback demo
    if (page.name === 'swipe-delete') {
        $$('.demo-remove-callback').on('deleted', function () {
            myApp.alert('Thanks, item removed!');
        });
    }
    // Action sheet, we use it on two pages
    if (page.name === 'swipe-delete' || page.name === 'modals') {
        $$('.demo-actions').tap(function () {
            myApp.actions([
                [
                    {
                        text: 'Here comes some optional description or warning for actions below',
                        label: true
                    },
                    {
                        text: 'Alert',
                        onClick: function () {
                            myApp.alert('He Hoou!');
                        }
                    },
                    {
                        text: 'Nice Red Button ',
                        red: true,
                        onClick: function () {
                            myApp.alert('You have clicked red button!');
                        }
                    },
                ],
                [
                    {
                        text: 'Cancel',
                        bold: true
                    }
                ]
            ]);
        });
    }
    //Messages page
    if (page.name === 'messages') {
        var conversationStarted = false;
        var answers = [
            'Yes!',
            'No',
            'Hm...',
            'I am not sure',
            'And what about you?',
            'May be ;)',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus tincidunt erat, a convallis leo rhoncus vitae.'
        ];
        var answerTimeout;
        $$('.ks-messages-form').on('submit', function (e) {
            e.preventDefault();
            var input = $$(this).find('.ks-messages-input');
            var messageText = input.val();
            if (messageText.length === 0) return;
            input.val('');

            myApp.addMessage({
                text: messageText,
                type: 'sent',
                day: !conversationStarted ? 'Today' : false,
                time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
            });
            conversationStarted = true;

            if (answerTimeout) clearTimeout(answerTimeout);
            answerTimeout = setTimeout(function () {
                myApp.addMessage({
                    text: answers[Math.floor(Math.random() * answers.length)],
                    type: 'received'
                });
            }, 2000);
        });
        $$('.ks-send-message').tap(function () {
            $$('.ks-messages-form').trigger('submit');
        });
    }
    // Pull To Refresh Demo
    if (page.name === 'pull-to-refresh') {

        var songs = ['Yellow Submarine', 'Don\'t Stop Me Now', 'Billie Jean', 'Californication'];
        var authors = ['Beatles', 'Queen', 'Michael Jackson', 'Red Hot Chili Peppers'];

        var ptrContent = $$(page.container).find('.pull-to-refresh-content');

        ptrContent.on('refresh', function (e) {
            // Emulate 2s loading
            setTimeout(function () {
                var picURL = 'http://hhhhold.com/88/d/jpg?' + Math.round(Math.random() * 100);
                var song = songs[Math.floor(Math.random() * songs.length)];
                var author = authors[Math.floor(Math.random() * authors.length)];
                var linkHTML = '<li class="fb-post-frame">' +
                            ' <div class="item-content list-block-fb">' +
                            ' <div class="item-media"><img src="img/fb-icon6_@2x.png" width="44"/></div>' +
                            ' <div class="item-inner">' +
                            ' <div class="item-title-row">' +
                            ' <div class="item-title">Comcast Xfinity</div>' +
                            ' </div>' +
                            ' <div class="item-subtitle gray">Sunday at 10:56 AM</div>' +
                            ' </div>' +
                            ' </div>' +
                            ' <article>' +
                            ' <span>Xfinity X1 TV and blazing fast internet is avialable at your new home!</span></br>' +
                            ' <a href="hello.html">Learn about transferring service</a>' +
                            ' </article>' +
                            ' <div class="item-content2">' +
                            ' <div class="item-inner">' +
                            ' <ul class="fb-options">' +
                            ' <li class="like">Like</li>' +
                            ' <li class="comment">Comment</li>' +
                            ' <li class="share">Share</li>' +
                            ' </ul> ' +
                            ' </div>' +
                            ' </div>' +
                            ' </li>';
                ptrContent.find('ul.new-post').prepend(linkHTML);
                myApp.pullToRefreshDone();
            }, 2000);
        });
    }


    if (page.name === 'disconnect-date'){

            window.onload = function () {
                var element = document.querySelectorAll('[placeholder]');

                for (var i in element) {
                    if (element[i].nodeType == 1 && element[i].nodeName == "INPUT") {

                        element[i].value = element[i].getAttribute('placeholder');
                        element[i].style.color = "#777";

                        element[i].onfocus = function (event) {
                            if (this.value == this.getAttribute('placeholder')) {
                                this.value = "";
                                this.style.color = "#000";
                            };
                        };

                        /* We the input is left */
                        element[i].onblur = function (event) {
                            if (this.value == "") {
                                this.value = this.getAttribute('placeholder');
                                this.style.color = "#777";
                            }
                        };
                    }
                }
            }
    }

    if (page.name === 'new-install'){
        $(function(){
          $.datepicker.setDefaults(
            $.extend($.datepicker.regional[''])
          );
          $('#datepicker').datepicker();
          $('#datepicker2').datepicker();
        });
    }

    if (page.name === 'it-scan-network') {

        var blockHTML = '<div class="content-block content-block-app-welcome">' +
                        '<div class="content-block-inner app-inner app-new-address">' +
                        '<h1 style="padding:20px 20px 10px 0;">Devices connected to your Wireless Gateway </h1>' +
                        '<div class="app-list-devices">' +
                        '<div class="list-block media-list device-list">' +
                        '<ul>' +
                        '<li><a href="#" class="item-link item-content">' +
                        '<div class="green-check"></div>' +
                        '<div class="arrow"></div>' +
                        '<div class="item-media"><img src="img/dl-laptop@2x.png" width="80"></div>' +
                        '<div class="item-inner">' +
                        '<div class="item-title">David’s Laptop</div>' +
                        '<div class="item-subtitle gray">Connected</div>' +
                        '</div></a></li>' +
                        '<li><a href="#" class="item-link item-content">' +
                        '<div class="red-cross"></div>' +
                        '<div class="item-media"><img src="img/dl-print@2x.png" width="80"></div>' +
                        '<div class="item-inner">' +
                        '<div class="item-title">David’s Printer</div>' +
                        '<div class="item-subtitle" style="color:#f37a03; font-style: italic;">Connection lost</div>' +
                        '</div></a></br>' +
                        '<a href="it_scan_printer.html" class="button button-inner button-big active success">Reconnect</a>' +
                        '</li>' +
                        '<li><a href="#" class="item-link item-content">' +
                        '<div class="arrow"></div>' +
                        '<div class="green-check"></div>' +
                        '<div class="item-media"><img src="img/dl-phone@2x.png" width="80"></div>' +
                        '<div class="item-inner">' +
                        '<div class="item-title">David’s Phone</div>' +
                        '<div class="item-subtitle gray">Connected</div>' +
                        '</div></a></li>' +
                        '</ul>'  +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

        setTimeout(function() {
        $('.network-scanned').fadeOut('fast');
            setTimeout(function() {
                var ptrContent = $$(page.container).find('.scanning');
                $('.scanning').addClass('lightUI');
                $('.scanning').removeClass('itUI');
                ptrContent.prepend(blockHTML);
            },1000);

        },3000);
    }

    if (page.name === 'transfer-network') {

        var blockHTML ='<div class="content-block content-block-app-welcome">' +
                        '<div class="content-block-inner app-inner app-new-address">' +
                        '<h1 style="padding:20px 20px 10px 0;">Devices connected to your Wireless Gateway </h1>' +
                        '<div class="app-list-devices">' +
                        '<div class="list-block media-list device-list">' +
                        '<ul>' +
                        '<li><a href="#" class="item-link item-content">' +
                        '<div class="red-cross"></div>' +
                        '<div class="arrow"></div>' +
                        '<div class="item-media"><img src="img/dl-laptop@2x.png" width="80"></div>' +
                        '<div class="item-inner">' +
                        '<div class="item-title">David’s Laptop</div>' +
                        '<div class="item-subtitle" style="color:#f37a03; font-style: italic;">Connection lost</div>' +
                        '</div></a></li>' +
                        '<li><a href="#" class="item-link item-content">' +
                        '<div class="red-cross"></div>' +
                        '<div class="item-media"><img src="img/dl-print@2x.png" width="80"></div>' +
                        '<div class="item-inner">' +
                        '<div class="item-title">David’s Printer</div>' +
                        '<div class="item-subtitle" style="color:#f37a03; font-style: italic;">Connection lost</div>' +
                        '</div></a>' +
                        '</li>' +
                        '<li><a href="#" class="item-link item-content">' +
                        '<div class="arrow"></div>' +
                        '<div class="red-cross"></div>' +
                        '<div class="item-media"><img src="img/dl-phone@2x.png" width="80"></div>' +
                        '<div class="item-inner">' +
                        '<div class="item-title">David’s Phone</div>' +
                        '<div class="item-subtitle" style="color:#f37a03; font-style: italic;">Connection lost</div>' +
                        '</div></a></li>' +
                        '</ul>' +
                        '</br><a href="transfer-recconect.html" class="button button-inner button-big active success">Reconnect your devices</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

        setTimeout(function() {
        $('.network-scanned').fadeOut('fast');
            setTimeout(function() {
                var ptrContent = $$(page.container).find('.scanning');
                $('.scanning').addClass('lightUI');
                $('.scanning').removeClass('itUI');
                ptrContent.prepend(blockHTML);
            },1000);

        },3000);
    }

    if (page.name === 'it-scan-list'){
        $$('.success').on('tap',function(){
            window.location.replace("it_scan_printer.html");
        });
    }

    if (page.name === 'it-scan-printer') {

        var successBlock = '<div class="content-block-inner app-inner scann-inner">' +
                           ' <h1>Success!</h1>' +
                           ' <div class="gray">Your Canon SB-2100 is now connected</div></br>' +
                           ' <div class="print_profile_success"></div></br>' +
                           ' <a href="index.html" class="button button-big active">Done</a>' +
                           ' </div>';

        setTimeout(function() {
                $('.list-success').fadeOut('fast');
            setTimeout(function() {
                var ptrContent = $$(page.container).find('.scann-list');
                ptrContent.prepend(successBlock);
                $('.print_profile_success').fadeIn('slow');
            },1000);

        },3000);
    }

    if (page.name === 'transfer-scan') {

        var successBlock = '<div class="content-block-inner app-inner scann-inner">' +
                           ' <h1>Success!</h1>' +
                           ' <div class="gray">Your network has been transferred</div></br>' +
                           ' <div class="network_success"></div></br>' +
                           ' <a href="splash2.html" class="button button-big active">Done</a>' +
                           ' </div>';

        setTimeout(function() {
                $('.list-success').fadeOut('fast');
            setTimeout(function() {
                var ptrContent = $$(page.container).find('.scann-list');
                ptrContent.prepend(successBlock);
                $('.network_success').fadeIn('slow');
            },1000);

        },3000);
    }

    if (page.name === 'transfer-service'){

        setTimeout( function() {
           $('.pinWrap').animate({
                marginTop : 92
           },300, "swing");
        },1000);

    }

    if (page.name === 'install-window'){
        $('.active').on('tap',function(){
            $('.l1').toggleClass('active-l1');
        });
    }

});

// Required for demo popover
$$('.popover a').tap(function () {
    myApp.closeModal('.popover');
});

// Change statusbar bg when panel opened/closed
$$('.panel-left').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-left');
});
$$('.panel-right').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-right');
});
$$('.panel-left, .panel-right').on('close', function () {
    $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});

// Generate Content Dynamically
var dynamicPageIndex = 0;
function createContentPage() {
    mainView.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link">Back</a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-content" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or generate <a href="#" class="ks-generate-page">one more page</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
    return;
}
$$(document).tap('.ks-generate-page', createContentPage);