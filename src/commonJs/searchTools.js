/**
 * 创建唯一的字符串
 * @return {string} ojgdvbvaua40
 */
function createUniqueString() {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(randomNum + timestamp)).toString(32)
}

// elementui日期时间范围 快捷选项
const pickerOptionsRange = {
    shortcuts: [{
        text: '今天',
        onClick(picker) {
            const end = new Date()
            const start = new Date(new Date().toDateString())
            start.setTime(start.getTime())
            picker.$emit('pick', [start, end])
        }
    }, {
        text: '最近一周',
        onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
        }
    }, {
        text: '最近一个月',
        onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
        }
    }, {
        text: '最近三个月',
        onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
        }
    }]
}

// elementui月份范围 快捷选项
const pickerOptionsRangeMonth = {
    shortcuts: [{
            text: '今年至今',
            onClick(picker) {
                const end = new Date()
                const start = new Date(new Date().getFullYear(), 0)
                picker.$emit('pick', [start, end])
            }
        },
        {
            text: '最近半年',
            onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setMonth(start.getMonth() - 6)
                picker.$emit('pick', [start, end])
            }
        },
        {
            text: '最近一年',
            onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setMonth(start.getMonth() - 12)
                picker.$emit('pick', [start, end])
            }
        }
    ]
}

const pickerOptionsDay = {
    disabledDate(time) {
        return time.getTime() > Date.now();
    },
    shortcuts: [{
        text: '今天',
        onClick(picker) {
            picker.$emit('pick', new Date());
        }
    }, {
        text: '昨天',
        onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
        }
    }, {
        text: '一周前',
        onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
        }
    }]
}
export default {
    pickerOptionsRangeMonth,
    pickerOptionsRange,
    createUniqueString,
    pickerOptionsDay
}