var RotateSpeed = 100;  
var maxSpeed:double = 5;
var jiaSpeed:double = 100;
var attackFrame:int =35;
var attackPoint:int = 20;
var attackSpeed:double = 1.0;
var fanSpeed = 50;  
var massY:double = 0.02;
var animationRunSpeed:double =0.3;
var  playe:GameObject;
var MIN_DISTANCE:double = 1;
var enemyTag= "team2";

		private var ENEMY_STAND = 0;
		private var ENEMY_ATTACK = 1;
		private var ENEMY_RUN = 2;
		private var ENEMY_PAUSE = 3;
		private var enemyState;
		//Enemy xun luo Fanwei
		private var  AI_ATTACK_DISTANCE:double = 100000;
		
		private var attackTime:double;
		private var attackPointTime:double;
		
		private var wait:double;
		private var peng=0;
		function Start ()
		{
				enemyState = ENEMY_STAND;
				wait = 0;
				peng = 0;
				rigidbody.centerOfMass.y=massY;
		}



private var forwardSpeed:double;
private var attacked:int =0;
		function Update ()
		{
			if(playe){
				var tt:Character = GetComponent.<Character>() as Character;
				if (!tt || tt.tag!=enemyTag) playe=null;
			}
			if(!playe) playe = FindNearest();
			if(!playe){
				animation.CrossFade ("idle"); 
				return;
			}
			forwardSpeed = Vector3.Dot( rigidbody.velocity , transform.forward);
			//animation["run"].speed = animationRunSpeed * forwardSpeed;
				if (wait > 0.0) {
						transform.LookAt (playe.transform);
						wait-=Time.deltaTime;
						if(attacked == 0 && attackTime - wait >= attackPointTime){
							var t:Character = GetComponent.<Character>() as Character;
							if(t) t.Attack(playe);
							attacked=1;
						}
						return;
				}

		if (MIN_DISTANCE < Vector3.Distance (transform.position, playe.transform.position) && Vector3.Distance (transform.position, playe.transform.position) < AI_ATTACK_DISTANCE) {
						//敌人进入奔跑状态
						
						enemyState = ENEMY_RUN;
						//设置敌人的方向，面朝主角
						transform.LookAt (playe.transform , Vector3.up);
				} else if (Vector3.Distance (transform.position, playe.transform.position) <= MIN_DISTANCE) {
						enemyState = ENEMY_ATTACK;
						transform.LookAt (playe.transform);
						SetAttack();
				}
				switch (enemyState) {
				case ENEMY_STAND:
						animation.CrossFade ("idle"); 
						break;
				case ENEMY_RUN:
			//敌人朝主角奔跑 
					animation.CrossFade ("run");
					if(peng ==1 && forwardSpeed < maxSpeed ){
//						rigidbody.AddRelativeForce(Vector3.forward * jiaSpeed);
						transform.position += transform.forward * Time.deltaTime * maxSpeed;
						peng =0;
					}
					break;
				case ENEMY_ATTACK:
					break;
				}
		}


	function OnCollisionStay(co:Collision ){
		//Debug.Log ("touch");
		peng=1;
		if ( co.gameObject.tag==enemyTag){
			playe  = co.gameObject;
		}
	}
	function FindNearest() : GameObject{
		var ts:GameObject[] ;
		ts = GameObject.FindGameObjectsWithTag(enemyTag);
		var theNearest:GameObject = null;
		var dis:double =AI_ATTACK_DISTANCE;
		var td:double;
		var t:GameObject;
		for (t in ts){
			if(t){
				td = Vector3.Distance(t.transform.position , transform.position);
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
		animation["attack"].speed = attackSpeed * (1.0*attackFrame)/30.0;
		gameObject.animation.Play ("attack");
		attackTime = 1.0 / attackSpeed;
		attackPointTime = attackTime* attackPoint/attackFrame;
		wait = attackTime;
		attacked=0;
		//Debug.Log(attackTime + "attack Speed = "+ animation["attack"].speed);
	}