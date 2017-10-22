import System;
import System.Windows.Forms;
import System.Security.Cryptography;
import System.Text;
import System.Text.RegularExpressions;
import Fiddler;

// 2017/5/5 2:42
// 被占用的话会临时失效~ 
// push to git
// 2017/7/27 11:51
// INTRODUCTION
// 2017/7/26 11:15
// 修改新的脚本
// This is the FiddlerScript Rules file, which creates some of the menu commands and
// other features of Fiddler. You can edit this file to modify or add new commands.
//
// The original version of this file is named SampleRules.js and it is in the
// \Program Files\Fiddler\ folder. When Fiddler first runs, it creates a copy named
// CustomRules.js inside your \Documents\Fiddler2\Scripts folder. If you make a 
// mistake in editing this file, simply delete the CustomRules.js file and restart
// Fiddler. A fresh copy of the default rules will be created from the original
// sample rules file.

// The best way to edit this file is to install the FiddlerScript Editor, part of
// the free SyntaxEditing addons. Get it here: http://fiddler2.com/r/?SYNTAXVIEWINSTALL

// GLOBALIZATION NOTE: Save this file using UTF-8 Encoding.

// JScript.NET Reference
// http://fiddler2.com/r/?msdnjsnet
//
// FiddlerScript Reference
// http://fiddler2.com/r/?fiddlerscriptcookbook

class Handlers
{
    public static var key//密钥
    public static var IV = Convert.FromBase64String("LDhfRDR1aGtQOiVuWmJJTw==");//IV
    //public static var defence = '3999';//防御力
    public static var birdp=0;
    public static var modEnable="yes";

    // *****************
    //
    // This is the Handlers class. Pretty much everything you ever add to FiddlerScript
    // belongs right inside here, or inside one of the already-existing functions below.
    //
    // *****************

    // The following snippet demonstrates a custom-bound column for the Web Sessions list.
    // See http://fiddler2.com/r/?fiddlercolumns for more info
    /*
    public static BindUIColumn("Method", 60)
    function FillMethodColumn(oS: Session): String {
    return oS.RequestMethod;
    }
    */

    // The following snippet demonstrates how to create a custom tab that shows simple text
    /*
    public BindUITab("Flags")
    static function FlagsReport(arrSess: Session[]):String {
    var oSB: System.Text.StringBuilder = new System.Text.StringBuilder();
    for (var i:int = 0; i<arrSess.Length; i++)
    {
    oSB.AppendLine("SESSION FLAGS");
    oSB.AppendFormat("{0}: {1}\n", arrSess[i].id, arrSess[i].fullUrl);
    for(var sFlag in arrSess[i].oFlags)
    {
    oSB.AppendFormat("\t{0}:\t\t{1}\n", sFlag.Key, sFlag.Value);
    }
    }
    return oSB.ToString();
    }
    */

    // You can create a custom menu like so:
    /*
    QuickLinkMenu("&Links") 
    QuickLinkItem("IE GeoLoc TestDrive", "http://ie.microsoft.com/testdrive/HTML5/Geolocation/Default.html")
    QuickLinkItem("FiddlerCore", "http://fiddler2.com/fiddlercore")
    public static function DoLinksMenu(sText: String, sAction: String)
    {
    Utilities.LaunchHyperlink(sAction);
    }
    */

    public static RulesOption("Hide 304s")
    BindPref("fiddlerscript.rules.Hide304s")
    var m_Hide304s: boolean = false;

    // Cause Fiddler to override the Accept-Language header with one of the defined values
    public static RulesOption("Request &Japanese Content")
    var m_Japanese: boolean = false;

    // Automatic Authentication
    public static RulesOption("&Automatically Authenticate")
    BindPref("fiddlerscript.rules.AutoAuth")
    var m_AutoAuth: boolean = false;

