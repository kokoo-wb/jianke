/**
 *   Author zhuhuishao
 *   Name chartExecute
 *   
 *   功能： 使用echarts插件绘制定制化图表类型
 *   描述： --------------------------------------------
 */
var chartExecute = function () {

    /**
     * [柱状图类型1]
     * @param [string] id [容器id]
     * @return [type] name [desc]
     */
    var lineChartOne = function (options) {
        var myChart = echarts.init(document.getElementById(options.id));

        var option = {
            tooltip: {},
            grid: {
                top: 10,
                bottom: 50,
                right: 0
            },
            xAxis: {
                boundaryGap: true,
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: '#333'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                data: options.xAxisData
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['#e8eced', '#e5e6e8']
                    }
                },
            },
            series: [
                {
                    name: options.title,
                    type: 'line',
                    smooth: true,
                    data: options.yAxisData,
                    symbolSize: 10,
                    symbol: 'circle',
                    label: {
                        normal: {
                            show: true,
                            color: '#333'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: options.color[0],  // 会设置点和线的颜色，所以需要下面定制 line
                            borderColor: options.color[1]  // 点边线的颜色
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: options.color[2]   // 线条颜色
                        }
                    },
                }
            ]
        };

        window.addEventListener("resize", function () {
            myChart.resize();
        });
        myChart.setOption(option);
    }

    /**
     * [柱状图类型1]
     * @param [string] id [容器id]
     * @return [type] name [desc]
     */
    var barChartOne = function (id) {
        var myChart = echarts.init(document.getElementById(id));

        var option = {
            tooltip: {},
            grid: {
                left: '4%',
                top: '10%',
                right: '4%',
                bottom: '25%',
            },
            xAxis: {
                data: ["墩台成块脱落", "基础冲刷", "框架式节点", "基础掏空", "支承稳定性", "墩台成块脱落", "基础冲刷", "框架式节点", "基础掏空", "支承稳定性", "墩台成块脱落", "基础冲刷", "框架式节点", "基础掏空", "支承稳定性", "基础掏空", "支承稳定性", "支承稳定性"],
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisLabel: {
                    width: 20,
                    interval: 0,
                    formatter: function (value) {
                        return value.split("").join("\n");
                    }
                }
            },
            yAxis: {
                show: false,
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '病害类型',
                type: 'bar',
                barWidth: '20',
                data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20],
                label: {
                    normal: {
                        show: true,
                        color: '#fff',
                        position: 'top'
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#feef54'
                    }
                }
            }]
        };

        window.addEventListener("resize", function () {
            myChart.resize();
        });
        myChart.setOption(option);
    }



    /**
     * [饼图类型1]
     * @param [string] id [容器id]
     * @return [type] name [desc]
     */
    var pieChartOne = function (id) {
        var myChart = echarts.init(document.getElementById(id));

        var option = {
            tooltip: {
                trigger: 'item',
                formatter: function (data) {
                    console.log(data);
                    return data.name + '<br/>' + data.value + ' (' + data.percent.toFixed(0) + '%)'
                }
            },
            color: ['#89c8d9', '#aad7e4', '#ddeff3', '#56b0c8'],
            series: [
                {
                    name: '病害状况',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: 335, name: '普通' },
                        { value: 310, name: '中度' },
                        { value: 234, name: '轻微' },
                        { value: 135, name: '危险' }
                    ],
                    labelLine: {
                        normal: {
                            length2: 5
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        window.addEventListener("resize", function () {
            myChart.resize();
        });

        myChart.setOption(option);
    }


    return {
        lineChartOne: function (id) {
            return lineChartOne(id);
        },
        barChartOne: function (id) {
            return barChartOne(id);
        },
        pieChartOne: function (id) {
            return pieChartOne(id);
        }
    }
}();