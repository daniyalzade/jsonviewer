Ext.ns('Ext.ux');
Ext.ux.Clipboard = function () {
	return {
		set: function (text) {
			if (window.clipboardData) {
				window.clipboardData.setData('Text', String(text));
			} else if (window.netscape) {
				try {
					netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
					var gClipboardHelper = Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper);
					gClipboardHelper.copyString(text);
				} catch (e) {
					return alert(e + '\n\nPlease type: "about:config" in your address bar.\nThen filter by "signed".\nChange the value of "signed.applets.codebase_principal_support" to true.\nYou should then be able to use this feature.');
				}
			} else {
				return alert("Your browser does not support this feature");
			}
		},
		get: function () {
			if (window.clipboardData) {
				return window.clipboardData.getData('Text');
			} else if (window.netscape) {
				try {
					netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
					var clip = Components.classes["@mozilla.org/widget/clipboard;1"].getService(Components.interfaces.nsIClipboard);  
					if (!clip) {
						return false;
					}  
					var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);  
					if (!trans) {
						return false;
					}  
					trans.addDataFlavor("text/unicode");  
					clip.getData(trans, clip.kGlobalClipboard);
					var str = {};  
					var strLength = {};
					try {
						trans.getTransferData("text/unicode", str, strLength);
					} catch (ex) {
						return;
					}
					var pastetext = '';
					if (str) {
						str = str.value.QueryInterface(Components.interfaces.nsISupportsString);
					}  
					if (str) {
						pastetext = str.data.substring(0, strLength.value / 2);
					}  
					return pastetext;
				} catch (e) {
					return alert(e + '\n\nPlease type: "about:config" in your address bar.\nThen filter by "signed".\nChange the value of "signed.applets.codebase_principal_support" to true.\nYou should then be able to use this feature.');
				}
			} else {
				return alert("Your browser does not support this feature");
			}
		}
	};
}();