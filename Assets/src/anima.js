#pragma strict

function Start () {
	GetComponent.<Animation>().Stop();  
}

function Update () {
    if (Mathf.Abs(Input.GetAxis("Vertical")) > 0.1)  
        GetComponent.<Animation>().CrossFade("run");  
    else  
        GetComponent.<Animation>().CrossFade("stand");  
}