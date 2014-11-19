#pragma strict
	var startX = 10;
	var startY = 10;
	var Youxiajiao:int = 1;
	var AnniuChang = 120;
	var AnniuKuan = 50;
//绘制UI界面  
private var Jianju = 10;
function Start () {
	 AnniuChang = Screen.width/8;
	AnniuKuan = Screen.height/5;
	
	if(Youxiajiao==1){
		startX=Screen.width-(AnniuChang +Jianju)*3-startX;
		startY=Screen.height-(AnniuKuan +Jianju)*3-startY;
	}
}

function OnGUI(){  
	var baby;
	if(GUI.RepeatButton(Rect(startX + 2*(AnniuChang +Jianju),startY + 2*(AnniuKuan +Jianju),AnniuChang,AnniuKuan),"ToReady")){  

         Application.LoadLevel("ready");

    }
    
}