function CheckForPlugIn_Async() {
  function VersionCompare_Async(StringVersion, ObjectVersion) {
    if (typeof (ObjectVersion) == "string")
      return -1;
    var arr = StringVersion.split('.');
    var isActualVersion = true;

    cadesplugin.async_spawn(function* () {
      if ((yield ObjectVersion.MajorVersion) == parseInt(arr[0])) {
        if ((yield ObjectVersion.MinorVersion) == parseInt(arr[1])) {
          if ((yield ObjectVersion.BuildVersion) == parseInt(arr[2])) {
            isActualVersion = true;
          } else if ((yield ObjectVersion.BuildVersion) < parseInt(arr[2])) {
            isActualVersion = false;
          }
        } else if ((yield ObjectVersion.MinorVersion) < parseInt(arr[1])) {
          isActualVersion = false;
        }
      } else if ((yield ObjectVersion.MajorVersion) < parseInt(arr[0])) {
        isActualVersion = false;
      }

      if (!isActualVersion) {
        document.getElementById('PluginEnabledImg').setAttribute("src", "Img/yellow_dot.png");
        document.getElementById('PlugInEnabledTxt').innerHTML = "Плагин загружен, но есть более свежая версия.";
      }
      document.getElementById('PlugInVersionTxt').innerHTML = "Версия плагина: " + (yield CurrentPluginVersion.toString());
      var oAbout = yield cadesplugin.CreateObjectAsync("CAdESCOM.About");
      var ver = yield oAbout.CSPVersion("", 80);
      var ret = (yield ver.MajorVersion) + "." + (yield ver.MinorVersion) + "." + (yield ver.BuildVersion);
      document.getElementById('CSPVersionTxt').innerHTML = "Версия криптопровайдера: " + ret;

      try {
        var sCSPName = yield oAbout.CSPName(80);
        document.getElementById('CspEnabledImg').setAttribute("src", "Img/green_dot.png");
        document.getElementById('CspEnabledTxt').innerHTML = "Криптопровайдер загружен";
        document.getElementById('CSPNameTxt').innerHTML = "Криптопровайдер: " + sCSPName;
      } catch (err) {
      }
      return;
    });
  }

  function GetLatestVersion_Async(CurrentPluginVersion) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "www.cryptopro.ru/sites/default/files/products/cades/latest_2_0.txt", true);
    xmlhttp.onreadystatechange = function () {
      var PluginBaseVersion;
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          PluginBaseVersion = xmlhttp.responseText;
          VersionCompare_Async(PluginBaseVersion, CurrentPluginVersion)
        }
      }
    }
    xmlhttp.send(null);
  }

  window.onload = function (e) {
    document.getElementById('PluginEnabledImg').setAttribute("src", "Img/green_dot.png");
    document.getElementById('PlugInEnabledTxt').innerHTML = "Плагин загружен";
    document.getElementById('CspEnabledImg').setAttribute("src", "Img/yellow_dot.png");
    document.getElementById('CspEnabledTxt').innerHTML = "КриптоПро CSP не загружен";
  }
  document.getElementById('PluginEnabledImg').setAttribute("src", "Img/green_dot.png");
  document.getElementById('PlugInEnabledTxt').innerHTML = "Плагин загружен";
  document.getElementById('CspEnabledImg').setAttribute("src", "Img/yellow_dot.png");
  document.getElementById('CspEnabledTxt').innerHTML = "КриптоПро CSP не загружен";

  var CurrentPluginVersion;
  cadesplugin.async_spawn(function* () {
    var oAbout = yield cadesplugin.CreateObjectAsync("CAdESCOM.About");
    CurrentPluginVersion = yield oAbout.PluginVersion;
    GetLatestVersion_Async(CurrentPluginVersion);

    // var txtDataToSign = "Hello World";
    // document.getElementById("DataToSignTxtBox").innerHTML = txtDataToSign;
    // document.getElementById("SignatureTxtBox").innerHTML = "";
  }); //cadesplugin.async_spawn
}

export const checkSettings = () => {
  CheckForPlugIn_Async();
}
