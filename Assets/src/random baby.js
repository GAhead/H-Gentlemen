#pragma strict
var baby : GameObject[];
private var key :int ;
private var jianju :int =0;
private var i :int ;
function Start () {
	for(i=0;i<5;i++)
	{
		key = Random.Range(0,baby.Length);
		var instance : GameObject = Instantiate(baby[key],transform.position+new Vector3(0,0,jianju), transform.rotation);
		jianju+=20;
	}
}