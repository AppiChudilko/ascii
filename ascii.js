$.Ascii = function() {
    this.getButton = function(label, removeBtn) {

        if (removeBtn === undefined)
            removeBtn = false;

        var border = '====';

        for (var i = 0; i < label.length; i++)
            border += '=';

        if (!removeBtn)
            return '<button class="ascii-btn">' + border + '<div class="ascii-btn-text">' + label + '</div>' + border + '</button>';
        else
            return border + '<div class="ascii-btn-text">' + label + '</div>' + border;
    };

    this.getDivider = function(width, color) {

        if (width === undefined)
            width = 100;
        if (color === undefined)
            color = '#000';

        var border = ''; //8.781 px = / 4.422 -

        for (var i = 0; i < parseInt(width / 9.6); i++)
            border += '-';

        return '<div style="width: ' + width + 'px; color: ' + color + '">' + border + '</div>';
    };

    this.getPanel = function(content, width, height, color) {

        if (width === undefined)
            width = 100;

        if (height === undefined)
            height = 100;

        if (color === undefined)
            color = '#000';

        var border = '---'; //8.781 px = / 4.422 -
        var borderVert = ''; //8.781 px = / 4.422 -

        for (var i = 0; i < parseInt(width / 9.6); i++)
            border += '-';

        for (var i = 0; i < parseInt(height / 24); i++) {
            var nbsp = '';
            for (var j = 0; j < border.length; j++)
                nbsp += ' ';

            borderVert += '|' + nbsp + '|\n';
        }

        return '<div class="ascii-content"><div class="ascii-panel-text" style="width: ' + width + 'px; height: ' + height + 'px; color: ' + color + ';">' + content + '</div>|' + border + '|\n' + borderVert + '|' + border + '|</div>';
    };

    this.init = function() {
        var ascii = new $.Ascii();
        $('.ascii-btn').each(function( index ) {
            if (!$(this).hasClass('ascii-btn-installed') && $(this).attr('btn-label') !== undefined) {
                $(this).html(ascii.getButton($(this).attr('btn-label'), true));
                $(this).addClass('ascii-btn-installed');
            }
        });

        $('.ascii-divider').each(function( index ) {
            if (!$(this).hasClass('ascii-divider-installed') && !$(this).parent().hasClass('prettyprint')) {

                var width = $(this).attr('divider-width') == undefined ? $(this).parent().width() : $(this).attr('divider-width');

                $(this).html(ascii.getDivider(width, $(this).attr('divider-color')));
                $(this).width(width);
                $(this).addClass('ascii-divider-installed');
            }
        });

        $('.ascii-panel').each(function( index ) {
            if (!$(this).hasClass('ascii-panel-installed') && $(this).html() !== undefined && !$(this).parent().hasClass('prettyprint')) {


                var width = $(this).attr('panel-width') == undefined ? $(this).parent().width() : $(this).attr('panel-width');
                var height = $(this).attr('panel-height') == undefined ? $(this).parent().height() : $(this).attr('panel-height');

                $(this).html(ascii.getPanel($(this).html(), width - 40, height, $(this).attr('panel-color')));
                $(this).width(parseInt(width) + 40);
                $(this).height(parseInt(height) + 40);
                $(this).addClass('ascii-panel-installed');
            }
        });
    };

    this.resize = function() {
        var ascii = new $.Ascii();
        $('.ascii-divider-installed').each(function( index ) {
            var width = $(this).attr('divider-width') == undefined ? $(this).parent().width() : $(this).attr('divider-width');

            $(this).html(ascii.getDivider(width, $(this).attr('divider-color')));
            $(this).width(width);
        });

        $('.ascii-panel-installed').each(function( index ) {

            var html = $(this).children().children().html();

            var width = $(this).attr('panel-width') == undefined ? $(this).parent().width() : $(this).attr('panel-width');
            var height = $(this).attr('panel-height') == undefined ? $(this).parent().height() : $(this).attr('panel-height');

            $(this).html(ascii.getPanel(html, width - 40, height, $(this).attr('panel-color')));
            $(this).width(parseInt(width) + 40);
            $(this).height(parseInt(height) + 40);
        });
    };

    this.getHelloWorld = function() {
        return ["6sw9t4v2e", "6q9jrqurp", "c8g7j6vyd", "6q9js4wg5", "6t2k7xj06"].map(function(s) { return parseInt(s, 36).toString(2).replace(/1/g, "#").replace(/0/g, " "); }).join("\n");
    };
};


var $document = $(document);
var $window = $(window);
var ascii = new $.Ascii();

$document.ready(function() {
    ascii.init();
    setTimeout(function() { ascii.resize() }, 1000); //idk why bug and im use it :c
});

$window.resize(function() {
    ascii.resize();
});
