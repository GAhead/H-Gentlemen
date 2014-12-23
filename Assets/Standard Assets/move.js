var RotateSpeed:double = 300;  
var maxSpeed:double = 5;
var jiaSpeed:double = 100;
var attackFrame:int =35;
var attackPoint:int = 20;
var attackSpeed:double = 1.0;
var fanSpeed = 50;  
var massY:double = 0.02;
var animationRunSpeed:double =0.3;
var animationRotateSpeed:double =0.008;
var jumpSpeed:double = 3;
var enemyTag = "team1";
var attackDis:double = 1.0;

	var startX = 10;
	var startY = 10;
	var Youxiajiao:int = 1;
	var AnniuChang = 120;
	var AnniuKuan = 50;
//绘制UI界面  

private var Init:Vector3;
private var state;
private var IDLE=0;
private var RUN=1;
private var ATTACK=2;
private var RUN_BACK=3;

private var wait:double=0;
private var sqrMaxSpeed:double;
private var attackTime:double;
private var attackPointTime:double;
private var attacked=0;
private var Jianju = 10;
function Awake(){
	Init=transform.position;
	state=0;
	sqrMaxSpeed = maxSpeed * maxSpeed;
	GetComponent.<Rigidbody>().centerOfMass.y=massY;
	
	 AnniuChang = Screen.width/8;
	AnniuKuan = Screen.height/5;
	
	if(Youxiajiao==1){
		startX=Screen.width-(AnniuChang +Jianju)*3-startX;
		startY=Screen.height-(AnniuKuan +Jianju)*3-startY;
	}
}

function OnGUI(){  

    //设置GUI背景色  
    GUI.backgroundColor = Color.red;  

    if(GUI.RepeatButton(Rect(startX + 0*(AnniuChang +Jianju),startY + 0*(AnniuKuan +Jianju),AnniuChang,AnniuKuan),"跳跃")){  

        //跳跃
        
        Jump();

    }  

    if(GUI.RepeatButton(Rect(startX,startY + 1*(AnniuKuan +Jianju),AnniuChang,AnniuKuan),"向左旋转")){  

        //向左旋转  

        //transform.Rotate(Vector3.up * Time.deltaTime * (-RotateSpeed));  
        Rot(-1);

    }  

    if(GUI.RepeatButton(Rect(startX + AnniuChang +Jianju,startY,AnniuChang,AnniuKuan),"向前移动")){  

        //向前移动  
        //transform.Translate(Vector3.forward * Time.deltaTime * TranslateSpeed);  
        //rigidbody.AddForce(Vector3.forward * Time.deltaTime * TranslateSpeed,0);
		Run();
    }  

    if(GUI.RepeatButton(Rect(startX + 2*(AnniuChang +Jianju),startY + 1*(AnniuKuan +Jianju),AnniuChang,AnniuKuan),"向右旋转")){  

        //向右旋转  

        //transform.Rotate(Vector3.up * Time.deltaTime * RotateSpeed);  
        Rot(1);

    }  
    
    if(GUI.Button(Rect(startX + 2*(AnniuChang +Jianju),startY + 0*(AnniuKuan +Jianju),AnniuChang,AnniuKuan),"攻击")){  

        //攻击

        //transform.Rotate(Vector3.up * Time.deltaTime * RotateSpeed);  
        Attack();

    }  

    if(GUI.RepeatButton(Rect(startX + 1*(AnniuChang +Jianju),startY + 1*(AnniuKuan +Jianju),AnniuChang,AnniuKuan),"向后移动")){  

        //向后移动  
		RunBack();

    }  
    
    if(GUI.RepeatButton(Rect(startX + 0*(AnniuChang +Jianju),startY + 2*(AnniuKuan +Jianju),AnniuChang,AnniuKuan),"向左滚")){  

        //翻滚
        
        Qilai();

    }  
    
    if(GUI.Button(Rect(startX + 1*(AnniuChang +Jianju),startY + 2*(AnniuKuan +Jianju),AnniuChang,AnniuKuan),"回去")){  

        //回去

        transform.position=Init;
        GetComponent.<Rigidbody>().velocity=Vector3.zero;
        GetComponent.<Rigidbody>().rotation.Set(0,0,0,0);

    }  
    
    if(GUI.RepeatButton(Rect(startX + 2*(AnniuChang +Jianju),startY + 2*(AnniuKuan +Jianju),AnniuChang,AnniuKuan),"向前滚")){  

        //翻滚
        
        QianGun();

    }  

    //显示模型位置信息  

    GUI.Label(Rect(startX + 3*(AnniuChang +Jianju),startY + 0*(AnniuKuan +Jianju),200,30),"模型位置"+transform.position);  

    //显示模型旋转信息   wa

    GUI.Label(Rect(startX + 3*(AnniuChang +Jianju),startY + 1*(AnniuKuan +Jianju),200,30),"模型旋转"+transform.rotation);  
	GUI.Label(Rect(startX + 3*(AnniuChang +Jianju),startY + 0.33*(AnniuKuan +Jianju),200,30),"模型速度"+GetComponent.<Rigidbody>().velocity + (GetComponent.<Rigidbody>().velocity.sqrMagnitude));
	var t:Character = GetComponent.<Character>() as Character;
	var hp:int = 0;
	if(t) hp = t.getHp();
	GUI.Label(Rect(startX + 3*(AnniuChang +Jianju),startY + 0.66*(AnniuKuan +Jianju),200,30),"那啥"+hp);
}  
private var t=0;
private var peng=0;
private var roing=0;
private var jumping=0;
private var forwardSpeed:double;
function FixedUpdate(){
	forwardSpeed = Vector3.Dot( GetComponent.<Rigidbody>().velocity , transform.forward);
	if(jumping==1) GetComponent.<Animation>()["run"].speed = animationRunSpeed;
	else{
	GetComponent.<Animation>()["run"].speed = animationRunSpeed * forwardSpeed;
	if(roing == 1 && GetComponent.<Animation>()["run"].speed<RotateSpeed * animationRotateSpeed) 
		GetComponent.<Animation>()["run"].speed = RotateSpeed * animationRotateSpeed;
	}
	if(Input.GetKey(KeyCode.UpArrow)) {Run();}
	if(Input.GetKey(KeyCode.DownArrow)) {RunBack();}
	if(Input.GetKey(KeyCode.RightArrow)) {Rot(1);}
	if(Input.GetKey(KeyCode.LeftArrow)) {Rot(-1);}
	if(Input.GetKey(KeyCode.Z) || Input.GetKey(KeyCode.X)) Attack();
	if(Input.GetKey(KeyCode.Space) || Input.GetKey(KeyCode.Escape)) Jump();
	if(Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.Y) ) Qilai();
	if(Input.GetKey(KeyCode.S) ) QianGun();
	if(t==0) GetComponent.<Animation>().CrossFade("idle");
	switch(state){
	case ATTACK:
		GetComponent.<Animation>().CrossFade("attack");
		wait-=Time.deltaTime;
		if(attacked == 0 && attackTime - wait >= attackPointTime){
			var tt:Character = GetComponent.<Character>() as Character;
			var playe:GameObject = FindNearest(transform.position + transform.forward*0.5*attackDis);
			if(tt && playe) tt.Attack(playe);
			attacked=1;
		}
		
		if(wait<=0)state = IDLE;
		break;
	}
	t=0;
	peng = 0;
}