    // Cause Fiddler to override the User-Agent header with one of the defined values
    // The page http://browserscope2.org/browse?category=selectors&ua=Mobile%20Safari is a good place to find updated versions of these
    RulesString("&User-Agents", true) 
    BindPref("fiddlerscript.ephemeral.UserAgentString")
    RulesStringValue(0,"Netscape &3", "Mozilla/3.0 (Win95; I)")
    RulesStringValue(1,"WinPhone8.1", "Mozilla/5.0 (Mobile; Windows Phone 8.1; Android 4.0; ARM; Trident/7.0; Touch; rv:11.0; IEMobile/11.0; NOKIA; Lumia 520) like iPhone OS 7_0_3 Mac OS X AppleWebKit/537 (KHTML, like Gecko) Mobile Safari/537")
    RulesStringValue(2,"&Safari5 (Win7)", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1")
    RulesStringValue(3,"Safari9 (Mac)", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11) AppleWebKit/601.1.56 (KHTML, like Gecko) Version/9.0 Safari/601.1.56")
    RulesStringValue(4,"iPad", "Mozilla/5.0 (iPad; CPU OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F5027d Safari/600.1.4")
    RulesStringValue(5,"iPhone6", "Mozilla/5.0 (iPhone; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12F70 Safari/600.1.4")
    RulesStringValue(6,"IE &6 (XPSP2)", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)")
    RulesStringValue(7,"IE &7 (Vista)", "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; SLCC1)")
    RulesStringValue(8,"IE 8 (Win2k3 x64)", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; WOW64; Trident/4.0)")
    RulesStringValue(9,"IE &8 (Win7)", "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)")
    RulesStringValue(10,"IE 9 (Win7)", "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)")
    RulesStringValue(11,"IE 10 (Win8)", "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0)")
    RulesStringValue(12,"IE 11 (Surface2)", "Mozilla/5.0 (Windows NT 6.3; ARM; Trident/7.0; Touch; rv:11.0) like Gecko")
    RulesStringValue(13,"IE 11 (Win8.1)", "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko")
    RulesStringValue(14,"Edge (Win10)", "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.11082")
    RulesStringValue(15,"&Opera", "Opera/9.80 (Windows NT 6.2; WOW64) Presto/2.12.388 Version/12.17")
    RulesStringValue(16,"&Firefox 3.6", "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.7) Gecko/20100625 Firefox/3.6.7")
    RulesStringValue(17,"&Firefox 43", "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0")
    RulesStringValue(18,"&Firefox Phone", "Mozilla/5.0 (Mobile; rv:18.0) Gecko/18.0 Firefox/18.0")
    RulesStringValue(19,"&Firefox (Mac)", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0")
    RulesStringValue(20,"Chrome (Win)", "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.48 Safari/537.36")
    RulesStringValue(21,"Chrome (Android)", "Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.78 Mobile Safari/537.36")
    RulesStringValue(22,"ChromeBook", "Mozilla/5.0 (X11; CrOS x86_64 6680.52.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.74 Safari/537.36")
    RulesStringValue(23,"GoogleBot Crawler", "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)")
    RulesStringValue(24,"Kindle Fire (Silk)", "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us; Silk/1.0.22.79_10013310) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16 Silk-Accelerated=true")
    RulesStringValue(25,"&Custom...", "%CUSTOM%")
    public static var sUA: String = null;

    // Cause Fiddler to delay HTTP traffic to simulate typical 56k modem conditions
    public static RulesOption("Simulate &Modem Speeds", "Per&formance")
    var m_SimulateModem: boolean = false;

    // Removes HTTP-caching related headers and specifies "no-cache" on requests and responses
    public static RulesOption("&Disable Caching", "Per&formance")
    var m_DisableCaching: boolean = false;

    public static RulesOption("Cache Always &Fresh", "Per&formance")
    var m_AlwaysFresh: boolean = false;
        
    // Force a manual reload of the script file.  Resets all
    // RulesOption variables to their defaults.
    public static ToolsAction("Reset Script")
    function DoManualReload() { 
        FiddlerObject.ReloadScript();
    }

    public static ContextAction("Decode Selected Sessions")
    function DoRemoveEncoding(oSessions: Session[]) {
        for (var x:int = 0; x < oSessions.Length; x++){
            oSessions[x].utilDecodeRequest();
            oSessions[x].utilDecodeResponse();
        }
        UI.actUpdateInspector(true,true);
    }

    static function OnBeforeRequest(oSession: Session) {
        // Sample Rule: Color ASPX requests in RED
        // if (oSession.uriContains(".aspx")) {	oSession["ui-color"] = "red";	}

        // Sample Rule: Flag POSTs to fiddler2.com in italics
        // if (oSession.HostnameIs("www.fiddler2.com") && oSession.HTTPMethodIs("POST")) {	oSession["ui-italic"] = "yup";	}

        // Sample Rule: Break requests for URLs containing "/sandbox/"
        // if (oSession.uriContains("/sandbox/")) {
        //     oSession.oFlags["x-breakrequest"] = "yup";	// Existence of the x-breakrequest flag creates a breakpoint; the "yup" value is unimportant.
        // }
        
        //MessageBox.Show(oSession["X-ClientIP"]);
        //Trick of ip block
        if (oSession["X-ClientIP"] == "::ffff:192.168.1.189"){
            //MessageBox.Show("Trill ~");
            //oSession.oRequest.FailSession(403,"NULL","NULL");
            }
        
        if ((null != gs_ReplaceToken) && (oSession.url.indexOf(gs_ReplaceToken)>-1)) {   // Case sensitive
            oSession.url = oSession.url.Replace(gs_ReplaceToken, gs_ReplaceTokenWith); 
        }
        if ((null != gs_OverridenHost) && (oSession.host.toLowerCase() == gs_OverridenHost)) {
            oSession["x-overridehost"] = gs_OverrideHostWith; 
        }

        if ((null!=bpRequestURI) && oSession.uriContains(bpRequestURI)) {
            oSession["x-breakrequest"]="uri";
        }

        if ((null!=bpMethod) && (oSession.HTTPMethodIs(bpMethod))) {
            oSession["x-breakrequest"]="method";
        }

        if ((null!=uiBoldURI) && oSession.uriContains(uiBoldURI)) {
            oSession["ui-bold"]="QuickExec";
        }

        if (m_SimulateModem) {
            // Delay sends by 300ms per KB uploaded.
            oSession["request-trickle-delay"] = "300"; 
            // Delay receives by 150ms per KB downloaded.
            oSession["response-trickle-delay"] = "150"; 
        }

        if (m_DisableCaching) {
            oSession.oRequest.headers.Remove("If-None-Match");
            oSession.oRequest.headers.Remove("If-Modified-Since");
            oSession.oRequest["Pragma"] = "no-cache";
        }

        // User-Agent Overrides
        if (null != sUA) {
            oSession.oRequest["User-Agent"] = sUA; 
        }

        if (m_Japanese) {
            oSession.oRequest["Accept-Language"] = "ja";
        }

        if (m_AutoAuth) {
            // Automatically respond to any authentication challenges using the 
            // current Fiddler user's credentials. You can change (default)
            // to a domain\\username:password string if preferred.
            //
            // WARNING: This setting poses a security risk if remote 
            // connections are permitted!
            oSession["X-AutoAuth"] = "(default)";
        }

        if (m_AlwaysFresh && (oSession.oRequest.headers.Exists("If-Modified-Since") || oSession.oRequest.headers.Exists("If-None-Match")))
        {
            oSession.utilCreateResponseAndBypassServer();
            oSession.responseCode = 304;
            oSession["ui-backcolor"] = "Lavender";
        }
		
/*
/
/
/
/
/ 修改 commit部分
/
/
/
        */
        if(oSession.fullUrl.IndexOf("commit") != -1 && oSession.fullUrl.IndexOf("pvp") == -1 && modEnable=="yes") {
            getkey();
            
            var bytes = oSession.requestBodyBytes;
            var paddinglen = 32 - (bytes.Length % 32);
            var buffer = new Byte[bytes.Length + paddinglen];
            bytes.CopyTo(buffer, 0);
            var rDel = new RijndaelManaged();
            rDel.Key = key;
            rDel.Mode = CipherMode.CFB;
            rDel.Padding = PaddingMode.Zeros;
            rDel.IV = IV;
            var cTransform = rDel.CreateDecryptor();
            var resultArray = cTransform.TransformFinalBlock(buffer, 0, buffer.Length);
            var buffer2 = new Byte[bytes.Length];
            System.Array.Copy(resultArray, buffer2, bytes.Length);
            var str = Encoding.UTF8.GetString(buffer2);
            //MessageBox.Show(str);
            
            
            
            var regex = new Regex("\"damaged\":(.+?),");
            str = regex.Replace(str, "\"damaged\":0,");
            regex = new Regex("\"max_damaged\":(.+?),");
            str = regex.Replace(str, "\"max_damaged\":0,");
            regex = new Regex("\"max_damaged_combo\":(.+?),");
            str = regex.Replace(str, "\"max_damaged_combo\":0,");
            regex = new Regex("\"max_damaged_dflag\":(.+?),");
            str = regex.Replace(str, "\"max_damaged_dflag\":0,");
            regex = new Regex("\"max_damaged_enemy_id\":(.+?),");
            str = regex.Replace(str, "\"max_damaged_enemy_id\":0,");
            regex = new Regex("\"max_damaged_enemy_level\":(.+?),");
            str = regex.Replace(str, "\"max_damaged_enemy_level\":0,");
            regex = new Regex("\"max_damaged_hit\":(.+?),");
            str = regex.Replace(str, "\"max_damaged_hit\":0,");
            regex = new Regex("\"max_damaged_id\":(.+?),");
            str = regex.Replace(str, "\"max_damaged_id\":0,");
            regex = new Regex("\"max_damaged_type\":(.+?),");
            str = regex.Replace(str, "\"max_damaged_type\":0,");
            regex = new Regex("\"max_damaged_wave\":(.+?),");
            str = regex.Replace(str, "\"max_damaged_wave\":0,");
            regex = new Regex("\"last_attack_type\":(.+?),");
            str = regex.Replace(str, "\"last_attack_type\":3,")
            //MessageBox.Show(str);
            var toEncryptArray = Encoding.UTF8.GetBytes(str);
            cTransform = rDel.CreateEncryptor();
            resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
            buffer2 = new Byte[toEncryptArray.Length];
            System.Array.Copy(resultArray, buffer2, toEncryptArray.Length);
            oSession.RequestBody = buffer2;
        }
        
        ///birdfly/commit 愤怒小鸟 hack
        if(oSession.fullUrl.IndexOf("birdfly/commit") != -1) {
            var bytes = oSession.requestBodyBytes;
            var paddinglen = 32 - (bytes.Length % 32);
            var buffer = new Byte[bytes.Length + paddinglen];
            bytes.CopyTo(buffer, 0);
            var rDel = new RijndaelManaged();
            rDel.Key = key;
            rDel.Mode = CipherMode.CFB;
            rDel.Padding = PaddingMode.Zeros;
            rDel.IV = IV;
            var cTransform = rDel.CreateDecryptor();
            var resultArray = cTransform.TransformFinalBlock(buffer, 0, buffer.Length);
            var buffer2 = new Byte[bytes.Length];
            System.Array.Copy(resultArray, buffer2, bytes.Length);
            var str = Encoding.UTF8.GetString(buffer2);
            
            var torep=""
            switch(birdp){
                case 9:
                    torep="\"target_serial_list\":[1,2,3,4,5,6,7,8,9]";
                    break;
                case 10:
                    torep="\"target_serial_list\":[1,2,3,4,5,6,7,8,9,10]"
                    break;
                default:
                    MessageBox.Show("Nothing","获得");
                    torep="\"target_serial_list\":[1,2,3,4,5,6,7,8,9]";
                    break;
            }
            //replace value
            regex = new Regex("\"target_serial_list\":(.+?)]");
            str = regex.Replace(str, torep);
            
            var toEncryptArray = Encoding.UTF8.GetBytes(str);
            cTransform = rDel.CreateEncryptor();
            resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
            buffer2 = new Byte[toEncryptArray.Length];
            System.Array.Copy(resultArray, buffer2, toEncryptArray.Length);
            oSession.RequestBody = buffer2;
        }
        
                
        ///shop hack
        if(oSession.fullUrl.IndexOf("shop/execute") != -1) {
            getkey();
            
            var bytes = oSession.requestBodyBytes;
            var paddinglen = 32 - (bytes.Length % 32);
            var buffer = new Byte[bytes.Length + paddinglen];
            bytes.CopyTo(buffer, 0);
            var rDel = new RijndaelManaged();
            rDel.Key = key;
            rDel.Mode = CipherMode.CFB;
            rDel.Padding = PaddingMode.Zeros;
            rDel.IV = IV;
            var cTransform = rDel.CreateDecryptor();
            var resultArray = cTransform.TransformFinalBlock(buffer, 0, buffer.Length);
            var buffer2 = new Byte[bytes.Length];
            System.Array.Copy(resultArray, buffer2, bytes.Length);
            var str = Encoding.UTF8.GetString(buffer2);
                        
            //MessageBox.Show(str.substr(str.length-10));
            
            //replace 商品数量,num * 10 的数量
            regex = new Regex("\"num\":(.+?),");
            str = regex.Replace(str, "\"num\":20,");
            
            var toEncryptArray = Encoding.UTF8.GetBytes(str);
            cTransform = rDel.CreateEncryptor();
            resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
            buffer2 = new Byte[toEncryptArray.Length];
            System.Array.Copy(resultArray, buffer2, toEncryptArray.Length);
            oSession.RequestBody = buffer2;
        }///end shop hack
                
        ///pvp result hack
        if(oSession.fullUrl.IndexOf("pvp/battle/commit") != -1) {
        getkey();
        
        var bytes = oSession.requestBodyBytes;
        var paddinglen = 32 - (bytes.Length % 32);
        var buffer = new Byte[bytes.Length + paddinglen];
        bytes.CopyTo(buffer, 0);
        var rDel = new RijndaelManaged();
        rDel.Key = key;
        rDel.Mode = CipherMode.CFB;
        rDel.Padding = PaddingMode.Zeros;
        rDel.IV = IV;
        var cTransform = rDel.CreateDecryptor();
        var resultArray = cTransform.TransformFinalBlock(buffer, 0, buffer.Length);
        var buffer2 = new Byte[bytes.Length];
        System.Array.Copy(resultArray, buffer2, bytes.Length);
        var str = Encoding.UTF8.GetString(buffer2);
        //MessageBox.Show(str.substr(str.length-1000));
        
        //弱化 commit
        /*regex = new Regex("\"d_character_serial\":26,");
        str = regex.Replace(str, "\"d_character_serial\":60,");                
        regex = new Regex("\"d_character_serial\":26,");
        str = regex.Replace(str, "\"d_character_serial\":78,");                           */
                        
        //2 是失败 1是赢,0是平局 
        regex = new Regex("\"pvp_battle_status\":(.+?),");
        str = regex.Replace(str, "\"pvp_battle_status\":1,");
        //regex = new Regex("\"total_dead\":(.+?),");
        //str = regex.Replace(str, "\"total_dead\":8,");
        //hp_rate
        //regex = new Regex("\"hp_rate\":(.+?),");
        //str = regex.Replace(str, "\"hp_rate\":0,");                 
                        
                        
        var toEncryptArray = Encoding.UTF8.GetBytes(str);
        cTransform = rDel.CreateEncryptor();
        resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
        buffer2 = new Byte[toEncryptArray.Length];
        System.Array.Copy(resultArray, buffer2, toEncryptArray.Length);
        oSession.RequestBody = buffer2;
        }///end pvp result hack   
                
        ///raid result hack
        if(oSession.fullUrl.IndexOf("raid/battle/commit") != -1) {
        getkey();
        
        var bytes = oSession.requestBodyBytes;
        var paddinglen = 32 - (bytes.Length % 32);
        var buffer = new Byte[bytes.Length + paddinglen];
        bytes.CopyTo(buffer, 0);
        var rDel = new RijndaelManaged();
        rDel.Key = key;
        rDel.Mode = CipherMode.CFB;
        rDel.Padding = PaddingMode.Zeros;
        rDel.IV = IV;
        var cTransform = rDel.CreateDecryptor();
        var resultArray = cTransform.TransformFinalBlock(buffer, 0, buffer.Length);
        var buffer2 = new Byte[bytes.Length];
        System.Array.Copy(resultArray, buffer2, bytes.Length);
        var str = Encoding.UTF8.GetString(buffer2);
        //MessageBox.Show(str.substr(str.length-1000));
        
        //弱化 commit
        /*regex = new Regex("\"d_character_serial\":26,");
        str = regex.Replace(str, "\"d_character_serial\":60,");                
        regex = new Regex("\"d_character_serial\":26,");
        str = regex.Replace(str, "\"d_character_serial\":78,");                           */
                        
        //4 是继续 6 是击破
        regex = new Regex("\"result_type\":(.+?)");
        str = regex.Replace(str, "\"result_type\":6");
        //regex = new Regex("\"total_dead\":(.+?),");
        //str = regex.Replace(str, "\"total_dead\":8,");
        //hp_rate
        //regex = new Regex("\"hp_rate\":(.+?),");
        //str = regex.Replace(str, "\"hp_rate\":0,");                 
                        
                        
        var toEncryptArray = Encoding.UTF8.GetBytes(str);
        cTransform = rDel.CreateEncryptor();
        resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
        buffer2 = new Byte[toEncryptArray.Length];
        System.Array.Copy(resultArray, buffer2, toEncryptArray.Length);
        oSession.RequestBody = buffer2;
        }///end raid result hack    
    }//

    // This function is called immediately after a set of request headers has
    // been read from the client. This is typically too early to do much useful
    // work, since the body hasn't yet been read, but sometimes it may be useful.
    //
    // For instance, see 
    // http://blogs.msdn.com/b/fiddler/archive/2011/11/05/http-expect-continue-delays-transmitting-post-bodies-by-up-to-350-milliseconds.aspx
    // for one useful thing you can do with this handler.
    //
    // Note: oSession.requestBodyBytes is not available within this function!
    /*
    static function OnPeekAtRequestHeaders(oSession: Session) {
    var sProc = ("" + oSession["x-ProcessInfo"]).ToLower();
    if (!sProc.StartsWith("mylowercaseappname")) oSession["ui-hide"] = "NotMyApp";
    }
    */

    //
    // If a given session has response streaming enabled, then the OnBeforeResponse function 
    // is actually called AFTER the response was returned to the client.
    //
    // In contrast, this OnPeekAtResponseHeaders function is called before the response headers are 
    // sent to the client (and before the body is read from the server).  Hence this is an opportune time 
    // to disable streaming (oSession.bBufferResponse = true) if there is something in the response headers 
    // which suggests that tampering with the response body is necessary.
    // 
    // Note: oSession.responseBodyBytes is not available within this function!
    //
    static function OnPeekAtResponseHeaders(oSession: Session) {
        //FiddlerApplication.Log.LogFormat("Session {0}: Response header peek shows status is {1}", oSession.id, oSession.responseCode);
        if (m_DisableCaching) {
            oSession.oResponse.headers.Remove("Expires");
            oSession.oResponse["Cache-Control"] = "no-cache";
        }

        if ((bpStatus>0) && (oSession.responseCode == bpStatus)) {
            oSession["x-breakresponse"]="status";
            oSession.bBufferResponse = true;
        }
        
        if ((null!=bpResponseURI) && oSession.uriContains(bpResponseURI)) {
            oSession["x-breakresponse"]="uri";
            oSession.bBufferResponse = true;
        }

    }
        
    //获取Key function 化
    public static function getkey(){
        var fso;           
        fso = new ActiveXObject("Scripting.FileSystemObject");
        //读取 key
        if(fso.FileExists("D:\\tempkey.txt")){
            var readf=fso.OpenTextFile("D:\\tempkey.txt", 1);
            key=Encoding.UTF8.GetBytes(readf.ReadLine());
        }
    }
    

    static function OnBeforeResponse(oSession: Session) {
        if (m_Hide304s && oSession.responseCode == 304) {
            oSession["ui-hide"] = "true";
        }
        
		/*
            获取本地key 的部分
        */
        
        if(oSession.fullUrl=="https://psg.sqex-bridge.jp/native/session") {
            var str = oSession.GetResponseBodyAsString();
            var obj = eval('(' + str + ')');
            key = Encoding.UTF8.GetBytes(obj['sharedSecurityKey']);
        
            
            /*
            /将 key 写入文件 
            /
            /
            */
            var fso, tf;
            fso = new ActiveXObject("Scripting.FileSystemObject");
            // 创建新文件
            tf = fso.CreateTextFile("D:\\tempkey.txt", true);
            // 填写数据，并增加换行符
            tf.Write(obj['sharedSecurityKey']) ;
            // 关闭文件
            tf.Close();
            
            
            /*
            /
            /对文件修改进行配置
            /
            */
            if(fso.FileExists("D:\\grimmsconfig.txt")){
                var readf=fso.OpenTextFile("D:\\grimmsconfig.txt", 1);
                modEnable=readf.ReadLine();
                if(modEnable == "no"){
                    MessageBox.Show("修改已禁用");
                }
            }
        
        }
        /*修正一个 bug*/
        
        if(oSession.fullUrl.IndexOf("api/towereventquest/get") != -1){

            getkey();
            
            var bytes = oSession.responseBodyBytes;
            var paddinglen = 32 - (bytes.Length % 32);
            var buffer = new Byte[bytes.Length + paddinglen];
            bytes.CopyTo(buffer, 0);
            var rDel = new RijndaelManaged();
            rDel.Key = key;
            rDel.Mode = CipherMode.CFB;
            rDel.Padding = PaddingMode.Zeros;
            rDel.IV = IV;
            var cTransform = rDel.CreateDecryptor();
            var resultArray = cTransform.TransformFinalBlock(buffer, 0, buffer.Length);
            var buffer2 = new Byte[bytes.Length];
            System.Array.Copy(resultArray, buffer2, bytes.Length);
            var str = Encoding.UTF8.GetString(buffer2);
            
            //一步登天
            //var regex = new Regex("\"quest_status\":(.+?),");
            //str=regex.Replace(str, "\"quest_status\":5,");
            
            //独步青云，一叶过江
            //var regex = new Regex("\"m_tower_event_quest_serial\":62,\"battle_type\":2,\"quest_status\":5,");
            //str=regex.Replace(str, "\"m_tower_event_quest_serial\":62,\"battle_type\":2,\"quest_status\":3,");
           
            var toEncryptArray = Encoding.UTF8.GetBytes(str);
            cTransform = rDel.CreateEncryptor();
            resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
            buffer2 = new Byte[toEncryptArray.Length];
            System.Array.Copy(resultArray, buffer2, toEncryptArray.Length);
            oSession.ResponseBody = buffer2;
        }     
        
/*
        
获得 commit 的 response 的信息
作为信息提示
commit 不含礼物信息,虽然 无用 ,剔除
*/
        if(oSession.fullUrl.IndexOf("commit") != -1 && oSession.fullUrl.IndexOf("pvp") == -1 && modEnable=="yes") {
            getkey();
            
            var bytes = oSession.responseBodyBytes;
            var paddinglen = 32 - (bytes.Length % 32);
            var buffer = new Byte[bytes.Length + paddinglen];
            bytes.CopyTo(buffer, 0);
            var rDel = new RijndaelManaged();
            rDel.Key = key;
            rDel.Mode = CipherMode.CFB;
            rDel.Padding = PaddingMode.Zeros;
            rDel.IV = IV;
            var cTransform = rDel.CreateDecryptor();
            var resultArray = cTransform.TransformFinalBlock(buffer, 0, buffer.Length);
            var buffer2 = new Byte[bytes.Length];
            System.Array.Copy(resultArray, buffer2, bytes.Length);
            var str = Encoding.UTF8.GetString(buffer2);
            
            
            var regex = new Regex("\"next_level_exp\":(.+?),");
            var m=regex.Matches(str);

            var s="";
            
            //fiddler 不支持 foreach 吗?
            
            for(var i=0;i<m.Count;i++){
                s=s+"/"+m[i];
            }
            
            //升级经验 确认
            //MessageBox.Show(s);
            
            
            //mark
            //MessageBox.Show(m)
            
            /*
            /将 commit 回应 写入文件 
            /
            /
            */
            
            //需要延迟,否则会出错
            /*
            var fso, tf;
            fso = new ActiveXObject("Scripting.FileSystemObject");
            // 创建新文件
            tf = fso.CreateTextFile("D:\\_commit.txt", true);
            // 填写数据，并增加换行符
            tf.Write(str) ;
            // 关闭文件
            tf.Close();
            */
            
            }
        
  /*
/
/
/ 一般 非pvp
/
/ 修改 start 部分
/
/
/
        */     
       
 
        if(oSession.fullUrl.IndexOf("start") != -1 && oSession.fullUrl.IndexOf("pvp") == -1 && modEnable=="yes") {
            getkey();
            
            var bytes = oSession.responseBodyBytes;
            var paddinglen = 32 - (bytes.Length % 32);
            var buffer = new Byte[bytes.Length + paddinglen];
            bytes.CopyTo(buffer, 0);
            var rDel = new RijndaelManaged();
            rDel.Key = key;
            rDel.Mode = CipherMode.CFB;
            rDel.Padding = PaddingMode.Zeros;
            rDel.IV = IV;
            var cTransform = rDel.CreateDecryptor();
            var resultArray = cTransform.TransformFinalBlock(buffer, 0, buffer.Length);
            var buffer2 = new Byte[bytes.Length];
            System.Array.Copy(resultArray, buffer2, bytes.Length);
            var str = Encoding.UTF8.GetString(buffer2);

            //save res
            //2017/7/27 11:36
            /*
            var fso, tf;
            fso = new ActiveXObject("Scripting.FileSystemObject");
            // 创建新文件
            tf = fso.CreateTextFile("D:\\_response.txt", true);
            // 填写数据，并增加换行符
            tf.Write(str) ;
            // 关闭文件
            tf.Close();
            */
            //hack boss raid 自己挖坑
            //var regex = new Regex(",\"hp\":\\d+,\"level");
            //str = regex.Replace(str, ",\"hp\":5000,\"level");
            
            //愤怒小鸟 style
            if(str.IndexOf("\"target_serial\":9,")!=-1){
                birdp=9;
            }
            if(str.IndexOf("\"target_serial\":10,")!=-1){
                birdp=10;
            }
            
            
            var regex = new Regex("\"defence\":(.+?),");
            str = regex.Replace(str, "\"defence\":"+ "9999" +",");
            //hp
            var regex = new Regex("4,\"hp\":(.+?),");
            str = regex.Replace(str, "4,\"hp\":"+ '99999' +",");
            var regex = new Regex("\"current_hp\":(.+?),");
            str = regex.Replace(str,"\"current_hp\":99999,");
            
            //技能简释
            //339 攻击中增加必杀
            //20004 异常状态无效 31992 效果延长
            //10023 充电
            //397 剑圣 398 攻击 300%
            //60031 盾防必杀吸收
            //43 攻击必杀大42% 489 攻击系必杀增强 40%
            
            //31983
            var regex = new Regex("31983,");
            str = regex.Replace(str, "31983,20023,20033,40010,60031,31963,20043,10003,31992,20004,10033,35989,220,399,");  
            //str = regex.Replace(str, "31983,20023,20033,20004,31963,"); 
            //保守
            //str=regex.Replace(str, "31983,10003,20004,"); 
            
            //toweak 40122,353,31671
            var regex = new Regex("40122,353,31671");
            str = regex.Replace(str, "40122,353,31671,20004,40010,60031,31963,10033");  
            
            //盾白雪
            var regex=new Regex("\\[40022,20073,38982,10052,31683,31663,31683,31663,31683\\],\"");
            str=regex.Replace(str, "[40022,20073,38982,10052,31683,31663,31683,31663,31683,31693,339,10023,20079,20023,20033,20004,20063,31693,397,398,60031,31983],\"");           
          
            //血MM
            var regex=new Regex("31693,20023,20033,20063,31693,");
            str=regex.Replace(str, "31693,339,10023,20079,20023,20033,20004,20063,31693,");
            
            //妖精王混沌
            var regex=new Regex("\\[451,57,171,135,65,10031\\],\"");
            str=regex.Replace(str, "[451,57,171,31693,339,10023,20079,20023,20033,20004,20063,31693,397,398,10052,31983,43,489],\"");           
            
            //魔王
            var regex=new Regex("\\[31689,383,31681\\],\"");
            str=regex.Replace(str, "[31689,383,31681,31693,339,20079,10023,20023,20033,20004,20063,31693,397,398,10052,31983,43,489],\"");                       
            
            //dull alice skill
            var regex=new Regex("\\[103,31658,51\\],\"");
            str=regex.Replace(str, "[103,51,339,20004,20079,10023,31658,397,398,31992,10052,31983,43,489],\""); 
            
            var regex = new Regex("31982,");
            //str = regex.Replace(str, "31982,3,20023,20033,20043,40010,60031,20004,31963,"); 
            //保守
            //str=regex.Replace(str, "31982,10003,20004,"); 
            
            var toEncryptArray = Encoding.UTF8.GetBytes(str);
            cTransform = rDel.CreateEncryptor();
            resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
            buffer2 = new Byte[toEncryptArray.Length];
            System.Array.Copy(resultArray, buffer2, toEncryptArray.Length);
            oSession.ResponseBody = buffer2;
        }
        
        
        
        
        /* 修改 竞技场
        /
        /
        /pvp https://app.grimmsnotes.jp/api/pvp/battle/start
        /
        /
        /
        t*/
        if(oSession.fullUrl.IndexOf("pvp/battle/start") != -1){
            getkey();
        
            var bytes = oSession.responseBodyBytes;
            var paddinglen = 32 - (bytes.Length % 32);
            var buffer = new Byte[bytes.Length + paddinglen];
            bytes.CopyTo(buffer, 0);
            var rDel = new RijndaelManaged();
            rDel.Key = key;
            rDel.Mode = CipherMode.CFB;
            rDel.Padding = PaddingMode.Zeros;
            rDel.IV = IV;
            var cTransform = rDel.CreateDecryptor();
            var resultArray = cTransform.TransformFinalBlock(buffer, 0, buffer.Length);
            var buffer2 = new Byte[bytes.Length];
            System.Array.Copy(resultArray, buffer2, bytes.Length);
            var str = Encoding.UTF8.GetString(buffer2);
            
            //var regex = new Regex("\"hp\":6192,");
            //str=regex.Replace(str, "\"hp\":"+ '99999' +",");
            //"current_hp":5431,"defence":1395,
            //var regex=new Regex("\"hp\":3612,");
            //str=regex.Replace(str, "\"hp\":"+ '99999' +",");
            //var regex=new Regex("\"current_hp\":5431,");
            //str=regex.Replace(str, "\"current_hp\":"+ '99000' +",");
            var regex=new Regex("\"defence\":1395,");
            str=regex.Replace(str, "\"defence\":"+ '99999' +",");           
            //"hp":4276,"m_character_id":15600092圣女贞德
            //var regex=new Regex("\"hp\":4276,");
            //str=regex.Replace(str, "\"hp\":"+ '99999' +",");
            //var regex=new Regex("\"current_hp\":6388,");
            //str=regex.Replace(str, "\"current_hp\":"+ '99999' +","); 
            //1415hp":4368,"attack":1056,"defence":1415,
            var regex=new Regex("hp\":4368,\"attack\":1056,\"defence\":1415,");
            str=regex.Replace(str, "hp\":4368,\"attack\":1056,\"defence\":99999,");
            
            //skill hack
            var regex=new Regex("60031,31992,31983,31693,");
            str=regex.Replace(str, "60031,31992,20004,31983,31693,");
            //,31693,20023,20033,20063,31693,
            var regex=new Regex("31693,20023,20033,20063,31693,");
            str=regex.Replace(str, "31693,20023,20033,20004,40010,60031,20063,31693,");
            //,31693,20023,20033,20063,31693,
            var regex=new Regex("31693,31673,20043,20033,20023,31693,");
            str=regex.Replace(str, "31693,31673,20004,20043,20033,20023,31693,");
            
            //dull alice skill
            var regex=new Regex("\\[103,31658,65535\\],\"");
            str=regex.Replace(str, "[103,339,20004,31658,65535],\""); 
            
            //血MM
            var regex=new Regex("31693,20023,20033,20063,31693,");
            str=regex.Replace(str, "31693,339,20079,20023,20033,20004,20063,31693,");
            
            
            /*弱化对手的hacker*/
            //"m_character_id" : 15600082,
            /*var regex=new Regex("\"m_character_id\":5100122,");
            str=regex.Replace(str, "\"m_character_id\":4800012,");         
            var regex=new Regex("\"visual_m_character_id\":5100122,");
            str=regex.Replace(str, "\"visual_m_character_id\":4800012,");  
            var regex=new Regex("\"d_character_serial\":78,");
            str=regex.Replace(str, "\"d_character_serial\":26,"); 
            var regex=new Regex("\"d_character_serial\":60,");
            str=regex.Replace(str, "\"d_character_serial\":26,");
            var regex=new Regex("\"equip_m_dress_id\":8,");
            str=regex.Replace(str, "\"equip_m_dress_id\":null,"); */
            var regex=new Regex("\"defence\":(.+?),");
            str=regex.Replace(str, "\"defence\":"+ '9' +",");   
            
            //强化自己
            var regex=new Regex("\"my_party_detail\":\{\"main_calc_union_list\":\\[\{\"slot_id\":1,\"union\":\{\"m_leading_character_id\":5,\"front_calc_character\":\{\"d_character_serial\":65,\"m_character_id\":5400102,\"level\":90,\"level_limit_break_count\":4,\"hp\":6192,\"attack\":1507,\"defence\":9,\"clear_ordeal_flag\":3,\"m_weapon_id\":490007,\"town_effect_value\":2150,\"visual_m_character_id\":5400102,\"current_hp\":9380,\"battle_ai_type\":null,\"equip_m_dress_id\":null,");
            str=regex.Replace(str, "\"my_party_detail\":{\"main_calc_union_list\":[{\"slot_id\":1,\"union\":{\"m_leading_character_id\":5,\"front_calc_character\":{\"d_character_serial\":65,\"m_character_id\":5400102,\"level\":90,\"level_limit_break_count\":4,\"hp\":9992,\"attack\":1507,\"defence\":99999,\"clear_ordeal_flag\":3,\"m_weapon_id\":490007,\"town_effect_value\":2150,\"visual_m_character_id\":5400102,\"current_hp\":9380,\"battle_ai_type\":null,\"equip_m_dress_id\":null,");            
            //var regex=new Regex("\"defence\":1395,");
            //str=regex.Replace(str, "\"defence\":"+ '9999' +",");     
            var regex=new Regex("hp\":4276,\"attack\":(.+?),\"defence\":9,");
            str=regex.Replace(str, "hp\":4368,\"attack\":1056,\"defence\":99999,");          
            //xiuy
            var regex=new Regex("hp\":4644,\"attack\":1319,\"defence\":9,");
            str=regex.Replace(str, "hp\":4644,\"attack\":1319,\"defence\":9999,");                   
            //血MM 
            var regex=new Regex("\"hp\":5808,\"attack\":2010,\"defence\":9,\"clear_ordeal_flag\":3,\"m_weapon_id\":290107,\"town_effect_value\":2900,\"visual_m_character_id\":5200122,\"current_hp\":9234");
            str=regex.Replace(str, "\"hp\":5808,\"attack\":2010,\"defence\":999,\"clear_ordeal_flag\":3,\"m_weapon_id\":290107,\"town_effect_value\":2900,\"visual_m_character_id\":5200122,\"current_hp\":9234");             
            //混沌爱丽丝
            var regex=new Regex("\"d_character_serial\":117,\"m_character_id\":5600142,\"level\":90,\"level_limit_break_count\":4,\"hp\":(.+?),\"attack\":1908,\"defence\":9,\"clear_ordeal_flag\":3,\"m_weapon_id\":10650050,\"town_effect_value\":2600,\"visual_m_character_id\":5600142,\"current_hp\":(.+?),\"battle_ai_type\":null,\"equip_m_dress_id\":106")
            str=regex.Replace(str, "\"d_character_serial\":117,\"m_character_id\":5600142,\"level\":90,\"level_limit_break_count\":4,\"hp\":9287,\"attack\":1908,\"defence\":99999,\"clear_ordeal_flag\":3,\"m_weapon_id\":10650050,\"town_effect_value\":2600,\"visual_m_character_id\":5600142,\"current_hp\":9287,\"battle_ai_type\":null,\"equip_m_dress_id\":106");             
            //黑白天鹅
            var regex=new Regex("\"d_character_serial\":71,\"m_character_id\":5700132,\"level\":90,\"level_limit_break_count\":4,\"hp\":(.+?),\"attack\":1693,\"defence\":9,\"clear_ordeal_flag\":3,\"m_weapon_id\":790104,\"town_effect_value\":2750,\"visual_m_character_id\":5700132,\"current_hp\":(.+?),");
            str=regex.Replace(str, "\"d_character_serial\":71,\"m_character_id\":5700132,\"level\":90,\"level_limit_break_count\":4,\"hp\":99999,\"attack\":1693,\"defence\":99999,\"clear_ordeal_flag\":3,\"m_weapon_id\":790104,\"town_effect_value\":2750,\"visual_m_character_id\":5700132,\"current_hp\":99999,")
            
            var toEncryptArray = Encoding.UTF8.GetBytes(str);
            cTransform = rDel.CreateEncryptor();
            resultArray = cTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);
            buffer2 = new Byte[toEncryptArray.Length];
            System.Array.Copy(resultArray, buffer2, toEncryptArray.Length);
            oSession.ResponseBody = buffer2;
        }
        
    }

/*
    // This function executes just before Fiddler returns an error that it has 
    // itself generated (e.g. "DNS Lookup failure") to the client application.
    // These responses will not run through the OnBeforeResponse function above.
    static function OnReturningError(oSession: Session) {
    }
*/
/*
    // This function executes after Fiddler finishes processing a Session, regardless
    // of whether it succeeded or failed. Note that this typically runs AFTER the last
    // update of the Web Sessions UI listitem, so you must manually refresh the Session's
    // UI if you intend to change it.
    static function OnDone(oSession: Session) {
    }
*/

    /*
    static function OnBoot() {
        MessageBox.Show("Fiddler has finished booting");
        System.Diagnostics.Process.Start("iexplore.exe");

        UI.ActivateRequestInspector("HEADERS");
        UI.ActivateResponseInspector("HEADERS");
    }
    */

    /*
    static function OnBeforeShutdown(): Boolean {
        // Return false to cancel shutdown.
        return ((0 == FiddlerApplication.UI.lvSessions.TotalItemCount()) ||
                (DialogResult.Yes == MessageBox.Show("Allow Fiddler to exit?", "Go Bye-bye?",
                 MessageBoxButtons.YesNo, MessageBoxIcon.Question, MessageBoxDefaultButton.Button2)));
    }
    */

    /*
    static function OnShutdown() {
            MessageBox.Show("Fiddler has shutdown");
    }
    */

    /*
    static function OnAttach() {
        MessageBox.Show("Fiddler is now the system proxy");
    }
    */

    /*
    static function OnDetach() {
        MessageBox.Show("Fiddler is no longer the system proxy");
    }
    */

    // The Main() function runs everytime your FiddlerScript compiles
    static function Main() {
        var today: Date = new Date();
        FiddlerObject.StatusText = " CustomRules.js was loaded at: " + today;

        // Uncomment to add a "Server" column containing the response "Server" header, if present
        // UI.lvSessions.AddBoundColumn("Server", 50, "@response.server");

        // Uncomment to add a global hotkey (Win+G) that invokes the ExecAction method below...
        // UI.RegisterCustomHotkey(HotkeyModifiers.Windows, Keys.G, "screenshot"); 
    }

    // These static variables are used for simple breakpointing & other QuickExec rules 
    BindPref("fiddlerscript.ephemeral.bpRequestURI")
    public static var bpRequestURI:String = null;

    BindPref("fiddlerscript.ephemeral.bpResponseURI")
    public static var bpResponseURI:String = null;

    BindPref("fiddlerscript.ephemeral.bpMethod")
    public static var bpMethod: String = null;

    static var bpStatus:int = -1;
    static var uiBoldURI: String = null;
    static var gs_ReplaceToken: String = null;
    static var gs_ReplaceTokenWith: String = null;
    static var gs_OverridenHost: String = null;
    static var gs_OverrideHostWith: String = null;

    // The OnExecAction function is called by either the QuickExec box in the Fiddler window,
    // or by the ExecAction.exe command line utility.
    static function OnExecAction(sParams: String[]): Boolean {

        FiddlerObject.StatusText = "ExecAction: " + sParams[0];

        var sAction = sParams[0].toLowerCase();
        switch (sAction) {
            case "bold":
                if (sParams.Length<2) {uiBoldURI=null; FiddlerObject.StatusText="Bolding cleared"; return false;}
                uiBoldURI = sParams[1]; FiddlerObject.StatusText="Bolding requests for " + uiBoldURI;
                return true;
            case "bp":
                FiddlerObject.alert("bpu = breakpoint request for uri\nbpm = breakpoint request method\nbps=breakpoint response status\nbpafter = breakpoint response for URI");
                return true;
            case "bps":
                if (sParams.Length<2) {bpStatus=-1; FiddlerObject.StatusText="Response Status breakpoint cleared"; return false;}
                bpStatus = parseInt(sParams[1]); FiddlerObject.StatusText="Response status breakpoint for " + sParams[1];
                return true;
            case "bpv":
            case "bpm":
                if (sParams.Length<2) {bpMethod=null; FiddlerObject.StatusText="Request Method breakpoint cleared"; return false;}
                bpMethod = sParams[1].toUpperCase(); FiddlerObject.StatusText="Request Method breakpoint for " + bpMethod;
                return true;
            case "bpu":
                if (sParams.Length<2) {bpRequestURI=null; FiddlerObject.StatusText="RequestURI breakpoint cleared"; return false;}
                bpRequestURI = sParams[1]; 
                FiddlerObject.StatusText="RequestURI breakpoint for "+sParams[1];
                return true;
            case "bpa":
            case "bpafter":
                if (sParams.Length<2) {bpResponseURI=null; FiddlerObject.StatusText="ResponseURI breakpoint cleared"; return false;}
                bpResponseURI = sParams[1]; 
                FiddlerObject.StatusText="ResponseURI breakpoint for "+sParams[1];
                return true;
            case "overridehost":
                if (sParams.Length<3) {gs_OverridenHost=null; FiddlerObject.StatusText="Host Override cleared"; return false;}
                gs_OverridenHost = sParams[1].toLowerCase();
                gs_OverrideHostWith = sParams[2];
                FiddlerObject.StatusText="Connecting to [" + gs_OverrideHostWith + "] for requests to [" + gs_OverridenHost + "]";
                return true;
            case "urlreplace":
                if (sParams.Length<3) {gs_ReplaceToken=null; FiddlerObject.StatusText="URL Replacement cleared"; return false;}
                gs_ReplaceToken = sParams[1];
                gs_ReplaceTokenWith = sParams[2].Replace(" ", "%20");  // Simple helper
                FiddlerObject.StatusText="Replacing [" + gs_ReplaceToken + "] in URIs with [" + gs_ReplaceTokenWith + "]";
                return true;
            case "allbut":
            case "keeponly":
                if (sParams.Length<2) { FiddlerObject.StatusText="Please specify Content-Type to retain during wipe."; return false;}
                UI.actSelectSessionsWithResponseHeaderValue("Content-Type", sParams[1]);
                UI.actRemoveUnselectedSessions();
                UI.lvSessions.SelectedItems.Clear();
                FiddlerObject.StatusText="Removed all but Content-Type: " + sParams[1];
                return true;
            case "stop":
                UI.actDetachProxy();
                return true;
            case "start":
                UI.actAttachProxy();
                return true;
            case "cls":
            case "clear":
                UI.actRemoveAllSessions();
                return true;
            case "g":
            case "go":
                UI.actResumeAllSessions();
                return true;
            case "goto":
                if (sParams.Length != 2) return false;
                Utilities.LaunchHyperlink("http://www.google.com/search?hl=en&btnI=I%27m+Feeling+Lucky&q=" + Utilities.UrlEncode(sParams[1]));
                return true;
            case "help":
                Utilities.LaunchHyperlink("http://fiddler2.com/r/?quickexec");
                return true;
            case "hide":
                UI.actMinimizeToTray();
                return true;
            case "log":
                FiddlerApplication.Log.LogString((sParams.Length<2) ? "User couldn't think of anything to say..." : sParams[1]);
                return true;
            case "nuke":
                UI.actClearWinINETCache();
                UI.actClearWinINETCookies(); 
                return true;
            case "screenshot":
                UI.actCaptureScreenshot(false);
                return true;
            case "show":
                UI.actRestoreWindow();
                return true;
            case "tail":
                if (sParams.Length<2) { FiddlerObject.StatusText="Please specify # of sessions to trim the session list to."; return false;}
                UI.TrimSessionList(int.Parse(sParams[1]));
                return true;
            case "quit":
                UI.actExit();
                return true;
            case "dump":
                UI.actSelectAll();
                UI.actSaveSessionsToZip(CONFIG.GetPath("Captures") + "dump.saz");
                UI.actRemoveAllSessions();
                FiddlerObject.StatusText = "Dumped all sessions to " + CONFIG.GetPath("Captures") + "dump.saz";
                return true;

            default:
                if (sAction.StartsWith("http") || sAction.StartsWith("www.")) {
                    System.Diagnostics.Process.Start(sParams[0]);
                    return true;
                }
                else
                {
                    FiddlerObject.StatusText = "Requested ExecAction: '" + sAction + "' not found. Type HELP to learn more.";
                    return false;
                }
        }
    }
}