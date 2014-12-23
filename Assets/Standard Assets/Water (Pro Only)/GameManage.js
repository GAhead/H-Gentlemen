#pragma strict
public var money:int = 2000;
public var playerHP : int = 50;
function Start () {
	DontDestroyOnLoad(this.gameObject);
}

function Update () {
	///print(money);
}
function cost(m:int):boolean
{
	if(money-m>=0)
	{
		money -=m;
		return true;
	}
	else return false;
}
function getm(m:int)
{
	money +=m;
}
function myMoney():int
{
	return money;
}
function playerdm(dm:int)
{
	playerHP-=dm;
}
function myHP():int
{
	return playerHP;
}