#pragma strict

function Start () {

}

function Update () { 
	if(Input.GetKey(KeyCode.Menu)){ 
		Application.Quit(); 
	} 
} 