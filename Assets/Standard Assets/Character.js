#pragma strict
var maxHp:int = 500;
var damage:int = 50;
var attackSound:AudioClip = null;
var life:int = 1;
private var  hp:int = maxHp;
private var dying:int =0;
private var dieTime:double =2.0;

private var wait:double;
private var myTag;
private var mo:move;
private var en:Enemy2;
private var moed=false;
private var ened=false;
private var UI:Transform;
private var m_gm : GameObject;
private var m_gms :GameManage;
function Awake () {
		m_gm = GameObject.FindWithTag("GM");
		m_gms = m_gm.GetComponent("GameManage");
	}
function Start(){
	hp = maxHp;
	dying=0;
	myTag = gameObject.tag;
	mo = GetComponent.<move>() as move;
	en = GetComponent.<Enemy2>() as Enemy2;
}

function Update(){
	if(dying==1){
		if(wait>0){
			wait-=Time.deltaTime;
			if(wait<0){
				life--;
				if(life > 0){
					hp=maxHp;
					if(moed) mo.enabled=true;
					if(ened) en.enabled=true;
					moed=false;
					ened=false;
					gameObject.tag=myTag;
					dying = 0;
				}else{
					UI.Destroy(UI);
					Destroy(gameObject);
				}
			}
			return;
		}
	}
	if(dying ==0 && hp<=0){
		wait = dieTime;
		dying=1;
		if(this.tag == "team1")
		{
			m_gms.getm(500);
		}
		GetComponent.<Animation>().Play("die");
		if(mo && mo.enabled==true){
			mo.enabled=false;
			moed=true;
		}
		if(en && en.enabled==true){
			en.enabled=false;
			ened=true;
		}
		gameObject.tag="died";
		return;
	}
	
}

function Attack(target:GameObject){
	var t:Character = target.GetComponent.<Character>() as Character;
	if(t){
		GetComponent.<AudioSource>().PlayOneShot(attackSound);
		t.BeAttacked(damage);
	}
}

function BeAttacked(dam:int){
	hp-=dam;
		var tt:Enemy2 = GetComponent.<Enemy2>() as Enemy2;
		if(tt){
			tt.FindNearest();
		}
}

function getHp():int
{
	return hp;
}

function isDying():int
{
	return dying;
}

function setUI(_UI:Transform){
	UI = _UI;
}