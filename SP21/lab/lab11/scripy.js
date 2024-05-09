var recId = window.recId;

window.indexPage = 1;
window.pageNum = 20;
$("#rytable .pageBar .first").css("cursor", "not-allowed");
$("#rytable .pageBar .prev").css("cursor", "not-allowed");

$("#rytable .pageBar .pagebtn").click(function () {
  debugger;
  if ($(this).hasClass("prev")) {
    if (indexPage > 1) {
      indexPage--;
      var curPage = $("#rytable .pageBar .curpage").val();
      $("#rytable .pageBar .curpage").val(parseInt(curPage) - 1);

      $("#rytable .pageBar .next").css("cursor", "pointer");
      $("#rytable .pageBar .last").css("cursor", "pointer");

      if (indexPage == 1) {
        $("#rytable .pageBar .first").css("cursor", "not-allowed");
        $("#rytable .pageBar .prev").css("cursor", "not-allowed");
      }

      changePage();
      return;
    }
  }
  if ($(this).hasClass("next")) {
    var total = parseInt($("#rytable .pageBar .total").text());
    if (indexPage < total) {
      indexPage++;
      var curPage = $("#rytable .pageBar .curpage").val();
      $("#rytable .pageBar .curpage").val(parseInt(curPage) + 1);

      $("#rytable .pageBar .first").css("cursor", "pointer");
      $("#rytable .pageBar .prev").css("cursor", "pointer");

      if (indexPage == total) {
        $("#rytable .pageBar .next").css("cursor", "not-allowed");
        $("#rytable .pageBar .last").css("cursor", "not-allowed");
      }

      changePage();
      return;
    }
  }
  if ($(this).hasClass("first")) {
    if (indexPage != 1) {
      indexPage = 1;
      $("#rytable .pageBar .curpage").val(1);

      $("#rytable .pageBar .first").css("cursor", "not-allowed");
      $("#rytable .pageBar .prev").css("cursor", "not-allowed");
      $("#rytable .pageBar .next").css("cursor", "pointer");
      $("#rytable .pageBar .last").css("cursor", "pointer");

      changePage();
      return;
    }
  }
  if ($(this).hasClass("last")) {
    var total = parseInt($("#rytable .pageBar .total").text());
    if (indexPage != total) {
      indexPage = total;
      $("#rytable .pageBar .curpage").val(total);

      $("#rytable .pageBar .first").css("cursor", "pointer");
      $("#rytable .pageBar .prev").css("cursor", "pointer");
      $("#rytable .pageBar .next").css("cursor", "not-allowed");
      $("#rytable .pageBar .last").css("cursor", "not-allowed");

      changePage();
      return;
    }
  }
});
$("#rytable .pageBar .curpage").blur(function () {
  var curPage = parseInt($(this).val());
  var total = parseInt($("#rytable .pageBar .total").text());
  if (curPage <= 1) {
    $(this).val(1);
    indexPage = 1;
    $("#rytable .pageBar .first").css("cursor", "not-allowed");
    $("#rytable .pageBar .prev").css("cursor", "not-allowed");
  } else if (curPage >= total) {
    $(this).val(total);
    indexPage = total;
    $("#rytable .pageBar .next").css("cursor", "not-allowed");
    $("#rytable .pageBar .last").css("cursor", "not-allowed");
  } else {
    $(this).val(curPage);
    indexPage = curPage;
  }
  changePage();
});
function changePage() {
  var qx = $("#e63").val();
  var xz = $("#e67").val();
  var cm = $("#e71").val();
  var jb = $("#e75").val();
  var xm = $("#e79").val();
  var currCantoncode;
  var level;
  if (qx == "") {
    currCantoncode = "";
  } else if (xz == "") {
    currCantoncode = qx;
  } else if (cm == "") {
    currCantoncode = xz;
  } else {
    currCantoncode = cm;
  }
  if (jb == "市级") {
    level = "'0'";
  } else if (jb == "区级") {
    level = "'1','2'";
  } else if (jb == "镇级") {
    level = "'3','4'";
  } else if (jb == "村级") {
    level = "'5','7','8'";
  } else {
    level = "";
  }
  changeDataParamPage(currCantoncode, level, xm, window.recId);
  changeDataParamPage1(currCantoncode, level, xm, window.recId);
}

