(function () {

    /**
     * 日期 util 类
     */
    DateUtil = {
        /**
         * 一个 date 的格式化方法
         * @param {any} date
         * @param {any} fstr
         * @param {any} utc
         * @returns
         */
        dateFormat: function (date, fstr, utc) {
            utc = utc ? 'getUTC' : 'get';
            return fstr.replace(/%[YmdHMS]/g, function (m) {
                switch (m) {
                case '%Y':
                    return date[utc + 'FullYear']();
                case '%m':
                    m = 1 + date[utc + 'Month']();
                    break;
                case '%d':
                    m = date[utc + 'Date']();
                    break;
                case '%H':
                    m = date[utc + 'Hours']();
                    break;
                case '%M':
                    m = date[utc + 'Minutes']();
                    break;
                case '%S':
                    m = date[utc + 'Seconds']();
                    break;
                default:
                    return m.slice(1);
                }
                return ('0' + m).slice(-2);
            });
        },
        /**
         * 获取相对某日的日期
         * @param date 基准日期
         * @n 相对几天，可以是负数
         */
        addDate: function (date, n) {
            let _dateTs = date.getTime(),
                _date = new Date(_dateTs + n * (24 * 3600 * 1000));
            return _date;
        },
        /**
         * 获取某一天所在的一周时间
         * @param {any} date
         * @returns
         */
        getWeekDays: function (date) {
            date = (date && Object.prototype.toString.call(date) === '[object Date]') ? date : new Date();
            const firstWeekDay = DateUtil.addDate(date, date.getDay() * -1);
            const _dates = [];
            for (let i = 0; i < 7; i++) {
                let _date = {};
                _date.date = i === 0 ? firstWeekDay : DateUtil.addDate(firstWeekDay, i);
                _date.dateStr = DateUtil.dateFormat(_date.date, '%Y-%m-%d');
                _dates.push(_date);
            }
            return _dates;
        },
    }

    /**
     * 月历
     * @param {any} date
     */
    function MonthDate (date) {
        let _date;
        if (Object.prototype.toString.call(date) === '[object Date]') {
            _date = date;
        } else {
            _date = new Date(date);
        }
        _date = _date.toString() === 'Invalid Date' ? new Date() : _date;
        this.date = _date;
        this.monthDates = this.getMonthDate();
    }

    /**
     * 获取这一月的日期列表
     * @returns
     */
    MonthDate.prototype.getMonthDate = function () {
        const date = this.date;
        const thisYear = date.getFullYear(),
            thisMonth = date.getMonth() + 1,
            startDateStr = thisYear + '-' + thisMonth + '-' + '01 ';
        
        let _date = new Date(startDateStr),
            _month = thisMonth,
            _dateStr;
        const dateArr = [];
        while (_month === thisMonth) {
            _dateStr = DateUtil.dateFormat(_date, '%Y-%m-%d');
            dateArr.push(_dateStr);
            _date = DateUtil.addDate(new Date(_dateStr), 1);
            _month = _date.getMonth() + 1;
        }
        return dateArr;
    }

    /**
     * 获取某一月的日历，按周分组
     * @returns
     */
    MonthDate.prototype.getMonthDateByWeek = function () {
        const dateArr = this.monthDates;
        const monthDateByWeek = [];
        let weekDate = [];
        dateArr.forEach(function (value, i) {
            const day = new Date(value).getDay();
            if (day === 0) {
                weekDate = [];
            }
            weekDate[day] = value;
            if (day === 6 || i === dateArr.length - 1) {
                monthDateByWeek.push(weekDate);
            }
        });
        return monthDateByWeek;
    }

    /**
     * 在月历以 week 分组的数据基础上，取这个月的第一天
     * @returns
     */
    MonthDate.prototype.getFirstDay = function () {
        return this.monthDates[0];
    }
    /**
     * 在月历以 week 分组的数据基础上，取这个月的第一天
     * @returns
     */
    MonthDate.prototype.getLastDay = function () {
        return this.monthDates[this.monthDates.length - 1];
    }

    /**
     * 获取下个月
     */
    MonthDate.prototype.nextMonth = function () {
        const markDay = DateUtil.addDate(new Date(this.getLastDay()), 1);
        return new MonthDate(markDay);
    }
    /**
     * 获取上个月
     */
    MonthDate.prototype.preMonth = function () {
        const markDay = DateUtil.addDate(new Date(this.getFirstDay()), -1);
        return new MonthDate(markDay);
    }

    /**
     * 获取某一天所在的周
     * 可当作 static 来使用，无 this 相关
     * @param {Date} date
     * @returns
     */
    MonthDate.prototype.getWeekDays = function (date) {
        date = (date && Object.prototype.toString.call(date) === '[object Date]') ? date : new Date();
        const firstWeekDay = DateUtil.addDate(date, date.getDay() * -1);
        const _dates = [];
        for (let i = 0; i < 7; i++) {
            let _date = {};
            _date.date = i === 0 ? firstWeekDay : DateUtil.addDate(firstWeekDay, i);
            _date.dateStr = DateUtil.dateFormat(_date.date, '%Y-%m-%d');
            _dates.push(_date);
        }
        return _dates;
    }

    if (typeof exports !== 'undefined' ){
        exports.MonthDate = MonthDate;
    }else if ( typeof define === "function" ) {
        define(function() {
                return MonthDate;
        });
    }else {
        window.MonthDate = MonthDate;
    }

    MonthDate.format = DateUtil.dateFormat;
    MonthDate.addDate = DateUtil.addDate;
    MonthDate.getWeekDays = DateUtil.getWeekDays;

    // for test
    // const month = new MonthDate();
    // console.log(month.getMonthDateByWeek());
    // console.log(DateUtil.getWeekDays());
    // console.log(MonthDate.getWeekDays(new Date()));
})();


