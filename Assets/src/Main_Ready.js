#pragma strict
	var startX = 10;
	var startY = 10;
	var Youxiajiao:int = 1;
	var AnniuChang = 120;
	var AnniuKuan = 50;
//绘制UI界面  
private var Jianju = 10;
	var ts:GameObject[] ;
	var baby111:GameObject;
	var m_pick:Pick_Buy;
function Awake () {
	 AnniuChang = Screen.width/8;
	AnniuKuan = Screen.height/5;
	ts = GameObject.FindGameObjectsWithTag("buyed");
	if(Youxiajiao==1){
		startX=Screen.width-(AnniuChang +Jianju)*3-startX;
		startY=Screen.height-(AnniuKuan +Jianju)*3-startY;
	}
	for (baby111 in ts){
			if(baby111){
					DontDestroyOnLoad(baby111);
				m_pick = baby111.GetComponent(Pick_Buy);
					m_pick.stop();
					
					baby111.tag ="team2";
				}
			}
}

function OnGUI(){  
	
	if(GUI.RepeatButton(Rect(startX + 2*(AnniuChang +Jianju),startY + 2*(AnniuKuan +Jianju),AnniuChang,AnniuKuan),"start"))
	{  
		ts = GameObject.FindGameObjectsWithTag("team2");
		for (baby111 in ts){
			if(baby111){
					baby111.transform.localScale = new Vector3(100,100,100);
				}
			}
        Application.LoadLevel("fight") ;

    } 

}