function setTableData(ryData) {
  console.log(ryData + "人员data");
  var htmlHead = "";
  var htmlBody = "";
  htmlHead +=
    "<span>序号</span>" +
    "<span style='margin-left: -15px;'>姓名</span>" +
    "<span style='margin-left: -3px;'>级别</span>" +
    "<span>职务</span>" +
    "<span style='margin-left: -24px;'>电话</span>";
  for (var i = 0; i < ryData.length; i++) {
    debugger;
    if (ryData[i].jb == null) {
      ryData[i].jb = " ";
    }
    console.log(ryData[i].sfzx);
    if (ryData[i].sfzx == 1) {
      htmlBody +=
        "<li onclick='lacatePerson(this)'>" +
        "<span>" +
        ryData[i].xh +
        "</span>" +
        "<span style='display:none'>" +
        ryData[i].humanid +
        "</span>" +
        "<span>" +
        ryData[i].name +
        "</span>" +
        "<span>" +
        ryData[i].jb +
        "</span>" +
        "<span>" +
        ryData[i].lzzzw +
        "</span>" +
        "<span onclick='promAlter(this)'><img src='../getImage.htm?name=video1'style='width:25px;'><span style='opacity:0;' >" +
        ryData[i].lxfs +
        "</span></span>" +
        "</li>";
    } else {
      htmlBody +=
        "<li onclick='lacatePerson(this)'>" +
        "<span>" +
        ryData[i].xh +
        "</span>" +
        "<span style='display:none'>" +
        ryData[i].humanid +
        "</span>" +
        "<span>" +
        ryData[i].name +
        "</span>" +
        "<span>" +
        ryData[i].jb +
        "</span>" +
        "<span>" +
        ryData[i].lzzzw +
        "</span>" +
        "<span onclick='promAlter(this)'><img src='../getImage.htm?name=video0'style='width:25px;'><span style='opacity:0;' >" +
        ryData[i].lxfs +
        "</span></span>" +
        "</li>";
    }
  }
  $("#rytable ul").html("");
  $("#rytable div.title").html("");
  $("#rytable div.title").append(htmlHead);
  $("#rytable ul").append(htmlBody);
}
window.promAlter = function (obj) {
  let from =
    getTop().humanID || JSON.parse(localStorage.getItem("LOGIN_INFO")).last.uid; //登录人员ID
  var humanparam = $(obj).parent("li").children().eq(1).text();
  let to = runSQL(
    "SELECT humanid FROM SYS_HUMAN a where a.humanid = '" + humanparam + "';"
  )[0][0].HUMANID; //发送人员ID
  console.log(to, "remoteid");
  window.open("../videoChat.html?remoteHumanId=" + to);
};
window.promAlter_old = function (obj) {
  let from =
    getTop().humanID || JSON.parse(localStorage.getItem("LOGIN_INFO")).last.uid; //登录人员ID
  runSQL("select * from lz_url a where a.id = 4;")[0][0].P_URL;
  var humanparam = $(obj).parent("li").children().eq(1).text();
  let to = runSQL(
    "SELECT humanid FROM SYS_HUMAN a where a.humanid = '" + humanparam + "';"
  )[0][0].HUMANID; //发送人员ID
  alert(JSON.stringify(to));
  let baseURL = runSQL("select * from lz_url a where a.id = 4;")[0][0].P_URL;
  $.ajax({
    url: `${baseURL}/patrol/videoCall?to=${to}&from=${from}`,
    type: "post",
    dataType: "json",
    contentType: "application/x-www-form-urlencoded",
    success: function (res) {
      // 如果有人呼叫，进入
      requestPermission(
        JSON.parse(localStorage.getItem("LOGIN_INFO")).last.username,
        from + "" + to
      );
    },
    error: function (errorThrown, textStatus) {
      antMap.alert("发生错误:" + errorThrown + textStatus);
    },
  });

  //权限请求、并跳转
  function requestPermission(humanname, roomName) {
    let vidioUrl = runSQL("select * from lz_url a where a.id = 4;")[0][0]
      .P_VIDEO_URL;
    window.open(
      vidioUrl + "?humanname=" + humanname + "&roomName=" + roomName,
      "newwindow",
      "height=500px,width=500px,top=300px,left=800px,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no"
    );
  }
};
//初始化调用
window.changeTableData = function (currCanton, recId) {
  var tableTatolSql = "";
  var tableSql = "";
  console.log(currCanton);
  tableTotalSql =
    "select count(*) total from (select a.name,(case when length(a.qhdm)=6 then '区级' " +
    " when length(a.qhdm)=9 then '镇级'when length(a.qhdm)=12 then '村级' when length(a.qhdm)=15 then '网格' when length(a.qhdm)=3 then '市级' end) as jb," +
    " b.online,a.yzlylxdm,COALESCE(a.lzzzw,'') lzzzw,COALESCE(a.lxfs,'') lxfs,(case b.online when 1 then 1 else 0 end) sfzx,b.humanid  from lz_lzxx a,sys_human b,lz_zrqmx c " +
    "where a.humanid=b.humanid and b.cantoncode like '" +
    currCanton +
    "'||'%' and b.cantoncode like c.qhdm||'%' and c.recid=" +
    recId +
    " and a.name is not null )c  ;";

  tableSql =
    "select ROW_NUMBER() over (order by c.sfzx desc,c.yzlylxdm asc,c.online desc,c.name asc) as xh,* from (select a.name,(case when length(a.qhdm)=6 then '区级' " +
    " when length(a.qhdm)=9 then '镇级'when length(a.qhdm)=12 then '村级' when length(a.qhdm)=15 then '网格' when length(a.qhdm)=3 then '市级' end) as jb," +
    " b.online,a.yzlylxdm,COALESCE(a.lzzzw,'') lzzzw,COALESCE(a.lxfs,'') lxfs,(case b.online when 1 then 1 else 0 end) sfzx,b.humanid  from lz_lzxx a,sys_human b,lz_zrqmx c " +
    "where a.humanid=b.humanid and b.cantoncode like '" +
    currCanton +
    "'||'%' and b.cantoncode like c.qhdm||'%' and c.recid=" +
    recId +
    " and a.name is not null )c order by c.sfzx desc,c.yzlylxdm asc,c.online desc,c.name asc  " +
    " limit " +
    pageNum +
    " offset " +
    (indexPage - 1) * pageNum +
    " ;";

  var requestData = new QueryParam("current", 1, tableSql, "");

  xPage.getData(requestData, setTableData);

  //查询总数
  var totalRS = runSQL(tableTotalSql);
  if (totalRS && totalRS[0]) {
    var totals = Math.ceil(totalRS[0][0].TOTAL / window.pageNum);
    $("#rytable .pageBar .total").text(totals);
    if (totals == 1) {
      $("#rytable .pageBar .next").css("cursor", "not-allowed");
      $("#rytable .pageBar .last").css("cursor", "not-allowed");
    }
    $("#rytable .pageBar .msg").text("共" + totalRS[0][0].TOTAL + "条");
  }
};
//点击查询调用
window.changeDataParam = function (currCanton, level, name, recId) {
  debugger;
  var pName = "";
  var pLevel = "";
  if (name) {
    pName = " and a.name like '%" + name + "%' ";
  }
  if (level) {
    pLevel = " and a.yzlylxdm in (" + level + ")  ";
  }
  var tableTatolSql = "";
  var tableSql = "";

  console.log(currCanton);
  tableTotalSql =
    "select count(*) total from (select a.name,(case when length(a.qhdm)=6 then '区级' " +
    " when length(a.qhdm)=9 then '镇级'when length(a.qhdm)=12 then '村级' when length(a.qhdm)=15 then '网格'  when length(a.qhdm)=3 then '市级' end) as jb," +
    " b.online,a.yzlylxdm,COALESCE(a.lzzzw,'') lzzzw,COALESCE(a.lxfs,'') lxfs,(case b.online when 1 then 1 else 0 end) sfzx,b.humanid  from lz_lzxx a,sys_human b,lz_zrqmx c " +
    "where a.humanid=b.humanid and b.cantoncode like '" +
    currCanton +
    "'||'%'  and b.cantoncode like c.qhdm||'%' and c.recid=" +
    recId +
    " and a.name is not null " +
    pName +
    pLevel +
    "  )c  ;";

  tableSql =
    "select ROW_NUMBER() over (order by c.sfzx desc,c.yzlylxdm asc,c.online desc,c.name asc) as xh,* from (select a.name,(case when length(a.qhdm)=6 then '区级' " +
    " when length(a.qhdm)=9 then '镇级'when length(a.qhdm)=12 then '村级' when length(a.qhdm)=15 then '网格'  when length(a.qhdm)=3 then '市级' end) as jb," +
    " b.online,a.yzlylxdm,COALESCE(a.lzzzw,'') lzzzw,COALESCE(a.lxfs,'') lxfs,(case b.online when 1 then 1 else 0 end) sfzx,b.humanid  from lz_lzxx a,sys_human b,lz_zrqmx c " +
    "where a.humanid=b.humanid and b.cantoncode like '" +
    currCanton +
    "'||'%'  and b.cantoncode like c.qhdm||'%' and c.recid=" +
    recId +
    " and a.name is not null " +
    pName +
    pLevel +
    "  )c  order by c.sfzx desc,c.yzlylxdm asc,c.online desc,c.name asc " +
    " limit " +
    pageNum +
    " offset " +
    (indexPage - 1) * pageNum +
    " ;";

  var requestData = new QueryParam("current", 1, tableSql, "");
  xPage.getData(requestData, setTableData);

  //查询总数
  var totalRS = runSQL(tableTotalSql);
  if (totalRS && totalRS[0]) {
    var totals = Math.ceil(totalRS[0][0].TOTAL / window.pageNum);
    $("#rytable .pageBar .total").text(totals);
    if (totals == 1) {
      $("#rytable .pageBar .next").css("cursor", "not-allowed");
      $("#rytable .pageBar .last").css("cursor", "not-allowed");
    }

    $("#rytable .pageBar .msg").text("共" + totalRS[0][0].TOTAL + "条");
  }
};

