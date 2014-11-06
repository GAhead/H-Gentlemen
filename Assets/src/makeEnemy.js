#pragma strict

var Jiange:double = 5.0;
var maxNumber = 100;
var ob : GameObject;
function Start () {

}

function Update () {
	CreateEnemy();
}

private var r_shootInterval:double = 0;
private var cnt=0;
function CreateEnemy()
    {
      //创建子弹的时间间隔
           r_shootInterval -=Time.deltaTime;
            if (r_shootInterval<=0)
           {
               r_shootInterval = Jiange;
 				cnt++;
                if(cnt<=maxNumber){
                	if(ob)Instantiate(ob, transform.position , transform.rotation );
                	else Destroy(gameObject,0);
            	}
    		}
}