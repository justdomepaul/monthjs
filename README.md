# 简易月历类库

非常轻简的一个月历，只是单纯的输出某一个月的日期，提供按周输出等其它小功能。

## 使用说明

初始化对象

~~~javascript
var month = new MonthDate()
~~~

以某月其中一天初始化对象
~~~javascript
var month = new MonthDate(new Date('2017-01-01'));
or
var month = new MonthDate(new Date(1483228800000));
~~~

### 方法

**getMonthDate**
获取这个月的日历列表：
`['2017-01-01', '2017-01-02', '2017-01-03', ...]`

**getMonthDateByWeek**
获取这个月的日历列表，按周分组：
~~~javascript
[
    [ '2017-01-01', '2017-01-02', '2017-01-03', '2017-01-04', '2017-01-05', '2017-01-06', '2017-01-07' ],
    [ '2017-01-08', '2017-01-09', '2017-01-10', '2017-01-11', '2017-01-12', '2017-01-13', '2017-01-14' ],
    ...
]
//ps: 正好2017-01-01 是星期一
~~~

**getFirstDay**，**getLastDay**
获取这个月的第一天、最后一天

**nextMonth**，**preMonth**
返回这个月的上一个月/下一个月（MonthDate对象）

### 静态方法

**dateFormat**  
日期的格式化方法。

~~~javascript
MonthDate.dateFormat(new Date(), '%Y-%m-%d %H:%M:%S');
//2017-01-01 13:11:12
~~~

**addDate**  
获取相对某一天前后几天的那天。

~~~javascript
MonthDate.addDate(new Date(), 2);
~~~

**getWeekDays**  
获取某一天所在一周日期列表。

~~~javascript
MonthDate.getWeekDays(new Date());
~~~