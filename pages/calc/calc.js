// pages/calc/calc.js
var calculate = function (data1, oper, data2) {
  var data;
  data1 = parseFloat(data1);
  data2 = parseFloat(data2);
  switch (oper) {
    case "+":
      data = data1 + data2;
      break;
    case "-":
      data = data1 - data2;
      break;
    case "*":
      data = data1 * data2;
      break;
    case "/":
      if (data2 !== 0) {
        data = data1 / data2;
      } else {
        data = 0;
      }
      break;
    default:
      break;
  }
  return data;
}
var saveExprs = function(expr) {
  var exprs = wx.getStorageSync("exprs") || [];
  exprs.unshift(expr);
  wx.setStorageSync("exprs", exprs);
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    result: "0",
    temp: 0,
    lastOper: "+",
    flag: true,
    id1: 'history',
    id2: 'clear',
    id3: 'back',
    id4: 'divide',
    id5: 'num_7',
    id6: 'num_8',
    id7: 'num_9',
    id8: 'multiply',
    id9: 'num_4',
    id10: 'num_5',
    id11: 'num_6',
    id12: 'sub',
    id13: 'num_1',
    id14: 'num_2',
    id15: 'num_3',
    id16: 'add',
    id17: 'negative',
    id18: 'num_0',
    id19: 'dot',
    id20: 'equ',
    record: true,
    expr: ""
  },

  RecordHistory:function(e) {
    console.log(e);
    var that = this;
    that.setData({
      record: e.detail.value
    })
  },
  
  clickButton:function(e) { //单击事件处理函数
    var that = this;
    var data = that.data.result; //获取上一个结果值
    var tmp = that.data.temp; //取上次的临时结果
    var lastOper1 = that.data.lastOper; //上一次的运算符
    var noNumFlag= that.data.flag;  //上一次非数字按钮标志
    
    var expr1 = that.data.expr; //获取前面的表达式

    if (e.target.id >= 'num_0' && e.target.id <= 'num_9') {
      data += e.target.id.split("_")[1];
      if (that.data.result == "0" || noNumFlag) {
        data = e.target.id.split("_")[1];
      }
      noNumFlag = false;
    } else {  //不是数字按钮
      noNumFlag = true;
      console.log(e.target.id);
      if(e.target.id == "dot") {
        if(data.toString().indexOf(".") == -1) {  //输入的值中不包含小数点
          data += ".";
        }
      } else if(e.target.id == "clear") { //清除按钮
        expr1 = expr1.substr(0,expr1.length-1) + "=" +tmp; //删除最后的运算符
        // if(that.data.record) {
        //   wx.setStorageSync('expr', expr1);
        // }
        saveExprs(expr1);
        expr1 = "";
        data = 0;
        tmp = 0;
        lastOper1 = "+";
      } else if(e.target.id == "negative") {
        data = -1 * data;
      } else if(e.target.id == "back") {
        if(data.toString().length > 1) {
          data = data.substr(0, data.toString().length-1);
        } else {
          data = 0;
        }
      } else if (e.target.id == "divide") {
        expr1 += data.toString() + "/";
        data= calculate(tmp, lastOper1, data);
        tmp = data;
        lastOper1 = "/";
      } else if (e.target.id == "multiply") {
        expr1 += data.toString() + "*";
        data = calculate(tmp, lastOper1, data);
        tmp = data;
        lastOper1 = "*";
      } else if (e.target.id == "add") {
        expr1 += data.toString() + "+";
        data = calculate(tmp, lastOper1, data);
        tmp = data;
        lastOper1 = "+";
      } else if (e.target.id == "sub") {
        expr1 += data.toString() + "-";
        data = calculate(tmp, lastOper1, data);
        tmp = data;
        lastOper1 = "-";
      } else if (e.target.id == "equ") {
        expr1 += data.toString();
        data = calculate(tmp, lastOper1, data);
        expr1 += "=" + data;
        // if(that.data.record) {
        //   wx.setStorageSync("expr", expr1)
        // }
        saveExprs(expr1);
        expr1 = "";
        tmp = 0;
        lastOper1 = "+";
      } else if (e.target.id == "history") {
        wx.navigateTo({
          url: '../history/history',
        })
      }
    }
    that.setData({
      result: data,
      lastOper: lastOper1,
      temp: tmp,
      flag: noNumFlag,
      expr: expr1
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})