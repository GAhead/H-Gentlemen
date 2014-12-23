#pragma strict
	var startX = 10;
	var startY = 10;
	var Youxiajiao:int = 1;
	var AnniuChang = 120;
	var AnniuKuan = 50;
//绘制UI界面  
private var Jianju = 10;
var GameM:GameObject ;
private static var GmIsClone = false;
private var GM : GameObject;
 //缁樺埗UI鐣岄潰  
 private var m_gm : GameObject;
 private var m_gms :GameManage;
function Awake(){
	if(!GmIsClone)
	{
		GM = Instantiate(GameM,transform.position,transform.rotation) as GameObject;
		GmIsClone = true;
	}
	DontDestroyOnLoad(GM);
}
function Start () {
	 AnniuChang = Screen.width/8;
	AnniuKuan = Screen.height/5;
	
	if(Youxiajiao==1){
		startX=Screen.width-(AnniuChang +Jianju)*3-startX;
		startY=Screen.height-(AnniuKuan +Jianju)*3-startY;
	}
	m_gm = GameObject.FindWithTag("GM");
	m_gms = m_gm.GetComponent("GameManage");
	
}

function OnGUI(){  
	var baby;
	GUI.Label(Rect(0,0,100,50),"Money:"+m_gms.myMoney().ToString());
	GUI.Label(Rect(100,0,100,50),"HP:"+m_gms.myHP().ToString());
	if(GUI.RepeatButton(Rect(startX + 2*(AnniuChang +Jianju),startY + 2*(AnniuKuan +Jianju),AnniuChang,AnniuKuan),"ToReady")){  

         Application.LoadLevel("ready");

    }
    
}