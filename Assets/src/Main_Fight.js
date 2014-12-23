#pragma strict
private var m_gm : GameObject;
private var m_gms :GameManage;
private var findtime : float = 3.0f;
private var tm1 : GameObject[];
private var tm2 : GameObject[];
function Start () {
	m_gm = GameObject.FindWithTag("GM");
	m_gms = m_gm.GetComponent("GameManage");
}

function  Update() {
	findtime -= Time.deltaTime;
	if(findtime<0)
	{
		tm1 = GameObject.FindGameObjectsWithTag("team1");
		tm2 = GameObject.FindGameObjectsWithTag("team2");
		
		if(tm1.Length == 0)
		{
			Application.LoadLevel("pick");
		}
		if(tm2.Length == 0)
		{
			m_gms.playerdm(tm1.Length);
			Application.LoadLevel("pick");
		}
		findtime = 3.0f;
	}
}
function OnGUI(){
	GUI.Label(Rect(100,0,100,50),"HP:"+m_gms.myHP().ToString());
	GUI.Label(Rect(0,0,100,50),"Money:"+m_gms.myMoney().ToString());
}