//换页调用
window.changeDataParamPage = function (currCanton, level, name, recId) {
  debugger;
  var pName = "";
  var pLevel = "";
  if (name) {
    pName = " and a.name like '%" + name + "%' ";
  }
  if (level) {
    pLevel = " and a.yzlylxdm in (" + level + ")  ";
  }
  var tableSql = "";
  console.log(currCanton);
  tableSql =
    "select ROW_NUMBER() over (order by c.sfzx desc,c.yzlylxdm asc,c.online desc,c.name asc) as xh,* from (select a.name,(case when length(a.qhdm)=6 then '区级' " +
    " when length(a.qhdm)=9 then '镇级'when length(a.qhdm)=12 then '村级' when length(a.qhdm)=15 then '网格'  when length(a.qhdm)=3 then '市级' end) as jb," +
    " b.online,a.yzlylxdm,COALESCE(a.lzzzw,'') lzzzw,COALESCE(a.lxfs,'') lxfs,(case b.online when 1 then 1 else 0 end) sfzx,b.humanid  from lz_lzxx a,sys_human b,lz_zrqmx c " +
    "where a.humanid=b.humanid and b.cantoncode like '" +
    currCanton +
    "'||'%'  and b.cantoncode like c.qhdm||'%' and c.recid=" +
    recId +
    " and a.name is not null " +
    pName +
    pLevel +
    "  )c  order by c.sfzx desc,c.yzlylxdm asc,c.online desc,c.name asc " +
    " limit " +
    pageNum +
    " offset " +
    (indexPage - 1) * pageNum +
    " ;";
  var requestData = new QueryParam("current", 1, tableSql, "");
  xPage.getData(requestData, setTableData);
};

changeTableData(currCanton, window.recId);

//enter调用
$(".curpage").bind("keypress", function (currCanton, level, name, recId) {
  if (event.keyCode == "13") {
    debugger;
    console.log("你输入的内容为：" + $(".curpage").val());
    indexPage = $(".curpage").val();
    //    var ip = $('.curpage').val()；
    var pName = "";
    var pLevel = "";
    if (name) {
      pName = " and a.name like '%" + name + "%' ";
    }
    if (level) {
      pLevel = " and a.yzlylxdm in (" + level + ")  ";
    }
    var tableSql = "";
    changePage();
  }
});
/*人员列表定位**/
window.lacatePerson = function (obj) {
  var currHuamanId = $(obj).find("span:eq(1)").text();
  console.log(currHuamanId);
  var onlineSql = `select online from sys_human where humanid='${currHuamanId}';`;
  var result = runSQL(onlineSql)[0][0].ONLINE;
  if (result == 1) {
    $("#page62 iframe")[0].contentWindow.locateByPersonId(currHuamanId);
  } else {
    $.messager.alert("温馨提示：", "当前人员未在巡护哦!");
  }
};