function Run(){
		if(peng ==1 && forwardSpeed < maxSpeed )GetComponent.<Rigidbody>().AddRelativeForce(Vector3.forward * jiaSpeed);
		if(state!=ATTACK)GetComponent.<Animation>().CrossFade("run");
		t=1;
}

function RunBack(){
		if(peng == 1 && -forwardSpeed < maxSpeed )GetComponent.<Rigidbody>().AddRelativeForce(Vector3.forward * -jiaSpeed);
		if(state!=ATTACK)GetComponent.<Animation>().CrossFade("run");
		t=1;
}

function Rot(x:int){
	GetComponent.<Rigidbody>().transform.Rotate(Vector3.up * Time.deltaTime * RotateSpeed * x);
	if(state!=ATTACK)GetComponent.<Animation>().CrossFade("run");
	t=1;
	roing=1;
}

function Attack(){
	if(state!=ATTACK){
		state=ATTACK;
		SetAttack();
	}
}

function Qilai(){
	GetComponent.<Rigidbody>().AddRelativeTorque(Vector3.forward *(fanSpeed));
}

function QianGun(){
	GetComponent.<Rigidbody>().AddRelativeTorque(Vector3.right *(fanSpeed));
}

function Jump(){
	if(peng ==1)GetComponent.<Rigidbody>().velocity.y+=jumpSpeed;
	jumping=1;
}

function OnCollisionStay(co : Collision){
	peng = 1;
	jumping=0;
}

	function FindNearest(pos : Vector3) : GameObject{
		var ts:GameObject[] ;
		ts = GameObject.FindGameObjectsWithTag(enemyTag);
		var theNearest:GameObject = null;
		var dis:double =attackDis*0.5;
		var td:double;
		var t:GameObject;
		for (t in ts){
			if(t){
				td = Vector3.Distance(t.transform.position , pos);
				if( td <dis){
					var tt:Character = t.GetComponent.<Character>() as Character;
					if (tt && tt.isDying()==1)continue;
					theNearest = t;
					dis = td;
				}
			}
		}
		return theNearest;
	}
	
	function SetAttack(){
		GetComponent.<Animation>()["attack"].speed = attackSpeed;
		attackTime = 1.0 / attackSpeed;
		attackPointTime = attackTime* attackPoint/attackFrame;
		wait = attackTime;
		attacked=0;
	}
	