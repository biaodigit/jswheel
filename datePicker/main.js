(function () {
    var datePicker = window.datePicker;

    var monthData;
    var $wrapper;

    datePicker.buildUI = function (year, month) {
        monthData = datePicker.getMonthData(year, month);

        var html = '<div class="ui-datepicker-header">\n' +
            '        <a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>\n' +
            '        <a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>\n' +
            '        <span class="ui-datepicker-curr-month">' + monthData.year + '-' + monthData.month + '</span>\n' +
            '    </div>\n' +
            '    <div class="ui-datepicker-body">\n' +
            '        <table>\n' +
            '            <thead>\n' +
            '            <tr>\n' +
            '                <th>一</th>\n' +
            '                <th>二</th>\n' +
            '                <th>三</th>\n' +
            '                <th>四</th>\n' +
            '                <th>五</th>\n' +
            '                <th>六</th>\n' +
            '                <th>日</th>\n' +
            '            </tr>\n' +
            '            </thead>\n' +
            '            <tbody>\n';

        for (var i = 0; i < monthData.days.length; i++) {
            var date = monthData.days[i];
            if (i % 7 === 0) {
                html += '<tr>'
            }

            html += '<td data-date=' + date.date +'>' + date.showDate + '</td>'
            if (i % 7 === 6) {
                html += '</tr>'
            }

        }
        html += '</tbody>\n' +
            '        </table>\n' +
            '    </div>'

        return html
    }

    datePicker.render = function (direction) {
        var year;
        var month;
        if (monthData) {
            year = monthData.year;
            month = monthData.month;
        }
        if (direction === 'prev') month--;
        if (direction === 'next') month++;

        var html = datePicker.buildUI(year, month);
        if(!$wrapper){
            $wrapper = document.createElement('div')
            $wrapper.className = 'ui-datepicker-wrapper';
        }
        $wrapper.innerHTML = html;
        document.body.appendChild($wrapper)
    }

    datePicker.init = function (input) {
        datePicker.render();
        var $input = document.querySelector(input);
        var isOpen = false;
        $input.addEventListener('click', function () {
            if (isOpen) {
                $wrapper.classList.remove('ui-datepicker-wrapper-show');
                isOpen = false;
            } else {
                $wrapper.classList.add('ui-datepicker-wrapper-show');
                isOpen = true;
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;
                $wrapper.style.top = top + height + 2 + 'px';
                $wrapper.style.left = left + 'px'
            }
        }, false)

        $wrapper.addEventListener('click', function (e) {
            var $target = e.target;
            if (!$target.classList.contains('ui-datepicker-btn')) return;

            if ($target.classList.contains('ui-datepicker-prev-btn')) {
                datePicker.render('prev')
            } else if ($target.classList.contains('ui-datepicker-next-btn')) {
                datePicker.render('next')
            }

        }, false)
        
        $wrapper.addEventListener('click', function (e) {
            var $target = e.target;
            if($target.tagName.toLowerCase() !== 'td') return;

            var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date)
            $input.value = format(date);
            $wrapper.classList.remove('ui-datepicker-wrapper-show');
            isOpen = false;
        }, false)
    }
    
    function format(date) {
        var ret = ''

        var padding = function(month) {
            if(month <= 9){
                return '0' + month
            }
            return month
        }
        ret += date.getFullYear() + '-'
        ret += padding(date.getMonth() + 1) + '-';
        ret += padding(date.getDate())
        return ret
    }
})()